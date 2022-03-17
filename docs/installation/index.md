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

# Cloud

If you dont want to manually install Fusio you can take a look at our [cloud platform](https://fusio.cloud/) which you
can use to directly run a Fusio instance in the cloud.

# Updating

Fusio contains two parts which can be updated. The backend system and the backend app. The backend app is the Angular
application which connects to the backend api and where you configure the system. The backend system contains the actual
backend code providing the backend API.

## Server

Fusio makes heavy use of composer. Because of that you can easily upgrade a Fusio system with the following composer
command.

.. code-block:: text

    composer update fusio/impl

This has also the advantage that the version constraints of installed adapters are checked and in case something is
incompatible composer will throw an error. It is also possible to simply replace the vendor folder with the folder from
the new release. In either case you have to run the following command after you have updated the vendor folder:

.. code-block:: text

    php bin/fusio install

This gives Fusio the chance to adjust the database schema in case something has changed with a new release.

## Apps

All apps can be updated at the Marketplace panel of the backend app. There you can simply use the update button to
receive the latest version of the app. In case the Marketplace is disabled you can also download the app directly from
our website at: https://www.fusio-project.org/marketplace
