
# Generator

Fusio contains a generator system which helps to generate routes, schemas and actions from different
sources i.e. it can help to create an API from a database or import an OpenAPI specification. The following screenshot
shows the generator form:

![generator](/img/concepts/generator.png)

Every generator has the following fields: 

#### Base-Path

An API `Base-Path` under which all resources are created i.e. `/v1/my_db`

#### Scopes

Optional a comma separated list of scopes which are assigned to the routes.

#### Public

Whether all routes are public or private. By default all routes are private so they can only be invoked
by an authorized user.

#### Class

Through this dropdown field you select the actual generator implementation. Depending on the generator
you will get additional configuration fields which are required for the specific generator.

## Development

You can also easily develop a custom generator i.e. if you want to import resources from a different system
or specification. To build a Generator you need to create a class which implements the
`Fusio\Engine\Generator\ProviderInterface` interface. The following Generator creates a route
which simply outputs a static message.

```php
<?php

namespace App;

use Fusio\Adapter\Sql\Action\SqlUpdate;
use Fusio\Adapter\Util\Action\UtilStaticResponse;
use Fusio\Engine\Factory\Resolver\PhpClass;
use Fusio\Engine\Form\BuilderInterface;
use Fusio\Engine\Form\ElementFactoryInterface;
use Fusio\Engine\Generator\ProviderInterface;
use Fusio\Engine\Generator\SetupInterface;
use Fusio\Engine\ParametersInterface;

class MyGenerator implements ProviderInterface
{
    public function getName(): string
    {
        return 'My-Generator';
    }

    public function setup(SetupInterface $setup, string $basePath, ParametersInterface $configuration): void
    {
        $messageSchema = $setup->addSchema('My_Schema', $this->getMySchema());

        $messageAction = $setup->addAction('My_Message', UtilStaticResponse::class, PhpClass::class, [
            'response' => json_encode(['hello' => $configuration->get('message')]),
        ]);

        $setup->addRoute(1, '/', 'Fusio\Impl\Controller\SchemaApiController', [], [
            [
                'version' => 1,
                'methods' => [
                    'GET' => [
                        'description' => 'Returns a hello message',
                        'responses' => [
                            200 => $messageSchema,
                        ],
                        'action' => $messageAction,
                    ],
                ],
            ]
        ]);
    }

    public function configure(BuilderInterface $builder, ElementFactoryInterface $elementFactory): void
    {
        $builder->add($elementFactory->newInput('message', 'Message', 'The message'));
    }

    private function getMySchema(): array
    {
        return [
            'definitions' => [
                'Message' => [
                    'type' => 'object',
                    'properties' => [
                        'hello' => [
                            'type' => 'string'
                        ]
                    ]
                ],
            ],
            '$ref' => 'Message',
        ];
    }
}

```

To use this generator place this class at the file `src/MyGenerator.php`. Then you need to register the
class at the `provider.php` file so that it is available at the dropdown s.

![generator_provider.png](/img/concepts/generator_provider.png)

After this you can select the provider at the backend s.

![generator_custom](/img/concepts/generator_custom.png)

If you execute this provider you will get a simple route which outputs the following JSON payload.

```json
{
    "hello": "World"
}
```


