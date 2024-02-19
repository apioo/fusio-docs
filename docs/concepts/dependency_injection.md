
# Dependency Injection

Fusio uses the [Symfony DI component](https://symfony.com/doc/current/components/dependency_injection.html) to manage
dependencies. The `resources/container.php` file contains the main DI configuration file to define all services for your
app. We recommend to enable autowiring for specific folders so that you don`t need to manually register a service. I.e.
if you follow the recommended Fusio folder structure you could enable auto-wiring on the following folders.

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

Through this you only need to add a class at the specific folder and it automatically available for the system and
you can then also include every dependency at the constructor. I.e. you could paste the following custom action code to
the `src/Action/MyAction.php` and you can then use the action class `App\Action\MyAction` directly at an operation. 

```php
<?php

namespace App\Action;

use Fusio\Engine\ActionAbstract;
use Fusio\Engine\ContextInterface;
use Fusio\Engine\ParametersInterface;
use Fusio\Engine\RequestInterface;

class MyAction extends ActionAbstract
{
    public function handle(RequestInterface $request, ParametersInterface $configuration, ContextInterface $context): mixed
    {
        $body = [
            'hello' => 'world',
        ];

        return $this->response->build(200, [], $body);
    }
}

```

We have created also a sample project showing all best practices of Fusio at:
https://github.com/apioo/fusio-sample-cms

