
# Worker PHP

The Worker-PHP executes the provided PHP code at the remote worker.
More information about the worker at: https://github.com/apioo/fusio-worker-php

## Example

```php
<?php

use Doctrine\DBAL\Connection;
use Fusio\Worker\ExecuteContext;
use Fusio\Worker\ExecuteRequest;
use Fusio\Engine\ConnectorInterface;
use Fusio\Engine\Response\FactoryInterface;
use Fusio\Engine\DispatcherInterface;
use Psr\Log\LoggerInterface;

return function(ExecuteRequest $request, ExecuteContext $context, ConnectorInterface $connector, FactoryInterface $response, DispatcherInterface $dispatcher, LoggerInterface $logger) {
    $connection = $connector->getConnection('App');
    $filter = $request->getArguments()->get('filter');

    $params = [];
    $query = 'SELECT id, title, content, insert_date FROM my_blog';
    if (!empty($filter)) {
        $query .= ' WHERE title LIKE ?';
        $params[] = $filter;
    }

    $entries = [];
    $result = $connection->fetchAllAssociative($query, $params);
    foreach ($result as $row) {
        $entries[] = [
            'id' => (int) $row['id'],
            'name' => $row['title'],
            'description' => $row['content'],
            'insertDate' => $row['insert_date'],
        ];
    }

    return $response->build(200, [], [
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
