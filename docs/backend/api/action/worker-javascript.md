
# Worker-Javascript

The Worker-Java executes the provided Javascript code at the remote worker. More information about the worker at:
https://github.com/apioo/fusio-worker-javascript

## Example

```javascript
module.exports = function(request, context, connector, response, dispatcher, logger) {

  const connection = connector.getConnection('my_db');

  connection.query('SELECT * FROM app_todo', (err, result) => {
    response.build(200, {}, {
      foo: 'bar',
      result: result
    });
  });

};
```

## Video

<iframe width="560" height="315" src="https://www.youtube.com/embed/Jh4wt6Lm2Dk" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
