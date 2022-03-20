
# Redis Hash Delete

Deletes a field from a specific key. You should bind this action to a route i.e. `DELETE /values/:field` where the
`field` uri fragment is available. The action deletes the field on the provided key.

## Response

```json
{
  "success": true,
  "message": "Field successfully deleted",
  "return": 1
}
```
