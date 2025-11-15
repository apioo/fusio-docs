---
sidebar_position: 1
---

# Installation

## Requirements

Fusio is written in PHP and requires at least version 8.3 and a database.

* __PHP >= 8.3__
* __Database (supports: MySQL, PostgreSQL)__

## Download

There are two ways of downloading Fusio:

* [Download](https://www.fusio-project.org/download) the latest release from Github
* Use composer and run the command `composer create-project fusio/fusio`

Place the script in the `www/` directory of your web server. After successfully downloading Fusio, please continue with the
setup process. The setup process will help configure Fusio to work properly on your server.

## Setup

### Manual Setup

* __Adjust the configuration file__  
  Open the file `.env` in the Fusio directory and insert the fitting database credentials to the `APP_CONNECTION` key.
  It is also recommended to provide the `APP_URL` which contains the domain pointing to the public folder i.e.
  `https://api.my_domain.com` or `https://my_domain.com/fusio`, this is required if you host Fusio inside
  a sub-folder otherwise Fusio tries to detect the domain via the host header.

* __Execute the installation command__  
  The installation script inserts the Fusio database schema into the provided database. It can be executed with the
  following command `php bin/fusio migrate`.

* __Create administrator user__  
  After the installation is complete you have to create a new administrator account. Therefor you can use the following
  command `php bin/fusio adduser`. Choose as account type "Administrator".

### Installation Script

To use the install script instead of the manual setup above, point your browser to `public/install.php`. The script will
help setup Fusio and configure it to work on your server.

Once you are done, for security reasons, remove the `public/install.php` script.

## Done

If the installation is complete you are able to login at the backend at `/apps/fusio`. In case the `fusio` folder does
not exist you can also manually install the backend app through `php bin/fusio marketplace:install fusio`.

Please take a look also at our docs regarding a specific platform:

* [Docker](./docker)
* [Apache](./apache)
* [Nginx](./nginx)
* [IIS](./iis)
* [cPanel](./cpanel)

## Update

### Backend

To update the backend we recommend to download the latest release from [GitHub](https://github.com/apioo/fusio) and
replace the `vendor/` folder and the `composer.json` and `composer.lock` file. After this you only need to run the
following command:

```
php bin/fusio migrate
```

Through this command Fusio executes all new migrations to migrate the database structure to the latest version.

### Apps

All apps can be updated at the Marketplace panel of the backend app. There you can simply use the update button to
receive the latest version of the app. In case the Marketplace is disabled you can also download the app directly from
our website at: https://www.fusio-project.org/marketplace or use our CLI command to update an app to the latest version:

```
php bin/fusio marketplace:update [name]
```
