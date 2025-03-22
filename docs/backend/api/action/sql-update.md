
# SQL Update

Updates a specific entry on the configured table. You should bind this action to a route i.e. `PUT /product/:id`.

## Configuration

### Connection

The database connection.

### Table

The table where the row should be inserted.

### Mapping

Optional a mapping if your column names are different to the JSON property.

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

