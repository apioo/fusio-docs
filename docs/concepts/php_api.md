# PHP API

Fusio provides a specific PHP-API in every action which can be used to produce a response. This API describes all
available variables and can be used as a reference to develop new actions.

## Objects

| Name          | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
|---------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `$request`    | Represents an incoming request. This object can be used to access all values from an incoming request                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| `$parameters` | The parameters represent a general set of key values which is used in various places. As argument to the action method it contains the configuration parameters of the action. At the request object it contains the query and uri fragment parameters                                                                                                                                                                                                                                                                                                             |
| `$context`    | The context contains all information about the incoming request which is not HTTP related i.e. it contains the authenticated user and app or also the route id which was used                                                                                                                                                                                                                                                                                                                                                                                      |
| `$connector`  | Through the connector it is possible to access configured connection objects. A connection is i.e. a MYSQL connection which can be configured at the admin panel. Inside an action it is possible to access this connection through this class. Which objects is returned depends on the connection type i.e. the MYSQL connection returns a Doctrine DBAL Connection instance and the HTTP connection returns a Guzzle instance. There are already many adapters available which allow many different kind of services i.e. ElasticSearch, MongoDB, AMQP, etc.    |
| `$response`   | The response factory MUST be used to create a response for an action. It is a factory method which returns a specific response object. Please always use this factory since this gives us the freedom to change the response implementation                                                                                                                                                                                                                                                                                                                        |
| `$processor`  | The processor can be used to invoke another action. Normally an action should only contain simple logic but in some cases you may want to invoke an existing action                                                                                                                                                                                                                                                                                                                                                                                                |
| `$dispatcher` | The dispatcher can be used to trigger specific events. A consumer can subscribe to such events and they will receive a HTTP POST call to the defined endpoint in case you dispatch an event. The call happens in the background through a cronjob so the dispatch operation is not expensive                                                                                                                                                                                                                                                                       |
| `$logger`     | See https://github.com/php-fig/fig-standards/blob/master/accepted/PSR-3-logger-interface.md for the full interface specification |
| `$cache`      | See https://github.com/php-fig/fig-standards/blob/master/accepted/PSR-16-simple-cache.md for the full interface specification |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |

### $request

Represents an incoming request. This object can be used to access all values from an incoming request.

| Name	                                   | Description                                          |
|-----------------------------------------|------------------------------------------------------|
| `get(string $name): mixed`	           | Returns an argument by name                          |
| `getArguments(): array`	               | Returns all available arguments as associative array |
| `getPayload(): mixed`	               | Returns the request payload                          |
| `getContext(): RequestContextInterface` | Returns the request context                          |

Most times your actions gets invoked by an HTTP request, in this case the `get` method reads the
value from the path or query parameter. The `getPayload` method returns the parsed body, this is either
a general `PSX\Record\RecordInterface` object or a custom DTO object. If your schema is set to Passthru then
it contains a `Fusio\Engine\Record\PassthruRecord` object.

We recommend to use in your action only the `get`, `getArguments` and `getPayload` method on the request
object so that you action is independent of an HTTP request since your action can be used also in a different
context, i.e. it can be invoked through RPC or another context. If needed you can get all details of the HTTP
request through the `getContext` method. In case the action was invoked through an HTTP request the context
contains a `Fusio\Engine\Request\HttpRequestContext` instance. The following example shows how you can access
all details of the HTTP request object.

#### Example

```php
$request->get('id'); // returns a path or query parameter
$request->getPayload(); // returns the request payload
$request->getArguments(); // returns all available arguments as array

$context = $request->getContext();
if ($context instanceof \Fusio\Engine\Request\HttpRequestContext) {
    $context->getParameter('id'); // returns a path parameter
    $context->getRequest()->getUri()->getParameter('count'); // returns a query parameter
    $context->getRequest()->getMethod(); // returns the request method i.e. GET or POST
    $context->getRequest()->getHeader('my-header'); // returns a request header
    $context->getRequest()->getBody(); // returns the raw request body
}

```

### $parameters

The parameters represent a general set of key values which is used in various places. As argument to the action method
it contains the configuration parameters of the action. At the request object it contains the query and uri fragment
parameters.

| Name	                             | Description                                         |
|-----------------------------------|-----------------------------------------------------|
| `get(string $key): ?string`	     | Returns a specific parameter                        |
| `has(string $key)`	             | Checks whether a parameter is available             |
| `set(string $key, mixed $value)`  | Sets a specific parameter                           |
| `isEmpty(): bool`                 | Returns whether no parameter is available           |
| `toArray(): array`                | Returns an array representation of this collection |

### $context

The context contains all information about the incoming request which is not HTTP related i.e. it contains the
authenticated user and app or also the route id which was used.

| Name	                                       | Description                                                                                                                               |
|---------------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------|
| `getRouteId(): int`	                       | Returns the id of the route                                                                                                               |
| `getBaseUrl(): string`	                   | Returns the base url of the system to generate i.e. HATEOAS links. The url has a trailing slash                                           |
| `getApp(): AppInterface`	                   | Returns the app which was used for this request. Can also be an anonymous app if authorization is not required for the endpoint           |
| `getUser(): UserInterface`	               | Returns the user which has authenticated through the app. Can also be an anonymous user if authorization is not required for the endpoint |
| `getAction: ActionInterface`	               | Returns the current action                                                                                                                |
| `withAction(ActionInterface $action): self` | Creates a new context containing the given action                                                                                         |
| `getConnection(): mixed`	                   | Returns the connection which is currently used by the action                                                                              |
| `withConnection(mixed $connection): self`   | Sets the currently used connection                                                                                                        |

