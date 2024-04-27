
# Worker-Python

The Worker-Python executes the provided Python code at the remote worker.
More information about the worker at: https://github.com/apioo/fusio-worker-python

## Example

```python
def handle(request, context, connector, response, dispatcher, logger):
    connection = connector.get_connection('app')

    cursor = connection.cursor()
    cursor.execute("""SELECT name, description FROM app_product_0""")
    result = cursor.fetchall()
    cursor.close()

    entries = []
    for row in result:
        entries.append({
            'name': row[0],
            'description': row[1],
        })

    return response.build(200, None, {
        'foo': 'bar',
        'entries': entries
    })

```

## Video

<iframe width="560" height="315" src="https://www.youtube.com/embed/L3jHzZmFdWc" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
