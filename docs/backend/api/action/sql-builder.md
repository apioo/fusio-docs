
# SQL Builder

Through the SQL builder action you can create complex nested queries using a JSON
notation. The following example provides a first overview:

## Example

```json
{
  "totalEntries": {
    "$value": "SELECT COUNT(*) AS cnt FROM psx_sql_provider_news",
    "$definition": {
      "$key": "cnt",
      "$field": "integer"
    }
  },
  "entries": {
    "$collection": "SELECT id, authorId, title, createDate FROM psx_sql_provider_news ORDER BY id ASC LIMIT :startIndex, 8",
    "$params": {
      "startIndex": 0
    },
    "$definition": {
      "id": {
        "$key": "id",
        "$field": "integer"
      },
      "title": "title",
      "tags": {
        "$column": "SELECT title FROM psx_sql_provider_news",
        "$definition": "title"
      },
      "author": {
        "$entity": "SELECT id, name, uri FROM psx_sql_provider_author WHERE id = :id",
        "$params": {
          "id": {
            "$ref": "authorId"
          }
        },
        "$definition": {
          "displayName": "name",
          "uri": "uri"
        }
      }
    }
  }
}
```

It generates the following output:

```json
{
  "totalEntries": 2,
  "entries": [
    {
      "id": 1,
      "title": "foo",
      "tags": [
        "foo",
        "bar"
      ],
      "author": {
        "displayName": "Foo Bar",
        "uri": "http:\/\/phpsx.org"
      }
    },
    {
      "id": 2,
      "title": "bar",
      "tags": [
        "foo",
        "bar"
      ],
      "author": {
        "displayName": "Foo Bar",
        "uri": "http:\/\/phpsx.org"
      }
    }
  ]
}
```
