
# Connection

A connection enables Fusio to connect to other remote services. This can be i.e. a database or message queue service.
Please take a look at the [adapter](https://www.fusio-project.org/adapter) to see a list of all available connections.
It is also easy possible to develop your own custom connection.

![connection_create](/img/backend/api/connection_create.png)

## Development

To develop a custom connection you need to create a class which implements the interface
`Fusio\Engine\ConnectionInterface`. Then you can add this class to the `provider.php` file. Through this it is possible
to select this connection at the backend.

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
