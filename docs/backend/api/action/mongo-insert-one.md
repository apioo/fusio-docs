
# Mongo Insert One

Adds a new document to the configured collection. You should bind this action to a route i.e. `POST /document`.

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
  "message": "Document successfully created",
  "id": "5344b4ddd2781d08c09790f4"
}
```
