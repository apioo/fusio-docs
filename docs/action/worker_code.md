---
sidebar_position: 2
---

# Worker code

This page explains how you write the code of a [worker](./worker) action. The structure is the same for every
language: you write a single function which receives six arguments and returns a response. The examples on this
page give an overview, the [PHP API](./php_api) page contains a complete reference with examples.

## Structure

The following shows a minimal action for every language:

```php title="PHP"
<?php

use Fusio\Worker;
use Fusio\Engine;
use Psr\Log\LoggerInterface;

return function(Worker\ExecuteRequest $request, Worker\ExecuteContext $context, Engine\ConnectorInterface $connector, Engine\Response\FactoryInterface $response, Engine\DispatcherInterface $dispatcher, LoggerInterface $logger) {
    return $response->build(200, [], [
        'hello' => 'world',
    ]);
};
```

```javascript title="JavaScript"
module.exports = async function(request, context, connector, response, dispatcher, logger) {
    return response.build(200, {}, {
        hello: 'world'
    });
};
```

```python title="Python"
def handle(request, context, connector, response, dispatcher, logger):
    return response.build(200, None, {
        'hello': 'world'
    })
```

```java title="Java/Groovy"
def handle(ExecuteRequest request, ExecuteContext context, Connector connector, ResponseBuilder response, Dispatcher dispatcher, Logger logger) {
    return response.build(200, [:], [
        hello: 'world'
    ]);
}
```

## Arguments

Every worker function receives the same six arguments, independent of the language:

| Argument     | Description                                                                                    |
|--------------|------------------------------------------------------------------------------------------------|
| `request`    | The incoming request, contains the path and query parameters (arguments) and the request body (payload) |
| `context`    | Information about the invocation, i.e. the authenticated user and app                         |
| `connector`  | Returns the client of a [connection](/docs/backend/api/connection) which is configured at Fusio |
| `response`   | Builds the response of your action, i.e. with a status code and body                          |
| `dispatcher` | Dispatches [events](/docs/backend/api/event), i.e. to notify webhooks                         |
| `logger`     | Writes log messages, which help you to debug your action                                       |

The method names follow the conventions of each language, i.e. `connector.getConnection('App')` in JavaScript and
`connector.get_connection('App')` in Python.

## API reference

* [PHP API](./php_api) - A complete reference of all arguments and methods for PHP, with examples
* [Worker-JavaScript](/docs/backend/api/action/worker-javascript), [Worker-Python](/docs/backend/api/action/worker-python)
  and [Worker-Java](/docs/backend/api/action/worker-java) - Examples and the supported connection types for each language
