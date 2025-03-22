
# SQL Builder

Through the SQL builder action you can create complex nested queries using a JSON notation. The following example
provides a first overview:

## Configuration

### Connection

The database connection where the JQL should be executed.

### JQL

JQL is a JSON format to produce complex nested JSON structures from relation tables.
The following shows an example:

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
    "$collection": "SELECT id, authorId, title, createDate FROM psx_sql_provider_news WHERE status = :status ORDER BY id ASC LIMIT :startIndex, 8",
    "$params": {
      "status": {
        "$context": "status",
        "$default": 1
      },
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

This JQL generates the following output:

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
