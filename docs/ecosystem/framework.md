
# Framework

Fusio [Framework](https://github.com/apioo/fusio-framework) is a starter project to use [Fusio](https://github.com/apioo/fusio) as a framework.

## ℹ️ About

Fusio is an API management tool where you can configure i.e. operations, actions and schemas
through the backend. Using Fusio as a Framework basically only means that you can place
all this configuration in config files and put it under version control so that you
can always start and run a fully configured Fusio instance. Fusio provides a `deploy` command
which reads all configuration files under `resources` and post them to the internal REST API
like you would also do through the backend panel. This repository contains all configuration files and a demo todo endpoint which shows
how you can build a simple endpoint.

## 🛠️ Installation

* Run `composer install` to install all required dependencies
* Enter the correct database credentials at the `.env` file
* Run the command `php bin/fusio migrate`
    * This command installs the Fusio and app tables at the provided database
* Run the command `php bin/fusio adduser`
    * This command adds a new administrator account
* Run the command `php bin/fusio login`
    * To authenticate with the account which you have created
* Run the command `php bin/fusio deploy`
    * This command reads the config files at the `resources/` folder and creates the fitting resources.

> Note this repository does not contain the Fusio backend app, since we develop the complete API via source files. If you
want to use the backend app you need to install it from the marketplace via: `php bin/fusio marketplace:install fusio`

## 📁 Folder

### resources/

* __operations__
  > Folder which contains operation configurations

* __config.yaml__
  > Contains the Fusio system config

* __container.php__
  > Contains the [Symfony DI](https://symfony.com/doc/current/components/dependency_injection.html) container configuration

* __events.yaml__
  > Contains a list of events which are triggered by the app. Users can then register HTTP callbacks to receives those events

* __operations.yaml__
  > Contains all available operations with a reference to an operation file inside the `operations/` folder

* __typeschema.json__
  > Contains the [TypeSchema](https://typeschema.org/) specification to generate the model classes under `src/Model`

### src/

* __Action__
  > Contains all action classes which are used at the defined operations

* __Migrations__
  > Contains all migration files to setup the database structure (`php bin/fusio migration:generate`)

* __Model__
  > Contains the generated model classes (`php bin/fusio generate:model`)

* __Service__
  > Contains the service classes which handle the business logic of your API

* __Table__
  > Contains all table classes (`php bin/fusio generate:table`)

* __View__
  > Contains custom views to return the collection and entity response

## 🐳 Docker

This repository contains a [Dockerfile](https://github.com/apioo/fusio-framework/blob/main/Dockerfile)
and [GitHub action](https://github.com/apioo/fusio-framework/blob/main/.github/workflows/docker.yml) to
automatically build a Docker image on push. You can then run this image on any Docker
platform, or you can also take a look at [Plant](https://github.com/apioo/fusio-plant)
which helps to run Fusio images on a server.
