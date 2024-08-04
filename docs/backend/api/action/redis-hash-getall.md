
# Redis Hash GetAll

Returns all fields for the configured key. You should bind this action to a route i.e. `GET /values`.

## Configuration

![redis_hash_get_all](/img/backend/api/action/redis_hash_get_all.png)

### Connection

The Redis connection

### Key

The Key

## Response

```json
{
  "values": {
    "key": "foobar"
  }
}
```
