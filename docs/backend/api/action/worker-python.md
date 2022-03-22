
# Worker-Python

The Worker-Python executes the provided Python code at the remote worker. More information about the worker at:
https://github.com/apioo/fusio-worker-python

## Example

```python
def handle(request, context, connector, response, dispatcher, logger):

    connection = connector.getConnection('my_db')

    cursor = connection.cursor()
    cursor.execute("""SELECT * FROM app_todo""")
    result = cursor.fetchall()
    cursor.close()

    data = []
    for row in result:
        data.append({
            'id': row[0],
            'status': row[1],
            'title': row[2],
            'insert_date': str(row[3])
        })

    return response.build(200, None, {
        'foo': 'bar',
        'result': data
    })
```

## Video

<iframe width="560" height="315" src="https://www.youtube.com/embed/L3jHzZmFdWc" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
