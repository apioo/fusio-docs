
# GraphQL

Fusio provides a [GraphQL](https://graphql.org/) server located at `/graphql`
which allows you to invoke every available operation through GraphQL. This can be
useful for frontend apps. The endpoint exposes all GET operations, mutations are
currently not supported.

## Configuration

The GraphQL endpoint is by default disabled. To enable the endpoint you need to
change the `configuration.php` and adjust the `fusio_graphql` config s.

```php
'fusio_graphql'            => true,
```

## Example

For example to invoke the operation `testListFoo` you could send the following
request.

```json
{
  "query": "{ testListFoo(count: 1) { entry { title } } }"
}
```

This would return a response like s.

```json
{
    "data": {
        "testListFoo": {
            "entry": [
                {
                    "title": "bar"
                }
            ]
        }
    }
}
```

You can of course use any GraphQL client to simplify the request handling.

### Multiple queries

It is also possible to invoke multiple operations, for example we could
invoke the same operation with different queries s.

```json
{
  "query": "{ testListFoo(count: 1) { entry { title } } completeList: testListFoo { entry { content } } }"
}
```

This would return a response like s.

```json
{
    "data": {
        "testListFoo": {
            "entry": [
                {
                    "title": "bar"
                }
            ]
        },
        "completeList": {
            "entry": [
                {
                    "content": "foo"
                },
                {
                    "content": "bar"
                }
            ]
        }
    }
}
```

## Authorization

To invoke an operation through GraphQL you need to provide an Authorization header
containing a Bearer Access-Token which has the fitting scopes assigned to invoke
the operation, like you would also need if you invoke the operation directly.

## Action

If you action gets invoked through GraphQL endpoint the request object contains a
`GraphQLRequestContext`, you can use this context to get the fields which are
actually requested and depending on this you could adjust your selection process
i.e. to select only specific fields from the database or make specific HTTP requests.
This is optional and your action can also always return the complete result but
it could improve the performance s.

```php
public function handle(RequestInterface $request, ParametersInterface $configuration, ContextInterface $context): HttpResponseInterface
{
    $data = [];

    $resolveMyField = true;
    $context = $request->getContext();
    if ($context instanceof GraphQLRequestContext) {
        $selection = $context->getFieldSelection();
        $resolveMyField = isset($selection['my_field']) && $selection['my_field'] === true;
    }

    if ($resolveMyField) {
        // resolve my complex field
        $data['my_field'] = 'bar';
    }

    return $this->response->build(200, [], $data);
}
```
