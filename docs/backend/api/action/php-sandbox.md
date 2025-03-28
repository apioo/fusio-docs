
# PHP Sandbox

The sandbox action provides a simple way to write PHP code which gets directly executed on the server. This can be
useful if you want to build fast a first prototype endpoint. The following shows a simple action which
returns all data from the request.

## Configuration

### Code

The PHP code which gets executed.

```php
<?php
/**
 * @var \Fusio\Engine\RequestInterface $request
 * @var \Fusio\Engine\ContextInterface $context
 * @var \Fusio\Engine\ConnectorInterface $connector
 * @var \Fusio\Engine\Response\FactoryInterface $response
 * @var \Fusio\Engine\ProcessorInterface $processor
 * @var \Fusio\Engine\DispatcherInterface $dispatcher
 * @var \Psr\Log\LoggerInterface $logger
 * @var \Psr\SimpleCache\CacheInterface $cache
 */

$id = $request->get('id'); // returns a path or query parameter
$payload = $request->getPayload(); // returns the request payload
$arguments = $request->getArguments(); // returns all available arguments as array

// returns a configured connection, in case of a SQL connection this returns a doctrine DBAL instance which you could
// now use to query the database
//$connection = $connector->getConnection('mysql');

return $response->build(200, [], [
    'id' => $id,
    'uriFragments' => $arguments,
    'payload' => $payload,
]);

```

Please take a look at our [PHP API](../../../concepts/php_api/) to get a complete overview about
all available functions. 

Note at the sandbox action we use for security reasons also a sandbox which allows you to use only specific whitelisted
functions and classes. Please take a look at the [Sandbox](https://github.com/apioo/psx-sandbox) component for more
information. In general if your logic is more complex it is recommended to [develop a custom action](../../../use_cases/api_framework/develop_custom_action).
