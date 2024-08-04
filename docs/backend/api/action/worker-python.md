
# Worker Python

The Worker-Python executes the provided Python code at the remote worker.
More information about the worker at: https://github.com/apioo/fusio-worker-python

## Example

```python
def handle(request, context, connector, response, dispatcher, logger):
    connection = connector.get_connection('App')
    filter = request.arguments.get('filter')

    values = []
    query = "SELECT id, title, content, insert_date FROM my_blog"
    if filter:
        query += " WHERE title LIKE ?"
        values.append(filter)

    cursor = connection.cursor(prepared=True)
    cursor.execute(query, values)
    result = cursor.fetchall()
    cursor.close()

    entries = []
    for row in result:
        entries.append({
            'id': row[0],
            'title': row[1],
            'content': row[2],
            'insert_date': row[3],
        })

    return response.build(200, None, {
        'entries': entries
    })

```

## Types

This table contains an overview which connection types are implemented
and which implementation is used:

| Type | Implementation |
| ---- | -------------- |
| `Fusio.Adapter.Sql.Connection.Sql` | `PyMySQL / pymongo`
| `Fusio.Adapter.Sql.Connection.SqlAdvanced` | `PyMySQL / pymongo`
| `Fusio.Adapter.Http.Connection.Http` | `httpx.Client`
| `Fusio.Adapter.Mongodb.Connection.MongoDB` | `pymongo`
| `Fusio.Adapter.Elasticsearch.Connection.Elasticsearch` | `elasticsearch`

## Video

<iframe width="560" height="315" src="https://www.youtube.com/embed/L3jHzZmFdWc" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
