
# Framework

This is a starter project for using [Fusio](https://github.com/apioo/fusio) as a framework. You can find general
information about Fusio on the [website](https://www.fusio-project.org/), in the [docs](https://docs.fusio-project.org/),
and in the GitHub [repository](https://github.com/apioo/fusio).

## About

Fusio is an API management platform. Usually you configure operations, actions, schemas, and so on through the
backend UI. Using Fusio as a framework means that you keep all of this configuration in files under version control
instead, so you can always rebuild a fully configured Fusio instance from the repository.

The `deploy` command reads the configuration files under `resources/` and submits them to the internal REST API, just
like the backend UI would. Your business logic lives in plain PHP classes under `src/`.

The project contains a complete `todo` resource (CRUD endpoints, events, and a cronjob). Use it as a reference
implementation for your own resources.

## Requirements

* PHP >= 8.4
* [Composer](https://getcomposer.org/)
* A database supported by Doctrine DBAL, e.g. MySQL/MariaDB, PostgreSQL, or SQLite

## Quick start

1. Install the dependencies:

   ```
   composer install
   ```

2. Set the database connection in `.env`. `FUSIO_CONNECTION` is a Doctrine DBAL URL:

   ```
   FUSIO_CONNECTION="pdo-mysql://user:password@localhost/fusio"
   # or: pdo-pgsql://user:password@localhost/fusio
   # or: pdo-sqlite:///path/to/fusio.sqlite
   ```

   Also check `FUSIO_URL` (the public base URL of your API) and the mailer settings.

3. Install the Fusio and app tables:

   ```
   php bin/fusio migrations:migrate
   ```

4. Create an administrator account (role 1 = Administrator):

   ```
   php bin/fusio adduser --role=1
   ```

5. Log in the CLI with this account. This stores an access token in `fusio_token.json`:

   ```
   php bin/fusio login
   ```

6. Deploy the configuration from `resources/` to the instance:

   ```
   php bin/fusio deploy
   ```

7. Log in again (`php bin/fusio login`). The first deploy creates new scopes such as `todo`, and a token only
   contains the scopes that existed when it was issued.

Check whether the CLI is logged in with `php bin/fusio whoami`. If you reset the database, run `php bin/fusio logout`
first, because the old `fusio_token.json` is no longer valid.

### Try the API

You don't need a web server to test an endpoint. The `serve` command dispatches a single request internally:

```
php bin/fusio route                  # list all routes
php bin/fusio serve GET /todo < /dev/null
```

To serve the API over HTTP, point your web server's document root at `public/`. For local development, the built-in
PHP server works too:

```
php -S 127.0.0.1:8080 -t public
```

> This repository doesn't include the Fusio backend app, because you develop the API through source files. If you want
> to use the backend app, install it from the marketplace with `php bin/fusio marketplace:install fusio`.

## Developing with Claude Code

This repository ships with [Claude Code](https://claude.com/claude-code) skills (in `.claude/skills/`) and a
`CLAUDE.md` file that describes the project's conventions. Open the project in Claude Code and run one of the
following commands, or just describe what you want (e.g. "add a product resource"), and Claude picks the matching
skill.

| Skill | What it does |
|-------|--------------|
| `/fusio-setup` | First-time setup: database credentials in `.env`, API metadata in `config.yaml`, installing the tables, creating an admin user, and the first deploy |
| `/fusio-resource` | Adds a complete REST resource end to end: TypeSchema models, migration, table classes, view, service, actions, operations, scopes, roles, events, and deploy |
| `/fusio-migration` | Creates or changes database tables with a Doctrine migration and regenerates the table classes |
| `/fusio-cronjob` | Adds a periodic background job |
| `/fusio-deploy` | Applies `resources/*` to the Fusio instance, including the login checks |
| `/fusio-sdk` | Generates a type-safe client SDK (TypeScript, PHP, Python, Java, Go, C#) |

A good way to start is `/fusio-setup`, followed by `/fusio-resource` for your first own endpoint.

## How a resource is built

Every endpoint is made of a few small parts. The `todo` resource shows each of them:

1. **Schema** (`resources/typeschema.json`): the [TypeSchema](https://typeschema.org/) definition of your request and
   response models. `php bin/fusio generate:model` generates the DTOs in `src/Model`.
2. **Migration** (`src/Migrations`): creates the database table. App tables must use the `app_` prefix (e.g.
   `app_todo`). Create one with `php bin/fusio migrations:generate`, then run `php bin/fusio migrations:migrate`.
3. **Table** (`src/Table`): `php bin/fusio generate:table` generates type-safe table classes for all `app_*` tables.
4. **View** (`src/View`): builds the JSON response for GET requests (collection and entity).
5. **Service** (`src/Service`): contains the business logic for create, update, and delete, and dispatches events.
6. **Action** (`src/Action`): the thin entry point of an operation that calls the view or the service.
7. **Operation** (`resources/operations/<entity>/*.php`, registered in `resources/operation.yaml`): the route, HTTP
   method, scopes, models, and action.
8. **Scopes and roles** (`resources/scope.yaml`, `resources/role.yaml`): which users may call the operation.
9. **Deploy** (`php bin/fusio deploy`): applies everything to the instance.

Don't edit generated code in `src/Model` or `src/Table/Generated`. Change the schema or the migration instead and
regenerate.

## Folder structure

### resources/

| File | Purpose |
|------|---------|
| `config.yaml` | API info (title, description, contact, license) and mail templates |
| `container.php` | [Symfony DI](https://symfony.com/doc/current/components/dependency_injection.html) container configuration |
| `cronjob.yaml` | Periodic jobs that point to an action class |
| `event.yaml` | Events triggered by the app. Users can register HTTP callbacks (webhooks) to receive them |
| `operation.yaml` | All operations, each with a reference to an operation file in `operations/` |
| `operations/` | One file per operation (route) |
| `role.yaml` | The scopes assigned to each role |
| `scope.yaml` | All scopes of the API |
| `typeschema.json` | [TypeSchema](https://typeschema.org/) specification used to generate the model classes in `src/Model` |

### src/

| Folder | Purpose |
|--------|---------|
| `Action` | Action classes used by the operations |
| `Migrations` | Doctrine migrations that set up the database structure (`php bin/fusio migrations:generate`) |
| `Model` | Generated model classes (`php bin/fusio generate:model`) |
| `Service` | Service classes that contain the business logic of your API |
| `Table` | Table classes (`php bin/fusio generate:table`) |
| `View` | Views that build the collection and entity responses |

## Useful commands

```
php bin/fusio generate:model                 # resources/typeschema.json -> src/Model
php bin/fusio migrations:generate            # new empty migration in src/Migrations
php bin/fusio migrations:migrate             # run the migrations
php bin/fusio generate:table                 # app_* tables -> src/Table
php bin/fusio deploy                         # apply resources/* to the instance
php bin/fusio route                          # list all routes
php bin/fusio generate:sdk client-typescript # generate a client SDK into output/
vendor/bin/phpstan                           # static analysis
```

## Troubleshooting

* **`TypeError` in `__construct()` after adding a class or changing a constructor:** the DI container is compiled to
  `cache/container.php` and isn't rebuilt automatically. Delete `cache/container.php*`.
* **"not in the scope of the provided token":** you deployed new scopes after logging in. Run `php bin/fusio login`
  again.
* **`deploy` fails with an authentication error:** check `php bin/fusio whoami`. After a database reset, run
  `php bin/fusio logout`, `adduser`, and `login` again.

## Docker

This repository contains a [Dockerfile](./Dockerfile) and a [GitHub action](./.github/workflows/docker.yml) that build
a Docker image on every push. You can run this image on any Docker platform, or take a look at
[Plant](https://github.com/apioo/fusio-plant), which helps you run Fusio images on a server.
