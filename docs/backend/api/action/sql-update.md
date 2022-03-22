
# SQL Update

Updates a specific entry on the configured table. You should bind this action to a route i.e. `PUT /product/:id`.

## Request

```json
{
  "title": "lorem",
  "price": 59.99,
  "content": "ipsum"
}
```

## Response

```json
{
  "success": true,
  "message": "Entry successfully updated"
}
```

