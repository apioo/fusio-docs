
# Redis Hash Delete

Deletes a field from a specific key. You should bind this action to a route i.e. `DELETE /values/:field` where the
`field` uri fragment is available. The action deletes the field on the provided key.

## Configuration

![redis_hash_delete](/img/backend/api/action/redis_hash_delete.png)

### Connection

The Redis connection

### Key

The Key

## Response

```json
{
  "success": true,
  "message": "Field successfully deleted",
  "return": 1
}
```
