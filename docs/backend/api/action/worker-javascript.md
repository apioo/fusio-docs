
# Worker Javascript

The Worker-Java executes the provided Javascript code at the remote worker.
More information about the worker at: https://github.com/apioo/fusio-worker-javascript

## Example

```javascript
module.exports = async function(request, context, connector, response, dispatcher, logger) {
    const connection = await connector.getConnection('App');
    const filter = request.arguments['filter'];

    const values = [];
    let query = 'SELECT id, title, content, insert_date FROM my_blog';
    if (filter) {
        query += ' WHERE title LIKE ?'
        values.push('%' + filter + '%');
    }

    const entries = [];
    const [result] = await connection.execute(query, values);
    result.forEach((row) => {
        entries.push({
            id: row.id,
            name: row.title,
            description: row.content,
            insertDate: row.insert_date,
        });
    });

    return response.build(200, {}, {
        entries: entries
    });
};

```

## Types

This table contains an overview which connection types are implemented
and which implementation is used:

| Type | Implementation |
| ---- | -------------- |
| `Fusio.Adapter.Sql.Connection.Sql` | `mysql2 / pg`
| `Fusio.Adapter.Sql.Connection.SqlAdvanced` | `mysql2 / pg`
| `Fusio.Adapter.Http.Connection.Http` | `axios`
| `Fusio.Adapter.Mongodb.Connection.MongoDB` | `mongoose`
| `Fusio.Adapter.Elasticsearch.Connection.Elasticsearch` | `@elastic/elasticsearch`
