---
sidebar_position: 2
---

# Installation

Fusio is a self-hosted platform, this means you run it on your own server or cloud environment and keep full
control over your data. This page explains how to get Fusio up and running.

## Choose your installation method

There are two ways to install Fusio:

| Method                      | Recommended for                                     | Effort                                              |
|-----------------------------|-----------------------------------------------------|-----------------------------------------------------|
| [Docker](./docker)          | Most users, quick evaluation and production setups  | Low, a complete system runs with a single command   |
| Manual (described below)    | Existing PHP servers or shared hosting              | Medium, you set up PHP, database and web server     |

If you just want to try out Fusio, we recommend [Docker](./docker), it takes only a few minutes and requires no
configuration.

## Manual installation

### Requirements

Fusio is written in PHP. To run it you need:

* **PHP 8.4** or higher
* **A database**: MySQL or PostgreSQL
* **A web server**: i.e. [Apache](./apache) or [Nginx](./nginx)
* **[Composer](https://getcomposer.org/)**, in case you want to install Fusio through Composer

We recommend to enable the following PHP extensions, which are also installed at our Docker image:
`pdo_mysql` or `pdo_pgsql`, `curl`, `dom`, `xml`, `mbstring`, `intl`, `zip`, `bcmath`, `gd`, `sockets`,
`soap` and `opcache`.

### Step 1: Download

Download Fusio with one of the following options:

* **Composer**: Run `composer create-project fusio/fusio`
* **ZIP**: Download the `fusio.zip` of the [latest release](https://github.com/apioo/fusio/releases) and extract it

Place the `fusio/` folder on your server, i.e. at `/var/www/html/fusio`. The folder has the following structure:

```
fusio/
├── bin/          # the fusio CLI
├── cache/        # must be writable by the web server
├── log/          # must be writable by the web server
├── public/       # the document root of your web server
│   ├── apps/     # contains installed apps, i.e. the backend app
│   └── index.php
└── .env          # the configuration file
```

:::warning
Only the `public/` folder should be accessible through your web server. Never point the document root to the
`fusio/` folder itself, otherwise sensitive files like the `.env` file could be accessed.
:::

### Step 2: Configure

Open the `.env` file and adjust the following values:

```env
APP_PROJECT_KEY="[a random secret string]"
APP_CONNECTION="pdo-mysql://[user]:[password]@[host]/[database]"
APP_URL="https://api.acme.com"
APP_APPS_URL="https://api.acme.com/apps"
```

* `APP_PROJECT_KEY`: A secret key which is used i.e. to sign tokens, please use a long random string
* `APP_CONNECTION`: The connection to your database, for PostgreSQL use the `pdo-pgsql://` prefix
* `APP_URL`: The URL which points to the `public/` folder, if you host Fusio inside a sub-folder this would be
  i.e. `https://acme.com/fusio`
* `APP_APPS_URL`: The URL which points to the `public/apps/` folder

You can find a description of all available settings at the [Configuration](./configuration) page.

### Step 3: Set up the database

Run the following command to create all tables at your database:

```
php bin/fusio migration:migrate
```

### Step 4: Create an administrator

Create the account which you use to log in to the backend:

```
php bin/fusio adduser
```

The command asks for the role, choose "Administrator", and then for a username, email and password.

### Step 5: Configure your web server

Configure your web server so that the document root points to the `public/` folder and all requests are
forwarded to the `index.php`. Take a look at the guide for your web server:

* [Apache](./apache)
* [Nginx](./nginx)

### Step 6: Set up background tasks

Fusio executes some tasks in the background, i.e. your configured cronjobs, the delivery of events to webhooks
and cleanup tasks. To run them, add the following entries to the crontab of your web server user (i.e. `www-data`):

```
* * * * * php /var/www/html/fusio/bin/fusio cronjob
0 0 1 * * php /var/www/html/fusio/bin/fusio system:log_rotate
0 0 1 * * php /var/www/html/fusio/bin/fusio system:clean
```

Additionally, Fusio uses a message queue to process asynchronous tasks i.e. [async actions](/docs/action/invoke_async_action).
Run the following command as a permanent process, i.e. through [Supervisor](http://supervisord.org/) or a systemd service:

```
php bin/fusio messenger:consume --time-limit=3600
```

The `--time-limit` option restarts the consumer every hour, so make sure your process manager restarts it automatically.

### Alternative: Installation script

Instead of steps 2 to 4 you can also use the web-based installer. Point your browser to `/install.php` of your
Fusio instance and follow the instructions.

:::danger
After the installation, remove the `public/install.php` file for security reasons.
:::

## Log in

After the installation you can log in to the backend app at `/apps/fusio/` with the administrator account
which you have created, i.e. `https://api.acme.com/apps/fusio/`.

In case the backend app is missing, you can install it through the following command:

```
php bin/fusio marketplace:install app fusio
```

Now you are ready to build your first API, take a look at the [Getting started](/docs/bootstrap) page.

## Production checklist

Before you expose Fusio to the internet, please check the following points:

* Set `APP_ENV=prod` and `APP_DEBUG=false` at your `.env` file
* Use a unique and random `APP_PROJECT_KEY`
* Use strong passwords for your administrator and database account
* Serve Fusio only through HTTPS, i.e. with a free certificate from [Let's Encrypt](https://letsencrypt.org/)
* Make sure that only the `public/` folder is accessible through your web server
* Remove the `public/install.php` file
* Set up the [background tasks](#step-6-set-up-background-tasks)

## Update

### Fusio

To update Fusio, download the latest release from [GitHub](https://github.com/apioo/fusio/releases) and replace the
`vendor/` folder and the `composer.json` and `composer.lock` files. If you have installed Fusio through Composer,
you can also adjust the version at the `composer.json` file and run `composer update`. After this, run the following
command to migrate the database to the latest version:

```
php bin/fusio migration:migrate
```

Please also take a look at the [changelog](https://github.com/apioo/fusio/blob/master/CHANGELOG.md) and
[upgrade notes](https://github.com/apioo/fusio/blob/master/UPGRADE.md) before you update to a new major version.

### Apps

Apps like the backend or developer portal can be updated at the Marketplace panel of the backend app through the
update button. Alternatively you can use the following CLI command:

```
php bin/fusio marketplace:update app [name]
```
