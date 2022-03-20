
# Redis Hash Get

Returns a value for a specific field. You should bind this action to a route i.e. `GET /values/:field` where the `field`
uri fragment is available. The action returns a value by this field.

## Response

```json
{
  "value": "foobar"
}
```
