
# MongoDB Delete One

Deletes a document by id. You should bind this action to a route i.e. `DELETE /document/:id` where the `id` uri fragment
is available. The action deletes the document with the provided id.

## Configuration

### Connection

The MongoDB connection

### Collection

The collection

## Response

```json
{
  "success": true,
  "message": "Document successfully deleted"
}
```
