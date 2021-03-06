
# SQL Query All

Through the SQL query all action it is possible to write an arbitrary SQL query which gets returned as response. It is
possible to pass path and query parameters into the query by using curly brackets i.e. `title`. These fields are
internally replaced by a prepared statement so you dont need to worry about SQL injections.

## Example

```sql
    SELECT * 
      FROM contract
INNER JOIN product
        ON contract.product_id = product.id
     WHERE product.status = {status}
       AND product.title LIKE {%title}
```

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

## Video

<iframe width="560" height="315" src="https://www.youtube.com/embed/4ZJPnMW_USk" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
