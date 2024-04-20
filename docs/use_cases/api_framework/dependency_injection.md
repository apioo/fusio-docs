
# Dependency injection

Fusio uses internally the Symfony [DependencyInjection Component](https://symfony.com/doc/current/components/dependency_injection.html)
to manage all services. To register a service you need take a look at the `resources/container.php` file. This file
describes all services and how to load them.

```php
<?php

use Fusio\Engine\Adapter\ServiceBuilder;
use PSX\Framework\Dependency\Configurator;
use Symfony\Component\DependencyInjection\Loader\Configurator\ContainerConfigurator;

return static function (ContainerConfigurator $container) {
    $services = ServiceBuilder::build($container);
    $services = Configurator::services($services);

    $services->load('App\\Action\\', __DIR__ . '/../src/Action');
    $services->load('App\\Connection\\', __DIR__ . '/../src/Connection');

    $services->load('App\\Service\\', __DIR__ . '/../src/Service')
        ->public();

    $services->load('App\\Table\\', __DIR__ . '/../src/Table')
        ->exclude('Generated')
        ->public();

    $services->load('App\\View\\', __DIR__ . '/../src/View');
};

```

## Folders

The following folders are auto-wired by the DI container, we recommend to use those standard folders but you are of
course free to structure the folders how you like.

### Action

The action folder contains action classes which either extend from `Fusio\Engine\ActionAbstract` or
`Fusio\Engine\ActionInterface`. An action contains the business logic and i.e. invokes another endpoints or fetches
data from a database. You can then reference those classes either directly in an operations yaml file or you can select
action at the backend.

### Connection

The connection folder contains connection classes which either extend from `Fusio\Engine\ConnectionAbstract` or
`Fusio\Engine\ConnectionInterface`. A connection provides a connection to a remote system i.e. it could return an
connection to a database or also a client SDK. Connections can be used in your action to complete a specific task.

### Service

A service is a general PHP class which contains business logic independent of the Fusio context. In general the service
should contain the logic to create, update or delete a specific entity.

### Table

The table folder contains table classes which are automatically generated from your schema. By default Fusio only works
with a migration system where you define the table structure, then you can use the following command to generate all
tables s.

```
php bin/fusio generate:table
```

Fusio does not come with an ORM system by default but you are of course free to include any ORM you like.

### View

View classes are also classes to produce a specific view i.e. a collection or entity response. Those classes do not work
on a concrete table but they can use the table classes to create a fitting response. 

## Debug

To debug the container and see all available services you can use the following command s.

```
php bin/fusio debug:container
```
