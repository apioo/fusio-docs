
# PHP Processor

The PHP processor executes a PHP file. There is also a complete API [documentation](../../../concepts/php_api/)
describing all available objects.

## Configuration

![php_processor](/img/backend/api/action/php_processor.png)

### File

Path to a PHP file.

## Example

In the following a simple example implementation:

```php
<?php
/**
 * @var \Fusio\Engine\ConnectorInterface $connector
 * @var \Fusio\Engine\ContextInterface $context
 * @var \Fusio\Engine\RequestInterface $request
 * @var \Fusio\Engine\Response\FactoryInterface $response
 * @var \Fusio\Engine\ProcessorInterface $processor
 * @var \Fusio\Engine\ProcessorInterface $dispatcher
 * @var \Psr\Log\LoggerInterface $logger
 * @var \Psr\SimpleCache\CacheInterface $cache
 */

/** @var \Doctrine\DBAL\Connection $connection */
$connection = $connector->getConnection('App');

$count  = $connection->fetchColumn('SELECT COUNT(*) FROM my_table');
$result = $connection->fetchAll('SELECT * FROM my_table ORDER BY sort DESC');

return $response->build(200, [], [
    'totalCount' => $count,
    'entries'    => $result,
]);
```
