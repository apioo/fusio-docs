
# SQL Delete

Deletes a row by id. You should bind this action to a route i.e. `DELETE /product/:id` where the `id` uri fragment
is available. The action deletes the document with the provided id.

## Configuration

![sql_delete](/img/backend/api/action/sql_delete.png)

### Connection

The database connection.

### Table

The table where the row should be deleted.

### Mapping

Optional a mapping which is only relevant for relations.

## Response

```json
{
  "success": true,
  "message": "Entry successfully deleted"
}
```
