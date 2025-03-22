
# SQL Insert

Adds a new entry to the configured table. You should bind this action to a route i.e. `POST /product`.

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
  "message": "Entry successfully created",
  "id": 4
}
```
