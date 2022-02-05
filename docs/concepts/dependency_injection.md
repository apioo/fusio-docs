
# Dependency Injection

Fusio uses a DI container to manage all internal services. In Fusio all services are defined in a simple PHP class so
there is no yaml configuration. To define a custom service you need to create a container class i.e. at
`src/Dependency/Container.php`. This class then needs to extend the Fusio container:

```php
<?php

namespace App\Dependency;

use Fusio\Impl\Dependency\Container as FusioContainer;

class Container extends FusioContainer
{
    public function getMyService(): MyServiceInterface
    {
        return new MyService(
            $this->get('connector')->getConnection('System'),
            $this->get('engine_dispatcher')
        );
    }
}
```

In this example we simply define a new service. To use this container you need to create a new instance of this
container at the `container.php` file.

```php
<?php

$container = new Fusio\Impl\Dependency\Container();
$container->setParameter('config.file', __DIR__ . '/configuration.php');

return $container;
```

Then you can use the autowire feature of the DI container to receive the dependencies through constructor injection. In
the following we create an action which automatically receives the `MyServiceInterface` based on the type-hint. It is
important that the type-hint and the return type of the method at the DI container match.

```php
<?php

namespace App\Action\Page;

use Fusio\Engine\ActionAbstract;
use Fusio\Engine\ContextInterface;
use Fusio\Engine\ParametersInterface;
use Fusio\Engine\RequestInterface;

class MyAction extends ActionAbstract
{
    private $myService;

    public function __construct(MyServiceInterface $myService)
    {
        $this->myService = $myService;
    }

    public function handle(RequestInterface $request, ParametersInterface $configuration, ContextInterface $context)
    {
        $body = [
            'result' => $this->myService->doStuff();
        ];

        return $this->response->build(200, [], $body);
    }
}
```

We have created also a sample project showing all best practices of Fusio at:
https://github.com/apioo/fusio-sample-cms

