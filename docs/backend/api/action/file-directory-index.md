
# File Directory Index

Returns all files of a configured directory. You should bind this action to a route i.e. `GET /files`. The
endpoint supports the following query parameters:

| Parameter   | Description                                                              |
|-------------|--------------------------------------------------------------------------|
| startIndex  | The start index                                                          |
| sortOrder   | Sort the files by name either ASC or DESC                                |
| filterOp    | The filter roperator must be one of `contains`, `equals` or `startsWith` |
| filterValue | The filter value                                                         |

## Response

```json
{
  "totalResults": 1,
  "itemsPerPage": 16,
  "startIndex": 0,
  "entry": [
    {
      "id": "e13fe597-537e-36c2-b99a-d652c3021a36",
      "fileName": "test_semicolon.csv",
      "size": 19,
      "contentType": "text\/plain",
      "sha1": "759c145ff96ed97db41dfa923a0a9fa71f058dbe",
      "lastModified": "0000-00-00T00:00:00+00:00"
    }
  ]
}
```
