---
sidebar_position: 3
---

# PHP API

This page is a complete reference of the PHP API which is available inside a PHP [worker](./worker) action, i.e. the
[Worker-PHP-Local](/docs/backend/api/action/worker-php-local) or [Worker-PHP](/docs/backend/api/action/worker-php)
action. If you build a custom action as PHP class, please take a look at the
[PHP API for custom actions](/docs/development/php_api) instead.

## Structure

The code of a PHP worker action is a PHP file which returns a function. Fusio calls this function on every invocation
of the action and passes six arguments:

```php
<?php

use Fusio\Worker;
use Fusio\Engine;
use Psr\Log\LoggerInterface;

return function(
    Worker\ExecuteRequest $request,
    Worker\ExecuteContext $context,
    Engine\ConnectorInterface $connector,
    Engine\Response\FactoryInterface $response,
    Engine\DispatcherInterface $dispatcher,
    LoggerInterface $logger
) {
    return $response->ok([
        'hello' => 'world',
    ]);
};
```

| Argument      | Type                               | Description                                                     |
|---------------|------------------------------------|-----------------------------------------------------------------|
| `$request`    | `Fusio\Worker\ExecuteRequest`      | The incoming request, contains the arguments and the payload   |
| `$context`    | `Fusio\Worker\ExecuteContext`      | Information about the invocation, i.e. the user and app        |
| `$connector`  | `Fusio\Engine\ConnectorInterface`  | Returns the clients of your configured connections             |
| `$response`   | `Fusio\Engine\Response\FactoryInterface` | Builds the response of your action                       |
| `$dispatcher` | `Fusio\Engine\DispatcherInterface` | Dispatches events                                               |
| `$logger`     | `Psr\Log\LoggerInterface`          | Writes log messages                                             |

## $request

The request contains all data which the client has sent.

| Method                                  | Description                                                                                  |
|-----------------------------------------|----------------------------------------------------------------------------------------------|
| `getArguments(): Record`                | All path and query parameters, i.e. the `id` of the path `/posts/:id` or `?search=foo`       |
| `getPayload(): mixed`                   | The parsed request body, which was validated against the incoming schema of the operation   |
| `getContext(): ExecuteRequestContext`   | Details of the HTTP request, i.e. the method and headers                                     |

### Arguments

The arguments are a `PSX\Record\Record` which contains the path and query parameters:

```php
$arguments = $request->getArguments();

$id = $arguments->get('id');                          // returns the value or null
$count = $arguments->getOrDefault('count', 16);       // returns the value or a default
$hasSearch = $arguments->containsKey('search');       // checks whether a parameter exists
$all = $arguments->getAll();                          // returns all parameters as array
```

### Payload

The payload contains the request body. You can access the fields of a JSON body as properties:

```php
$payload = $request->getPayload();

$title = $payload->title ?? null;
$tags = $payload->tags ?? [];
```

For `GET` and `DELETE` requests, or if the operation has no incoming schema, the payload is empty.

### Request context

We recommend to read data only through `getArguments()` and `getPayload()`. Through this your action does not depend
on HTTP and works the same way when it is invoked i.e. through a cronjob, a trigger or [MCP](/docs/protocol/mcp).
If you need details of the HTTP request, i.e. a header, you can use the request context:

| Method                          | Description                                       |
|---------------------------------|---------------------------------------------------|
| `getType(): ?string`            | The type of the context, i.e. an HTTP request     |
| `getMethod(): ?string`          | The HTTP method, i.e. `POST`                      |
| `getPath(): ?string`            | The requested path, i.e. `/posts/12`              |
| `getUriFragments(): ?Record`    | The path parameters                               |
| `getQueryParameters(): ?Record` | The query parameters                              |
| `getHeaders(): ?Record`         | The request headers                               |

```php
$requestContext = $request->getContext();

$method = $requestContext->getMethod();
$userAgent = $requestContext->getHeaders()?->get('user-agent');
```

If the action was not invoked through HTTP, i.e. through a cronjob, these values can be `null`.

## $context

The context contains information about the invocation which is not part of the request.

| Method                                | Description                                                  |
|---------------------------------------|--------------------------------------------------------------|
| `getOperationId(): ?int`              | The id of the operation which was invoked                    |
| `getBaseUrl(): ?string`               | The base URL of your Fusio instance, i.e. to build links     |
| `getTenantId(): ?string`              | The tenant id, in case you run Fusio with multiple tenants   |
| `getAction(): ?string`                | The name of the action                                       |
| `getApp(): ?ExecuteContextApp`        | The app which was used by the client                         |
| `getUser(): ?ExecuteContextUser`      | The user which has invoked the action                        |

