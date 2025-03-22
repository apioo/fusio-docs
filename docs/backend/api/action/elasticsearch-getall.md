
# Elasticsearch GetAll

Searches all documents at the configured index. You should bind this action to a route i.e. `GET /document`. The
endpoint supports the following query parameters:

## Configuration

### Connection

The ElasticSearch connection

### Index

The index

### Size

The result size

## Execution

The endpoint accepts the following query parameters s.

| Parameter   | Description                               |
|-------------|-------------------------------------------|
| startIndex  | The start index                           |
| query       | The search query i.e. `?query[title]=foo` |

## Response

```json
{
  "totalResults": 2,
  "itemsPerPage": 16,
  "startIndex": 0,
  "entry": [
    {
      "title": "foo bar",
      "description": "lorem ipsum",
      "insert_date": "2022-03-13T22:08:20+00:00"
    },
    {
      "id": 1,
      "title": "hello world",
      "description": "lorem ipsum",
      "insert_date": "2022-03-13T22:07:53+00:00"
    }
  ]
}
```

