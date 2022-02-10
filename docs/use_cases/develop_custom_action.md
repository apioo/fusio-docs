
# Develop custom action

In Fusio it is easy possible to develop a custom action in case you want to implement a specific logic. This page
explains how to build a custom action.

## Autoload

To build a custom action you first need define autoloading in your `composer.json` file so that Fusio is able to load
your class. Therefor you need to add the following config to the `composer.json` file:

```json
{
  "autoload": {
    "psr-4": {
      "App\\": "src/"
    }
  }
}
```

More information about composer autoloading at:
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

This hello world action is complete functional and can be directly used at your API.

## Integration

You can also add this class to the `provider.php` file under the `action` key:

```php
<?php

return [
    'action' => [
        // ...
        \App\Action\HelloWorld::class,
    ],
    // ...
];

```

Then you can also select this action at the backend. If you want to create an action which is reusable for other users
you can also create a [Fusio adapter](../concepts/adapter) which allows other users to reuse your action. Please
take a look at our [website](https://www.fusio-project.org/adapter) to see all available adapter.

## API

Inside your action you have already most tools avaialble to complete many tasks. To see the complete action API please
take a look at our [PHP API](https://www.fusio-project.org/documentation/php). In the following an example which shows
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

Through the connector you can obtain a connection which is configured at Fusio. This means you can get i.e. a database
connection or http client connection to work with a remote service. Which concrete instance the connector returns
depends always on the configured connection. The following table provides a first overview:

| Name          | Return                                       | Website                                            | Class                                                  |
|---------------|----------------------------------------------|----------------------------------------------------|--------------------------------------------------------|
| AMQP          | `PhpAmqpLib\Connection\AMQPStreamConnection` | https://github.com/php-amqplib/php-amqplib         | `Fusio\Adapter\Amqp\Connection\Amqp`                   |
| Beanstalk     | `Pheanstalk\Pheanstalk`                      | https://github.com/pda/pheanstalk                  | `Fusio\Adapter\Beanstalk\Connection\Beanstalk`         |
| Elasticsearch | `Elasticsearch\Client`                       | https://github.com/elastic/elasticsearch-php       | `Fusio\Adapter\Elasticsearch\Connection\Elasticsearch` |
| GraphQL       | `Fusio\Adapter\GraphQL\ClientInterface`      | https://github.com/apioo/fusio-adapter-graphql/    | `Fusio\Adapter\GraphQL\Connection\GraphQL`             |
| HTTP          | `GuzzleHttp\Client`                          | http://docs.guzzlephp.org/en/latest/               | `Fusio\Adapter\Http\Connection\Http`                   |
| Memcache      | `Memcache`                                   | https://www.php.net/manual/book.memcache.php       | `Fusio\Adapter\Memcache\Connection\Memcache`           |
| MongoDB       | `MongoDB\Database`                           | https://github.com/mongodb/mongo-php-library       | `Fusio\Adapter\Mongodb\Connection\MongoDB`             |
| Redis         | `Predis\Client`                              | https://github.com/predis/predis                   | `Fusio\Adapter\Redis\Connection\Redis`                 |
| SMTP          | `Symfony\Component\Mailer\Mailer`            | https://symfony.com/doc/current/mailer.html        | `Fusio\Adapter\Smtp\Connection\Smtp`                   |
| SOAP          | `SoapClient`                                 | https://www.php.net/manual/class.soapclient.php    | `Fusio\Adapter\Soap\Connection\Soap`                   |
| Sql           | `Doctrine\DBAL\Connection`                   | http://www.doctrine-project.org/projects/dbal.html | `Fusio\Adapter\Sql\Connection\Sql`                     |

## Dependency Injection

In case your action needs other external dependencies you can also simply declare the dependencies at the constructor.
Fusio tries then to inject the correct service via autowiring. Please take a look at the
[dependency injection](../concepts/dependency_injection) chapter to get more details how this works.

