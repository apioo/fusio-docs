
# Integration PHP

Fusio provides a [PHP SDK](https://github.com/apioo/fusio-sdk-php) to easily integrate Fusio
into your existing PHP application.

## Usage

The following example shows how you can get all registered routes at the backend.
A working example is also available at: https://github.com/apioo/fusio-sample-php-cli

```php
<?php

require __DIR__ . '/vendor/autoload.php';

$tokenStore = new \Sdkgen\Client\TokenStore\MemoryTokenStore();
$scopes = ['backend'];

$client = new \Fusio\Sdk\Client('https://demo.fusio-project.org', 'test', 'FRsNh1zKCXlB', $scopes, $tokenStore);

$collection = $client->backend()->getBackendRoutes()->backendActionRouteGetAll();

echo 'Routes:' . "\n";
foreach ($collection->getEntry() as $route) {
    echo '* ' . $route->getPath() . "\n";
}

```
