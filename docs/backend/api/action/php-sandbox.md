
# PHP Sandbox

The sandbox action provides a simple way to write PHP code which gets directly executed on the server. This can
be useful if you want to build fast a first prototype endpoint. Note by default the sandbox action is deactivated, to
activate the action you need to set the env `FUSIO_PHP_SANDBOX` to `on`. The following shows a simple action which
returns all data from the request.

```php
<?php

$method = $request->getMethod();
$headers = $request->getHeaders();
$uriFragments = $request->getUriFragments();
$body = $request->getBody();

// returns a configured connection, in case of a SQL connection this returns a doctrine DBAL instance which you could
// now use to query the database
//$connection = $connector->getConnection('mysql');

return $response->build(200, [], [
    'method' => $method,
    'headers' => $headers,
    'uriFragments' => $uriFragments,
    'body' => get_class($body),
]);

```

Please take a look at our [PHP API](https://www.fusio-project.org/documentation/php) to get a complete overview about
all available functions. 

Note at the sandbox action we use for security reasons also a sandbox which allows you to use only specific whitelisted
functions and classes. Please take a look at the [Sandbox](https://github.com/apioo/psx-sandbox) component for more
information. In general if your logic is more complex it is recommended to [develop a custom action](./../../../use_cases/develop_custom_action).

