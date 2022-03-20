
# Mongo Find One

Returns a document by id. You should bind this action to a route i.e. `GET /document/:id` where the `id` uri fragment is
available. The action returns a document by this id.

## Response

This an example response from our test case the actual value of the response depends on your case.

```json
{
    "_id": "5344b4ddd2781d08c09790f4",
    "title": "foo",
    "content": "bar",
    "user": {
        "name": "foo",
        "uri": "http:\/\/google.com"
    }
}
```