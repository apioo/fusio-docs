
# Redis Hash Set

Puts a value to the provided field. You should bind this action to a route i.e. `PUT /values/:field` where the `field`
uri fragment is available.

## Configuration

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