### App

| Method                     | Description                                                  |
|----------------------------|--------------------------------------------------------------|
| `getAnonymous(): ?bool`    | Whether the request was made without an app                  |
| `getId(): ?int`            | The id of the app                                            |
| `getName(): ?string`       | The name of the app                                          |

### User

| Method                     | Description                                                  |
|----------------------------|--------------------------------------------------------------|
| `getAnonymous(): ?bool`    | Whether the request was made without an access token         |
| `getId(): ?int`            | The id of the user                                           |
| `getName(): ?string`       | The name of the user                                         |
| `getEmail(): ?string`      | The email of the user                                        |
| `getPoints(): ?int`        | The remaining points of the user, s. [Monetization](/docs/monetization) |
| `getPlanId(): ?string`     | The id of the plan which the user has subscribed             |

The user is anonymous in case the operation is public and the client has sent no access token. The following example
returns only the posts of the authenticated user:

```php
$user = $context->getUser();
if ($user === null || $user->getAnonymous()) {
    return $response->forbidden('Please login to see your posts');
}

$posts = $connector->getConnection('App')->fetchAllAssociative('SELECT * FROM app_post WHERE user_id = :user_id', [
    'user_id' => $user->getId(),
]);

return $response->ok(['entries' => $posts]);
```

## $connector

The connector returns a configured client for a [connection](/docs/backend/api/connection). You only provide the
name of the connection, all credentials are managed at the backend:

```php
/** @var \Doctrine\DBAL\Connection $connection */
$connection = $connector->getConnection('App');
```

| Method                                      | Description                                            |
|---------------------------------------------|--------------------------------------------------------|
| `getConnection(string\|int $connectionId)`  | Returns the client of a connection by its name         |

The type of the returned client depends on the connection:

