
# Folder structure

This page contains the recommended folder structure for every Fusio project.
You can find a live example also at our [sample headless CMS](https://github.com/apioo/fusio-sample-cms) repository.

## `resources/config.yaml`  

Contains config values of Fusio, you can see all available settings also
under the System / Settings panel.

```yaml
info_title: "MyAPI"
info_description: "This is a description of my API service"
info_contact_url: "https://my-awesome-project.com"
```

## `resources/connection.yaml`

Contains additional connections i.e. you could add a Stripe connection if you want to use
the payment system or additional connections to other databases.

```yaml
Stripe:
  class: "Fusio\\Adapter\\Stripe\\Connection\\Stripe"
  config:
    api_key: "${env.STRIPE_API_KEY}"
```

## `resources/container.php`

Contains [Symfony DI](https://symfony.com/doc/current/components/dependency_injection.html) container configuration.

```php
<?php

use Fusio\Engine\Adapter\ServiceBuilder;
use PSX\Framework\Dependency\Configurator;
use Symfony\Component\DependencyInjection\Loader\Configurator\ContainerConfigurator;

return static function (ContainerConfigurator $container) {
    $services = ServiceBuilder::build($container);
    $services = Configurator::services($services);

    $services->load('App\\Action\\', __DIR__ . '/../src/Action');

    $services->load('App\\Service\\', __DIR__ . '/../src/Service')
        ->public();

    $services->load('App\\Table\\', __DIR__ . '/../src/Table')
        ->exclude('Generated')
        ->public();

    $services->load('App\\View\\', __DIR__ . '/../src/View');
    $services->load('App\\EventListener\\', __DIR__ . '/../src/EventListener');
    $services->load('App\\MessengerHandler\\', __DIR__ . '/../src/MessengerHandler');

};

```

## `resources/event.yaml`

Contains a list of available events which are triggered by your API. Users can then
create webhooks for those events which are called in case such an event was dispatched.

```
my_api.domain.event:
  description: "My custom event"

```

## `resources/operation.yaml`

Contains all operations of your API. Each operation points to a dedicated `yaml` file which contains all information
about the endpoint.

```yaml
"domain.getAll": !include resources/operations/domain/collection.yaml
"domain.get": !include resources/operations/domain/entity.yaml
"domain.create": !include resources/operations/domain/create.yaml
"domain.update": !include resources/operations/domain/update.yaml
"domain.delete": !include resources/operations/domain/delete.yaml
```

### `resources/operations/domain/entity.yaml`

An operation file looks like.

```yaml
scopes: ["my_scope"]
public: true
stability: 1
description: "Returns a domain object"
httpMethod: GET
httpPath: "/domain/:id"
httpCode: 200
parameters:
  lastModified:
    type: string
outgoing: "App\\Model\\Domain"
throws:
  500: "App\\Model\\Message"
action: "App\\Action\\Domain\\Get"
```

## `resources/plan.yaml`

Contains all defined plans.

```yaml
Pro:
  description: "My pro plan description"
  price: 20
  points: 0
  period: 1
  externalId: "${env.STRIPE_PRO_PRICE}"
```

## `resources/role.yaml`

Defines all scopes for a specific role.

```yaml
Consumer:
  scopes:
    - authorization
    - consumer
    - default
    - domain
```

## `resources/scope.yaml`

Contains all available scopes.

```yaml
domain:
  description: "A scope for my domain"
```

## `resources/typeschema.json`

Contains a [TypeSchema](https://typeschema.org/) specification which is used to [generate all model](./generate_model) classes.

```json
{
  "definitions": {
    "Message": {
      "type": "object",
      "properties": {
        "success": {
          "type": "boolean"
        },
        "message": {
          "type": "string"
        }
      }
    }
  }
}
```

## `src/Action`

Contains all actions which are referenced in the operation files. Each action
can be seen like a controller class it is the entry point where the request
arrives, it should not contain too many business logic instead it should use
a service to execute a specific logic or use a view to return a specific
representation.

## `src/Event`

Contains all event classes which can be dispatched through the `Psr\EventDispatcher\EventDispatcherInterface` implementation.

## `src/EventListener`

Contains all event listener classes, each event listener should implement the `Symfony\Component\EventDispatcher\EventSubscriberInterface` interface.

## `src/Exception`

Contains all custom exceptions.

## `src/Messenger`

Contains all messenger classes.

## `src/MessengerHandler`

Contains all messenger handler classes.

## `src/Migrations`

Contains migrations which can be executed. To execute those migrations you can run
the following command: `php bin/fusio migration:migrate`.
See also the [migration](./migration) page.

## `src/Model`

Contains all models which are used at your actions.
You can automatically generate those models with the following command: `php bin/fusio generate:model`.
More information at the [generate model](./generate_model) page.

## `src/Service`

Contains all service classes which contain the business logic of your API. Those classes are autowired
by the DI container and can be used at every action.

## `src/Table`

Contains all tables classes which can be used at a service class to interact with the database.
You can automatically generate those tables with the following command: `php bin/fusio generate:table`.
More information at the [generate table](./generate_table) page.

## `src/View`

Contains custom views to create complex JSON responses based on your tables.
