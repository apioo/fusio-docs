
# File Directory Detail

Returns details of a single file. You should bind this action to a route i.e. `GET /files/:id` where the `id` uri
fragment is available. The action returns a file by this id.

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
