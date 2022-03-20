
# SQL Delete

Deletes a row by id. You should bind this action to a route i.e. `DELETE /product/:id` where the `id` uri fragment
is available. The action deletes the document with the provided id.

## Response

```json
{
  "success": true,
  "message": "Entry successfully deleted"
}
```
