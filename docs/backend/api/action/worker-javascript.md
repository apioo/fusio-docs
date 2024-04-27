
# Worker-Javascript

The Worker-Java executes the provided Javascript code at the remote worker.
More information about the worker at: https://github.com/apioo/fusio-worker-javascript

## Example

```javascript
module.exports = async function(request, context, connector, response, dispatcher, logger) {
    const connection = await connector.getConnection('app');
    const [entries, fields] = await connection.query('SELECT name, description FROM app_product_0');

    response.build(200, {}, {
        foo: 'bar',
        entries: entries
    });
};

```

## Video

<iframe width="560" height="315" src="https://www.youtube.com/embed/Jh4wt6Lm2Dk" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
