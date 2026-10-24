
# Custom Action

In Fusio it is easily possible to develop a custom action in case you want to implement a specific logic. This page
explains how to build a custom action.

## Autoload

To build a custom action you first need to define autoloading in your `composer.json` file so that Fusio is able to load
your class. Therefore you need to add the following config to the `composer.json` file:

```json
{
  "autoload": {
    "psr-4": {
      "App\\": "src/"
    }
  }
}
```

More information about composer autoloading can be found at:
https://getcomposer.org/doc/01-basic-usage.md#autoloading

## Development

Now you can create a PHP file at `src/Action/HelloWorld.php` with the following content.

```php
<?php

namespace App\Action;

use Fusio\Engine\ActionAbstract;
use Fusio\Engine\ContextInterface;
use Fusio\Engine\ParametersInterface;
use Fusio\Engine\RequestInterface;

class HelloWorld extends ActionAbstract
{
    public function handle(RequestInterface $request, ParametersInterface $configuration, ContextInterface $context): mixed
    {
        return $this->response->build(200, [], [
            'hello' => 'world'
        ]);
    }
}

```

This hello world action is completely functional and can be directly used in your API.

## Integration

To be able to use the action you need to add the action to the DI container. Please take a look at the
[depedency injection](./dependency_injection) chapter to see how you can use the DI container. The important part is
to add the following line to your `resources/container.php` file so that the actions are autoloaded through the DI:

```php
$services->load('App\\Action\\', __DIR__ . '/../src/Action');
```

If you want to create an action which is reusable for other users, you can also create a
[Fusio adapter](../internal/adapter.md) as separate composer package. Then other users can easily include and use those 
actions. Please take a look at our [website](https://www.fusio-project.org/adapter) to see all available adapters.

## API

Inside your action, you already have most tools available to complete many tasks. To see the complete action API please
take a look at our [PHP API](/docs/development/php_api). The following is an example which shows
some interesting methods of the internal action API:

```php
<?php

namespace App\Action;

use Fusio\Engine\ActionAbstract;
use Fusio\Engine\ContextInterface;
use Fusio\Engine\ParametersInterface;
use Fusio\Engine\RequestInterface;

class HelloWorld extends ActionAbstract
{
    public function handle(RequestInterface $request, ParametersInterface $configuration, ContextInterface $context): mixed
    {
        $myConnection = $this->connector->getConnection('My_Connection');

        $this->dispatcher->dispatch('my_event', ['foo' => 'bar']);

        $this->logger->info('A log message');

        return $this->response->build(200, [], [
            'hello' => 'world'
        ]);
    }
}

```

## Dependency Injection

In case your action needs other external dependencies you can also simply declare the dependencies in the constructor.
Fusio then tries to inject the correct service via autowiring. Please take a look at the
[dependency injection](dependency_injection.md) chapter to get more details how this works.

## Adapter

In case you have developed custom actions which you like to share with the community you can also
build a composer package which contains these actions. Take a look at the [adapter](/docs/internal/adapter)
page for more information.
