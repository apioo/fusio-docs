
# Business logic

In case your API is not a simple CRUD app you probably need to execute some more complex business logic. This chapter
shows options how you can organize this business logic for simple reuse.

In general an action should not contain any business logic it should simply forward the data to the fitting library or
service. It is equivalent to a controller in a classical framework environment. If an action contains too many lines of
code or you copy specific code snippets into different actions it is a smell to extract this logic into an external
service. Inside an action you can then reuse this external service.

Fusio is designed to help you write framework independent code. That means that all services which you develop are
complete free of Fusio specific code so you can simply reuse those components in another context.

## PHP Class

The simplest solution is to move business logic into a separate PHP class. This class can be autoloaded through
composer. You can place this class either directly into the `src/Service` folder or develop a custom PHP package and
require this package through composer.

In general a library should work with a specific connection. The following example shows a simple custom logger
implementation which you could use in different actions.

```php
<?php

$connection = $connector->get('Mysql-1');

$myLogger = new MyLogger($connection);
$myLogger->log('A new log entry');
```

A simple implementation of the logger could look like:

```php
<?php

namespace Acme\MyLib;

use Doctrine\DBAL\Connection;

class MyLogger
{
    /**
     * @var \Doctrine\DBAL\Connection
     */
    protected $connection;

    public function __construct(Connection $connection)
    {
        $this->connection = $connection;
    }

    public function log($message)
    {
        $this->connection->insert('my_table', [
            'message' => $message,
        ]);
    }
}
```

## Microservice

If your business logic is more complex or has specific performance requirements you could also develop it as an external
microservice. This has the advantage that service is completely decoupled from your app and it is also possible to use a
complete different language. Usually you can talk to the microservice through HTTP. But it would be also possible to use
a different protocol i.e. an AMQP connection to use a message queue.

```php
<?php

$client = $connector->get('Http-1');

$myClient = new MyClient($client);
$myClient->send(['foo' => 'bar']);
```

A simple client implementation could look like:

```php
<?php

namespace Acme\MyLib;

use GuzzleHttp\Client;

class MyClient
{
    /**
     * @var \GuzzleHttp\Client
     */
    protected $client;

    public function __construct(Client $client)
    {
        $this->client = $client;
    }

    public function send($data)
    {
        $this->client->post('http://foo.bar/my_service', [
            'json' => $data
        ]);
    }
}
```
