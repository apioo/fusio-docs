
# Worker-PHP

The Worker-PHP executes the provided PHP code at the remote worker.
More information about the worker at: https://github.com/apioo/fusio-worker-php

## Example

```php
<?php

use Fusio\Worker\ExecuteContext;
use Fusio\Worker\ExecuteRequest;
use Fusio\Worker\Runtime\Connector;
use Fusio\Worker\Runtime\Dispatcher;
use Fusio\Worker\Runtime\Logger;
use Fusio\Worker\Runtime\ResponseBuilder;

return function(ExecuteRequest $request, ExecuteContext $context, Connector $connector, ResponseBuilder $response, Dispatcher $dispatcher, Logger $logger) {
    $connection = $connector->getConnection('app');

    $query = 'SELECT name, description FROM app_product_0';
    $entries = $connection->fetchAllAssociative($query);

    return $response->build(200, [], [
        'foo' => 'bar',
        'entries' => $entries,
    ]);
};

```

## Types

This table contains an overview which connection types are implemented
and which implementation is used:

| Type                                                   | Implementation                |
|--------------------------------------------------------|-------------------------------|
| `Fusio.Adapter.Sql.Connection.Sql`                     | `doctrine/dbal`               |
| `Fusio.Adapter.Sql.Connection.SqlAdvanced`             | `doctrine/dbal`               |
| `Fusio.Adapter.Http.Connection.Http`                   | `guzzlehttp/guzzle`           |
| `Fusio.Adapter.Mongodb.Connection.MongoDB`             | `mongodb/mongodb`             |
| `Fusio.Adapter.Elasticsearch.Connection.Elasticsearch` | `elasticsearch/elasticsearch` |

## Video

<iframe width="560" height="315" src="https://www.youtube.com/embed/QAJpbkCLPzs" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
