---
sidebar_position: 1
---

# Installation

## Requirements

Fusio is written in PHP and requires at least version 7.4 and a database.

* __PHP >= 7.4__
* __Database (supports: MySQL, PostgreSQL, MSSQL, Oracle)__

## Download

There are two ways of downloading Fusio:

* [Download](https://www.fusio-project.org/download) the latest release from Github
* Use composer and run the command `composer create-project fusio/fusio`

Place the script in the www directory of your web server. After successfully downloading Fusio, please continue with the
setup process. The setup process will help configure Fusio to work properly on your server.

## Setup

### Manual Setup

* __Adjust the configuration file__  
  Open the file `.env` in the Fusio directory and change the key `FUSIO_URL` to the domain pointing to the public
  folder. Also insert the database credentials to the `FUSIO_DB_*` keys.

* __Execute the installation command__  
  The installation script inserts the Fusio database schema into the provided database. It can be executed with the
  following command `php bin/fusio install`.

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
