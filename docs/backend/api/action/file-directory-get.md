
# File Directory Get

Returns details of a single file. You should bind this action to an operation i.e. `GET /files/:id` where the `id` uri
fragment is available. The action returns a file by this id.

## Configuration

![file_directory_get](/img/backend/api/action/file_directory_get.png)

### Directory

The base directory.

### Delimiter

Optional the configured delimiter for csv files.

## Execution

On execution this action takes the provided `id` argument and searches a fitting
file inside the configured directory. If a file was found it tries to parse the
file and returns the content.

## Response

```json
{
  "fileName": "test_semicolon.csv",
  "content": [
    [
      "id",
      "name"
    ],
    [
      "1",
      "foo"
    ],
    [
      "2",
      "bar"
    ]
  ]
}
```
