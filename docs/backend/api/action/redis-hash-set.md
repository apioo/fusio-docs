
# Redis Hash Set

Puts a value to the provided field. You should bind this action to a route i.e. `PUT /values/:field` where the `field`
uri fragment is available.

## Configuration

![redis_hash_set](/img/backend/api/action/redis_hash_set.png)

### Connection

The Redis connection

### Key

The Key

## Request

```json
{
  "value": "foobar"
}
```

## Response

```json
{
  "success": true,
  "message": "Field successfully set",
  "return": 1
}
```