| Connection     | Returned client                 | Documentation                                                                         |
|----------------|---------------------------------|---------------------------------------------------------------------------------------|
| SQL            | `Doctrine\DBAL\Connection`      | [Doctrine DBAL](https://www.doctrine-project.org/projects/dbal.html)                  |
| SQL-Advanced   | `Doctrine\DBAL\Connection`      | [Doctrine DBAL](https://www.doctrine-project.org/projects/dbal.html)                  |
| HTTP           | `GuzzleHttp\Client`             | [Guzzle](https://docs.guzzlephp.org/)                                                 |
| MongoDB        | `MongoDB\Database`              | [MongoDB PHP library](https://www.mongodb.com/docs/php-library/current/)              |
| Elasticsearch  | `Elasticsearch\Client`          | [Elasticsearch PHP client](https://github.com/elastic/elasticsearch-php)              |
| Airtable       | `SdkFabric\Airtable\Client`     | [SDK Fabric](https://sdkfabric.com/)                                                  |
| Discord        | `SdkFabric\Discord\Client`      | [SDK Fabric](https://sdkfabric.com/)                                                  |
| Notion         | `SdkFabric\Notion\Client`       | [SDK Fabric](https://sdkfabric.com/)                                                  |
| Twitter        | `SdkFabric\Twitter\Client`      | [SDK Fabric](https://sdkfabric.com/)                                                  |

:::note
The table lists the connections which are supported by the remote Worker-PHP. The Worker-PHP-Local action runs
directly on your Fusio instance and can use every connection which is available at Fusio, s.
[PHP API for custom actions](/docs/development/php_api#connector).
:::

## $response

The response factory builds the response of your action. Always return the result of one of these methods:

| Method                                                    | Status code                  | Body                                                |
|-----------------------------------------------------------|------------------------------|-----------------------------------------------------|
| `build(int $statusCode, array $headers, mixed $body)`     | Any                          | The provided body                                   |
| `ok(mixed $body, array $headers = [])`                    | `200 OK`                     | The provided body                                   |
| `created(mixed $body, array $headers = [])`               | `201 Created`                | The provided body                                   |
| `accepted(mixed $body, array $headers = [])`              | `202 Accepted`               | The provided body                                   |
| `noContent(array $headers = [])`                          | `204 No Content`             | No body                                             |
| `badRequest(string $message, array $headers = [])`        | `400 Bad Request`            | `{"success": false, "message": "..."}`              |
| `forbidden(string $message, array $headers = [])`         | `403 Forbidden`              | `{"success": false, "message": "..."}`              |
| `notFound(string $message, array $headers = [])`          | `404 Not Found`              | `{"success": false, "message": "..."}`              |
| `conflict(string $message, array $headers = [])`          | `409 Conflict`               | `{"success": false, "message": "..."}`              |
| `gone(string $message, array $headers = [])`             | `410 Gone`                   | `{"success": false, "message": "..."}`              |
| `internalServerError(string $message, array $headers = [])` | `500 Internal Server Error` | `{"success": false, "message": "..."}`              |
| `notImplemented(string $message, array $headers = [])`    | `501 Not Implemented`        | `{"success": false, "message": "..."}`              |
| `proxy(ResponseInterface $response)`                      | Of the proxied response      | Of the proxied response                             |

The body can be any value which can be encoded as JSON, i.e. an array or object. The `proxy` method forwards a
PSR-7 response, i.e. of the Guzzle client, unchanged to the client, s. [HTTP](./http#proxy-a-remote-api).

```php
return $response->created(['id' => $id], ['Location' => '/posts/' . $id]);
```

## $dispatcher

The dispatcher dispatches an [event](/docs/backend/api/event). Fusio then sends the payload to all webhooks which
have subscribed to the event and invokes all [triggers](/docs/backend/api/trigger) of the event. The delivery happens
in the background, so dispatching an event does not slow down your action.

| Method                                        | Description                                                         |
|-----------------------------------------------|---------------------------------------------------------------------|
| `dispatch(string $eventName, mixed $payload)` | Dispatches an event, the payload is encoded as JSON                 |

```php
$dispatcher->dispatch('post_created', ['id' => $id, 'title' => $title]);
```

## $logger

The logger is a [PSR-3](https://www.php-fig.org/psr/psr-3/) logger which writes messages to the Fusio log. This helps
you to debug your action:

| Method                                       | Use case                                               |
|----------------------------------------------|--------------------------------------------------------|
| `debug(string $message, array $context = [])`   | Detailed debug information                          |
| `info(string $message, array $context = [])`    | Interesting events, i.e. a post was created         |
| `notice(string $message, array $context = [])`  | Normal but significant events                       |
| `warning(string $message, array $context = [])` | Unusual events which are not errors                 |
| `error(string $message, array $context = [])`   | Errors which should be monitored                    |
| `critical(string $message, array $context = [])`| Critical conditions, i.e. a service is unavailable  |
| `alert(string $message, array $context = [])`   | Action must be taken immediately                    |
| `emergency(string $message, array $context = [])` | The system is unusable                            |

```php
$logger->error('Could not create post', ['title' => $title]);
```

## Complete example

The following action creates a new post for the authenticated user. It validates the payload, inserts the post into
the database, dispatches an event and returns the id of the new post:

```php
<?php

use Fusio\Worker;
use Fusio\Engine;
use Psr\Log\LoggerInterface;

return function(Worker\ExecuteRequest $request, Worker\ExecuteContext $context, Engine\ConnectorInterface $connector, Engine\Response\FactoryInterface $response, Engine\DispatcherInterface $dispatcher, LoggerInterface $logger) {
    $user = $context->getUser();
    if ($user === null || $user->getAnonymous()) {
        return $response->forbidden('Please login to create a post');
    }

    $payload = $request->getPayload();
    $title = $payload->title ?? null;
    if (empty($title)) {
        return $response->badRequest('Provided no title');
    }

    /** @var \Doctrine\DBAL\Connection $connection */
    $connection = $connector->getConnection('App');

    try {
        $connection->insert('app_post', [
            'user_id' => $user->getId(),
            'title' => $title,
            'content' => $payload->content ?? '',
            'insert_date' => (new \DateTime())->format('Y-m-d H:i:s'),
        ]);

        $id = (int) $connection->lastInsertId();
    } catch (\Doctrine\DBAL\Exception $e) {
        $logger->error('Could not create post: ' . $e->getMessage());
        return $response->internalServerError('Could not create post');
    }

    $dispatcher->dispatch('post_created', ['id' => $id, 'title' => $title]);

    return $response->created(['id' => $id]);
};
```

More examples for common tasks can be found at the [SQL](./sql) and [HTTP](./http) pages.
