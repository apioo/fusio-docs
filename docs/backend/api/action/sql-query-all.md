
# SQL Query All

Through the SQL query all action it is possible to write an arbitrary SQL query which gets returned as response. It is
possible to pass path and query parameters into the query by using curly brackets i.e. `title`. These fields are
internally replaced by a prepared statement so you dont need to worry about SQL injections.

## Configuration

### Connection

The database connection.

### SQL

The SQL to execute for example:

```sql
    SELECT * 
      FROM contract
INNER JOIN product
        ON contract.product_id = product.id
     WHERE product.status = {status}
       AND product.title LIKE {%title}
```

### Limit

The max amount of rows which are returned by this query.

## Response

```json
{
  "totalResults": 1,
  "itemsPerPage": 16,
  "startIndex": 0,
  "entry": [
    {
      "id": 1,
      "title": "lorem",
      "price": 59.99,
      "content": "ipsum"
    }
  ]
}
```
