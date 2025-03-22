
# MongoDB Find All

Returns all documents of the configured collection. You should bind this action to a route i.e. `GET /document`. The
endpoint supports the following query parameters:

## Configuration

### Connection

The MongoDB connection

### Collection

The collection

## Execution

| Parameter   | Description                                   |
|-------------|-----------------------------------------------|
| startIndex  | The start index of the collection             |
| count       | The document per count page                   |
| sortBy      | The sort by property                          |
| sortOrder   | The sort order msut be either `ASC` or `DESC` |
| filterBy    | The filter by property                        |
| filterValue | The filter value                              |

## Response

This an example response from our test case the actual value of each entry depends on your case.

```json
{
  "totalResults": 2,
  "itemsPerPage": 16,
  "startIndex": 0,
  "entry": [
    {
      "_id": "5344b4ddd2781d08c09790f4",
      "title": "bar",
      "content": "foo",
      "user": {
        "name": "bar",
        "uri": "http:\/\/google.com"
      }
    }
  ]
}
```

