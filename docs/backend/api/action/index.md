
# Action

An action contains the business logic to handle a request and produce a response. Fusio contains already many actions
for common tasks i.e. to execute database operations or push data to a message queue.

![action_create](/img/backend/api/action_create.png)

## Async

It is possible to execute an action in async mode which means that the action directly returns a 202 accepted response
and the request gets executed later on in the background. To enable the async feature you need to setup a cronjob,
please take a look at the [cronjob](./cronjob) section for installation instructions.

## Development

To develop a custom action you need to create a class which implements the interface `Fusio\Engine\ActionInterface`.
Then you can add this class to the `provider.php` file. Through this it is possible to select this action at the
backend. Beside selecting an action you can also click on the edit button to manually enter a class name.

In the following an example action:

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

If you add a constructor to your action Fusio will try to resolve the dependencies based on the DI container.
