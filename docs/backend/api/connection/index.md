
# Connection

A connection enables Fusio to connect to other remote services. This can be i.e. a database or message queue service.
Please take a look at the [adapter](https://www.fusio-project.org/adapter) to see a list of all available connections.
It is also easy possible to develop your own custom connection.

## Configuration

![connection_create](/img/backend/api/connection_create.png)

### Name

The name of the connection.

### Class

The connection class. Besides selecting an connection you can also enter a custom connection class by using the edit button.

### Config

All other input fields are action specific.

## Designer

Most connections provide a designer panel, which you can see through the terminal icon
right after the edit button. The designer panel helps to interact with the connection.
I.e. for a database it is possible to manage the table schema and for a filesystem
panel it is possible to upload and list files. The following designer panels are available:

* [Database](./designer/database)
* [Filesystem](./designer/filesystem)
* [HTTP](./designer/http)
* [SDK](./designer/sdk)

## Development

To develop a custom connection you need to create a class which implements the interface
`Fusio\Engine\ConnectionInterface`.

In general a connection should return a fully configured object which can be used at an action.
I.e. the database connection returns a configured doctrine DBAL instance so that a user does not need
to provide any credentials at an action.

In the following an example connection:

```php
<?php

namespace App\Connection;

use Fusio\Engine\ConnectionInterface;
use Fusio\Engine\Form\BuilderInterface;
use Fusio\Engine\Form\ElementFactoryInterface;
use Fusio\Engine\ParametersInterface;

class AcmeConnection implements ConnectionInterface
{
    public function getName(): string
    {
        return 'Acme-Client';
    }

    public function getConnection(ParametersInterface $config): MyClient
    {
        return new MyClient(
            $config->get('username'),
            $config->get('password'),
        );
    }

    public function configure(BuilderInterface $builder, ElementFactoryInterface $elementFactory): void
    {
        $builder->add($elementFactory->newInput('username', 'Username', 'text', 'The name of the service user'));
        $builder->add($elementFactory->newInput('password', 'Password', 'password', 'The password of the service user'));
    }
}
```
