
# Mongo Update One

Updates a document by the provided id. You should bind this action to a route i.e. `PUT /document/:id`.

## Request

```json
{
  "title": "foo",
  "content": "bar",
  "user": {
    "name": "foo",
    "uri": "http:\/\/google.com"
  }
}
```

## Response

```json
{
  "success": true,
  "message": "Document successfully updated"
}
```