### $connector

Through the connector it is possible to access configured connection objects. A connection is i.e. a MYSQL connection
which can be configured at the admin panel. Inside an action it is possible to access this connection through this
class. Which objects is returned depends on the connection type i.e. the MYSQL connection returns a Doctrine DBAL
Connection instance and the HTTP connection returns a Guzzle instance. There are already many adapters available for
different kind of services i.e. ElasticSearch, MongoDB, AMQP, etc.

| Name	                                     | Description                                                                                                                                                     |
|-------------------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `getConnection(string/int $connectionId)` | Returns an arbitrary connection to a remote service. It is recommended to use the connection name but you can also use the actual database id of the connection |

### $response

The response factory MUST be used to create a response for an action. It is a factory method which returns a specific
response object. Please always use this factory since this gives us the freedom to change the response implementation.

| Name	                                                 |  Description                  |
|-------------------------------------------------------|-------------------------------|
| `build(int $statusCode, array $headers, mixed $body)` | Creates a new response object |

### $processor

The processor can be used to invoke another action. Normally an action should only contain simple logic but in some
cases you may want to invoke an existing action.

| Name	                                                                                 | Description                                                                                                                                                                         |
|---------------------------------------------------------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `execute(string/int $actionId, RequestInterface $request, ContextInterface $context)` | Executes a specific action using the request and context and returns a response. It is recommended to use the action name but you can also use the actual database id of the action |

### $dispatcher

The dispatcher can be used to trigger specific events. A consumer can subscribe to such events and they will receive a
HTTP POST call to the defined endpoint in case you dispatch an event. The call happens in the background through a
cronjob so the dispatch operation is not expensive.

| Name	                                         | Description                                                                                                                                                          |
|-----------------------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `dispatch(string $eventName, mixed $payload)` | Dispatches a specific event and sends the payload to all subscribers. The payload gets json encoded so it is recommended to use i.e. an array or stdClass data type |

### $logger

See https://github.com/php-fig/fig-standards/blob/master/accepted/PSR-3-logger-interface.md for the full interface specification.

| Name	                                        | Description                                                                                                                                          |
|----------------------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------|
| `emergency(string $message, array $context)` | System is unusable.                                                                                                                                  |
| `alert(string $message, array $context)`	    | Action must be taken immediately. Example: Entire website down, database unavailable, etc. This should trigger the SMS alerts and wake you up.       |
| `critical(string $message, array $context)`  | Critical conditions. Example: Application component unavailable, unexpected exception.                                                               |
| `error(string $message, array $context)`	    | Runtime errors that do not require immediate action but should typically be logged and monitored.                                                    |
| `warning(string $message, array $context)`	| Exceptional occurrences that are not errors. Example: Use of deprecated APIs, poor use of an API, undesirable things that are not necessarily wrong. |
| `notice(string $message, array $context)`	| Normal but significant events.                                                                                                                       |
| `info(string $message, array $context)`	    | Interesting events. Example: User logs in, SQL logs.                                                                                                 |
| `debug(string $message, array $context)`	    | Detailed debug information.                                                                                                                          |
| `log(string $message, array $context)`       | Logs with an arbitrary level.                                                                                                                        |

### $cache

See https://github.com/php-fig/fig-standards/blob/master/accepted/PSR-16-simple-cache.md for the full interface specification.

| Name	                             | Description                                                                                                                                                                                                                                                                                                                                                                                                                                              |
|-----------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `get(string $key): mixed`	     | Fetches a value from the cache. MUST be thrown if the $key string is not a legal value.                                                                                                                                                                                                                                                                                                                                                                  |
| `set(string $key, mixed $value)`	 | Persists data in the cache, uniquely referenced by a key with an optional expiration TTL time. the driver supports TTL then the library may set a default value for it or let the driver take care of that. MUST be thrown if the $key string is not a legal value.                                                                                                                                                                                      |
| `delete(string $key)`	         | Delete an item from the cache by its unique key. MUST be thrown if the $key string is not a legal value.                                                                                                                                                                                                                                                                                                                                                 |
| `clear()`	                     | Wipes clean the entire cache's keys.                                                                                                                                                                                                                                                                                                                                                                                                                     |
| `getMultiple(array $keys)`        | Obtains multiple cache items by their unique keys. MUST be thrown if $keys is neither an array nor a Traversable, or if any of the $keys are not a legal value.                                                                                                                                                                                                                                                                                          |
| `setMultiple(array $values)`	     | Persists a set of key => value pairs in the cache, with an optional TTL. the driver supports TTL then the library may set a default value for it or let the driver take care of that. MUST be thrown if $values is neither an array nor a Traversable, or if any of the $values are not a legal value.                                                                                                                                                   |
| `deleteMultiple(array $keys)`     | Deletes multiple cache items in a single operation. MUST be thrown if $keys is neither an array nor a Traversable, or if any of the $keys are not a legal value.                                                                                                                                                                                                                                                                                         |
| `has(string $key): bool`	         | Determines whether an item is present in the cache. NOTE: It is recommended that has() is only to be used for cache warming type purposes and not to be used within your live applications operations for get/set, as this method is subject to a race condition where your has() will return true and immediately after, another script can remove it making the state of your app out of date. MUST be thrown if the $key string is not a legal value. |

