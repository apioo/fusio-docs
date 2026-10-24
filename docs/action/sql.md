---
sidebar_position: 4
---

# SQL

Most APIs work with a database. This page shows the two ways to build database-driven endpoints with Fusio: prebuilt
SQL actions, which require no code, and worker actions for custom queries.

## Prerequisite: Create a connection

Every SQL action needs a connection to your database. Go to API / Connection and create a new connection, i.e.
with the name `App`, select the `SQL` connection class and enter the credentials of your database. Fusio supports
i.e. MySQL, PostgreSQL, SQLite and more, through [Doctrine DBAL](https://www.doctrine-project.org/projects/dbal.html).

:::tip
Use a separate connection for your own data and don't use the `System` connection, which points to the internal
database of Fusio.
:::

## Prebuilt SQL actions

For common CRUD operations on a table you don't need to write any code. Select the connection and the table and Fusio
handles the rest:

| Action                                                      | Description                                                    | Typical operation          |
|-------------------------------------------------------------|----------------------------------------------------------------|----------------------------|
| [SQL-Select-All](/docs/backend/api/action/sql-select-all)   | Returns a paginated collection of all rows of a table          | `GET /contracts`           |
| [SQL-Select-Row](/docs/backend/api/action/sql-select-row)   | Returns a single row by id                                     | `GET /contracts/:id`       |
| [SQL-Insert](/docs/backend/api/action/sql-insert)           | Inserts the request body as new row                            | `POST /contracts`          |
| [SQL-Update](/docs/backend/api/action/sql-update)           | Updates a row by id                                            | `PUT /contracts/:id`       |
| [SQL-Delete](/docs/backend/api/action/sql-delete)           | Deletes a row by id                                            | `DELETE /contracts/:id`    |
| [SQL-Query-All](/docs/backend/api/action/sql-query-all)     | Executes a custom SQL query and returns all rows               | `GET /reports/sales`       |
| [SQL-Query-Row](/docs/backend/api/action/sql-query-row)     | Executes a custom SQL query and returns a single row           | `GET /reports/sales/:year` |
| [SQL-Builder](/docs/backend/api/action/sql-builder)         | Builds nested JSON responses from multiple queries             | `GET /contracts/:id/full`  |

:::tip
Through the database designer of the connection you can also create tables directly at the backend, s.
[Connection](/docs/backend/api/connection#designer).
:::

## Worker examples

If you need custom logic, i.e. validation or a combination of queries, you can use a [worker action](./worker). Inside
your code, a SQL connection returns a [Doctrine DBAL](https://www.doctrine-project.org/projects/dbal/en/current/reference/data-retrieval-and-manipulation.html)
connection. The following examples use the Worker-PHP-Local action.

:::warning
Never concatenate user input into a SQL query. Always use parameters, like in the examples below, to prevent SQL injection.
:::

### Fetch all rows

Returns all rows of a table, optionally filtered by a `search` query parameter:

```php
<?php

use Fusio\Worker;
use Fusio\Engine;
use Psr\Log\LoggerInterface;

return function(Worker\ExecuteRequest $request, Worker\ExecuteContext $context, Engine\ConnectorInterface $connector, Engine\Response\FactoryInterface $response, Engine\DispatcherInterface $dispatcher, LoggerInterface $logger) {
    /** @var \Doctrine\DBAL\Connection $connection */
    $connection = $connector->getConnection('App');

    $query = 'SELECT id, title, content, insert_date FROM app_post';
    $params = [];

    $search = $request->getArguments()->get('search');
    if (!empty($search)) {
        $query .= ' WHERE title LIKE :search';
        $params['search'] = '%' . $search . '%';
    }

    $entries = [];
    foreach ($connection->fetchAllAssociative($query, $params) as $row) {
        $entries[] = [
            'id' => (int) $row['id'],
            'title' => $row['title'],
            'content' => $row['content'],
            'insertDate' => $row['insert_date'],
        ];
    }

    return $response->ok([
        'entries' => $entries,
    ]);
};
```

### Fetch a single row

Returns a single row by the `id` path parameter, i.e. for the path `/posts/:id`:

```php
<?php

use Fusio\Worker;
use Fusio\Engine;
use Psr\Log\LoggerInterface;

return function(Worker\ExecuteRequest $request, Worker\ExecuteContext $context, Engine\ConnectorInterface $connector, Engine\Response\FactoryInterface $response, Engine\DispatcherInterface $dispatcher, LoggerInterface $logger) {
    /** @var \Doctrine\DBAL\Connection $connection */
    $connection = $connector->getConnection('App');

    $id = $request->getArguments()->get('id');
    if (empty($id)) {
        return $response->badRequest('Provided no id');
    }

    $row = $connection->fetchAssociative('SELECT id, title, content, insert_date FROM app_post WHERE id = :id', [
        'id' => $id,
    ]);

    if (empty($row)) {
        return $response->notFound('Post not found');
    }

    return $response->ok($row);
};
```

### Insert a row

Inserts a new row based on the request body:

```php
<?php

use Fusio\Worker;
use Fusio\Engine;
use Psr\Log\LoggerInterface;

return function(Worker\ExecuteRequest $request, Worker\ExecuteContext $context, Engine\ConnectorInterface $connector, Engine\Response\FactoryInterface $response, Engine\DispatcherInterface $dispatcher, LoggerInterface $logger) {
    /** @var \Doctrine\DBAL\Connection $connection */
    $connection = $connector->getConnection('App');

    $payload = $request->getPayload();

    $title = $payload->title ?? null;
    if (empty($title)) {
        return $response->badRequest('Provided no title');
    }

    $connection->insert('app_post', [
        'title' => $title,
        'content' => $payload->content ?? '',
        'insert_date' => (new \DateTime())->format('Y-m-d H:i:s'),
    ]);

    return $response->created([
        'id' => (int) $connection->lastInsertId(),
    ]);
};
```
