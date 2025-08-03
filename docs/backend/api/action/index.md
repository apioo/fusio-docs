
# Action

An action contains the business logic to handle a request and produce a response. Fusio contains already many actions
for common tasks i.e. to execute database operations or push data to a message queue.

## Configuration

![action_create](/img/backend/api/action_create.png)

### Name

The name of the action.

### Class

The action class. Besides selecting an action you can also enter a custom action class by using the edit button.

### Async

It is possible to execute an action in async mode which means that the action directly returns a 202 accepted response
and the request gets executed later on in the background.

### Config

All other input fields are action specific.

## Designer

Through the action designer it is possible to adjust and execute an action,
this helps to quickly develop and test an action. You can find the action designer
through the terminal icon right after the edit button at the action list.

![designer](/img/backend/api/action/designer.png)

## Development

To develop a custom action you need to create a class which implements the class `Fusio\Engine\ActionAbstract`.
Through this it is possible to select this action at the backend. Beside selecting an action you can also click on the
edit button to manually enter a class name.

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
More information about developing an custom action at our [develop custom action](../../../use_cases/api_framework/develop_custom_action)
page.
