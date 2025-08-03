---
sidebar_position: 4
---

# Schema

A schema defines the format of the request and response data. It uses the [TypeSchema] specification. The following
example shows a simple object.

## Configuration

![schema_update](/img/backend/api/schema_update.png)

### Name

The name of the schema.

### Schema

A [TypeSchema](https://typeschema.org/) which describes the JSON structure.

## Example

```json
{
  "definitions": {
    "Student": {
      "type": "object",
      "properties": {
        "firstName": {
          "type": "string"
        },
        "lastName": {
          "type": "string"
        },
        "age": {
          "type": "integer"
        }
      }
    }
  },
  "root": "Student"
}
```

[TypeSchema]: https://typeschema.org/
