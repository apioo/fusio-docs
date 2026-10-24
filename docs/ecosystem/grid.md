
# Grid

> Instant, production-ready REST APIs directly from your relational database.

Fusio Grid turns an existing relational database (MySQL / MariaDB, PostgreSQL) into a secure REST API with a
single command, similar to tools like [PostgREST](https://postgrest.org/). It reads the database schema and creates
schemas, actions and CRUD operations for every table. Because everything is generated as regular
[Fusio](https://github.com/apioo/fusio) entities, you can edit the result in the Fusio backend and you get all Fusio
gateway features (authentication, rate limiting, OpenAPI, SDK generation, ...) on top.

## Table of Contents

* [Key Features](#key-features)
* [How It Works](#how-it-works)
* [Requirements](#requirements)
* [Installation](#installation)
* [Quick Start](#quick-start)
* [The Generated API](#the-generated-api)
* [CLI Command Reference](#cli-command-reference)
* [Project Structure](#project-structure)
* [Development Guide](#development-guide)
* [Troubleshooting](#troubleshooting)
* [Ecosystem](#ecosystem)

## Key Features

* __Instant REST Endpoints__: Full CRUD endpoints (`GET`, `POST`, `PUT`, `DELETE`) for every table under
  `/{connection_name}/{table_name}`.
* __Type-Safe Schemas__: Columns, types and nullability are reflected via Doctrine DBAL into
  [TypeSchema](https://typeschema.org/) definitions, which are used to validate incoming requests.
* __Pagination, Filtering & Sorting__: Collection endpoints support query parameters out of the box.
* __OpenAPI & SDK Generation__: Generate an OpenAPI specification or client SDKs (TypeScript, PHP, Python, Java, Go,
  C#, ...) through Fusio's built-in tooling.
* __Gateway Features__: API key / OAuth2 authentication, scopes, rate limiting and logging provided by Fusio.
* __Interactive & CI/CD Friendly__: Configure everything through terminal prompts or headless via CLI options, i.e.
  inside a Docker entrypoint.
* __No Lock-In__: Every generated operation, action and schema is a normal Fusio entity, so you can extend it with
  custom logic once your requirements grow beyond plain CRUD.

## How It Works

Fusio Grid is a thin [Fusio](https://github.com/apioo/fusio) project. When you run `php bin/fusio grid:setup` the
following happens:

```
            ┌──────────────────────┐
            │  php bin/fusio       │  1. Resolve the logged-in Fusio user (auth:login)
            │  grid:setup          │  2. Collect DB credentials (prompts or CLI options)
            └──────────┬───────────┘
                       │
                       ▼
            ┌──────────────────────┐
            │  Target database     │  3. Test the connection, fail if it has no tables
            └──────────┬───────────┘
                       │
                       ▼
            ┌──────────────────────┐
            │  Fusio connection    │  4. Create (or update) an SQL connection named {name}
            └──────────┬───────────┘
                       │
                       ▼
            ┌──────────────────────┐
            │  SqlDatabase         │  5. Reflect every table and show a changelog preview
            │  generator           │  6. Ask for confirmation (interactive mode only)
            └──────────┬───────────┘
                       │
                       ▼
            ┌──────────────────────┐
            │  Fusio entities      │  7. Per table: 2 schemas, 5 actions, 5 operations
            │  (in one transaction)│     under the base path /{name}
            └──────────────────────┘
```

At runtime a request like `GET /inventory/items` is routed by Fusio to the generated operation, which calls the
`SQL-Select-All` action. The action queries the target database through the stored connection and returns the result.

> [!NOTE]
> There are two databases involved: the __Fusio database__ (configured via `FUSIO_CONNECTION` in `.env`) stores the
> API configuration (users, apps, operations, ...), while the __target database__ (passed to `grid:setup`) is the
> database you want to expose. They can be the same server, but should be separate databases.

## Requirements

* PHP >= 8.4 with the PDO extension for your database (`pdo_mysql`, `pdo_pgsql`)
* [Composer](https://getcomposer.org/)
* A database for Fusio itself (MySQL / MariaDB, PostgreSQL)
* The target database you want to expose, containing at least one table

## Installation

1. __Install the dependencies__

   ```bash
   composer install
   ```

2. __Configure the environment__

   Adjust the `.env` file. At minimum set the Fusio database connection and the public URL of your API:

   ```dotenv
   FUSIO_PROJECT_KEY="<random 32 character string>"
   FUSIO_CONNECTION="pdo-mysql://user:password@localhost/fusio"
   FUSIO_URL="http://localhost:8080"
   ```

   For PostgreSQL use i.e. `pdo-pgsql://user:password@localhost/fusio`.

3. __Create the Fusio tables__

   ```bash
   php bin/fusio migrate
   ```

4. __Create an administrator account__

   ```bash
   php bin/fusio adduser --role=1 --username=admin --email=admin@example.com --password=<password>
   ```

5. __Log in with the CLI__

   `grid:setup` creates all entities on behalf of the logged-in user, so you have to authenticate first:

   ```bash
   php bin/fusio login
   ```

   This stores an access token in `fusio_token.json` (do not commit this file). You can check the current user with
   `php bin/fusio auth:whoami`.

6. __Start a web server__

   For local development the PHP built-in server is sufficient:

   ```bash
   php -S 127.0.0.1:8080 -t public public/index.php
   ```

   For production point the document root of Apache or Nginx to the `public/` folder. An `.htaccess` file for
   Apache is already included.

## Quick Start

### Interactive Setup

```bash
php bin/fusio grid:setup
```

The command guides you through:

* Selecting the database driver (MySQL / MariaDB, PostgreSQL).
* Entering host, database name, user and password.
* Entering an optional table prefix.
* Choosing the connection name, which is also used as base path (defaults to the database name).
* Previewing the generated operations and confirming the execution.

### Headless Setup (CI/CD & Docker)

Pass all values as options and add `--no-interaction` (`-n`) so that the command does not wait for input:

```bash
php bin/fusio grid:setup ecommerce \
  --driver=pdo_mysql \
  --host=127.0.0.1 \
  --dbname=ecommerce_prod \
  --user=db_user \
  --password=secret_pass \
  --prefix=app_ \
  --no-interaction
```

If the connection name argument (`ecommerce`) is omitted, it is derived from `--dbname` (lowercased, only
`a-z 0-9 _ -` are kept).

### Re-running the Setup

Running `grid:setup` again with the same connection name updates the connection credentials and generates entities for
newly added tables. Schemas and actions which already exist with the same name are __not__ overwritten, so changes you
made in the backend are preserved. If you change a table structure, delete or adjust the corresponding schema manually.

## The Generated API

### Endpoints

For a connection named `inventory` with an `items` table, the following operations are created:

| Method   | Path                   | Operation                | Description                     | Request body               | Response body                 |
|----------|------------------------|--------------------------|---------------------------------|----------------------------|-------------------------------|
| `GET`    | `/inventory/items`     | `inventory.items.getAll` | List rows (paginated)           | –                          | `Inventory_Items_SQL_GetAll`  |
| `GET`    | `/inventory/items/:id` | `inventory.items.get`    | Fetch a row by primary key      | –                          | `Inventory_Items_SQL_Get`     |
| `POST`   | `/inventory/items`     | `inventory.items.create` | Create a row (`201 Created`)    | `Inventory_Items_SQL_Get`  | `Message`                     |
| `PUT`    | `/inventory/items/:id` | `inventory.items.update` | Update a row by primary key     | `Inventory_Items_SQL_Get`  | `Message`                     |
| `DELETE` | `/inventory/items/:id` | `inventory.items.delete` | Delete a row by primary key     | –                          | `Message`                     |

The matching actions are named `Inventory_Items_SQL_GetAll`, `Inventory_Items_SQL_Get`, `Inventory_Items_SQL_Insert`,
`Inventory_Items_SQL_Update` and `Inventory_Items_SQL_Delete`. If you use `--prefix`, the prefix is stripped from the
table name, i.e. the table `app_items` with prefix `app_` is exposed as `/inventory/items`.

> [!TIP]
> Run `php bin/fusio route` to list all registered routes.

### Collection Query Parameters

The `getAll` endpoint supports the following query parameters:

| Parameter     | Description                                                           | Example               |
|---------------|-----------------------------------------------------------------------|-----------------------|
| `startIndex`  | Offset of the first row (default `0`)                                 | `startIndex=32`       |
| `count`       | Number of rows to return, between `1` and the limit (default `16`)    | `count=10`            |
| `sortBy`      | Column to sort by (default primary key)                               | `sortBy=name`         |
| `sortOrder`   | `ASC` or `DESC` (default `DESC`)                                      | `sortOrder=ASC`       |
| `filterBy`    | Column to filter on                                                   | `filterBy=name`       |
| `filterOp`    | `contains`, `equals`, `startsWith` or `present` (not null)            | `filterOp=startsWith` |
| `filterValue` | Value to filter with                                                  | `filterValue=foo`     |

Example request and response:

```http
GET /inventory/items?startIndex=0&count=2&sortBy=name&sortOrder=ASC&filterBy=name&filterOp=contains&filterValue=chair
```

```json
{
  "totalResults": 12,
  "itemsPerPage": 2,
  "startIndex": 0,
  "entry": [
    {"id": 3, "name": "Arm chair", "price": 199.9},
    {"id": 7, "name": "Office chair", "price": 249}
  ]
}
```

The default limit, sort column and selected columns can be changed per action in the Fusio backend.

### Authentication

All generated operations are created as __private__, so every request needs a valid access token:

```bash
curl -H "Authorization: Bearer <token>" http://localhost:8080/inventory/items
```

To give clients access, create an app in the Fusio backend, assign it the scopes which contain the generated
operations and obtain a token via OAuth2 (`/authorization/token`). For quick tests you can also create a token on
the command line with `php bin/fusio system:token <appId> <userId> <scopes> P1D`. If you want an operation to be
publicly accessible, enable the "public" flag of the operation in the backend.

### OpenAPI & SDKs

Since the API is regular Fusio configuration you can use all Fusio tooling, i.e. generate a client SDK:

```bash
php bin/fusio generate:sdk
```

See the [Fusio documentation](https://docs.fusio-project.org/) for all available formats.

## CLI Command Reference

```bash
php bin/fusio grid:setup [name] [options]
```

### Arguments

* `name` (optional) – Name of the Fusio connection and base path segment (e.g. `shop`). Derived from `--dbname` if
  not supplied.

### Options

| Option             | Description                                                               |
|--------------------|---------------------------------------------------------------------------|
| `-d`, `--driver`   | Database driver: `pdo_mysql`, `pdo_pgsql`                                 |
| `-H`, `--host`     | Database host (interactive default `127.0.0.1`)                           |
| `-P`, `--port`     | Database port                                                             |
| `-D`, `--dbname`   | Database name                                                             |
| `-u`, `--user`     | Database user                                                             |
| `-p`, `--password` | Database password                                                         |
| `-t`, `--prefix`   | Only include tables starting with this prefix, the prefix is removed from the path |
| `-n`, `--no-interaction` | Run without prompts, required for CI/CD                             |

In interactive mode the driver defaults to `pdo_mysql`. In non-interactive mode no defaults are applied, so always
pass `--driver` and all required connection options.

## Project Structure

```
.
├── bin/fusio            # CLI entry point (Symfony Console)
├── cache/               # Compiled DI container and other caches (safe to delete)
├── public/
│   ├── index.php        # HTTP entry point for the API
│   ├── apps/            # Installed web apps, i.e. the Fusio backend
│   └── .htaccess        # Apache rewrite rules
├── .env                 # Environment configuration (DB connection, URLs, keys)
├── configuration.php    # Fusio / PSX configuration, reads the values from .env
├── container.php        # Builds the DI container from the Fusio packages
├── provider.php         # Registered adapters, here the SQL adapter
└── composer.json
```

`src/` (namespace `App\`) and `resources/` are referenced by the configuration but not present yet. Create them if
you want to add custom actions, migrations or services.

## Development Guide

* __Changing the generator__: The generator code lives in the [fusio/impl](https://github.com/apioo/fusio-impl) and
  [fusio/adapter-sql](https://github.com/apioo/fusio-adapter-sql) packages (see [How It Works](#how-it-works)). To work
  on them, clone the repositories and link them via a Composer
  [path repository](https://getcomposer.org/doc/05-repositories.md#path).
* __Adding adapters__: Register additional adapter classes in `provider.php`, e.g. to connect further data sources.
* __Clearing the cache__: After changing `container.php`, `configuration.php` or `provider.php`, delete the files in
  `cache/` or run `php bin/fusio system:clear_cache`.
* __Debugging__: Set `FUSIO_DEBUG="true"` in `.env` to get detailed error messages in API responses. Do not enable this
  in production.
* __Backend UI__: Install the Fusio backend app with `php bin/fusio marketplace:install app fusio` and open
  `/apps/fusio/` to inspect and edit the generated operations, actions and schemas.

## Troubleshooting

| Error | Cause / Solution |
|-------|------------------|
| `Could not get current user id, please run the login command to authenticate` | Run `php bin/fusio login` first. |
| `It looks like the database has no tables` | The target database is empty or the credentials point to the wrong database. |
| `Could not determine connection name` | Pass a `name` argument or the `--dbname` option. |
| `Provided table does not exist` | The table was removed between the preview and the generation, re-run the command. |
| Requests return `401 Unauthorized` | Generated operations are private, see [Authentication](#authentication). |
| Driver not found | Install / enable the matching PDO extension in your `php.ini`. |
