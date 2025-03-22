
# Util JSON Patch

Applies JSON Patch operations on the request or response payload. This can be used to transform the request
or response i.e. in combination with the HTTP-Processor action you can change the response of a remote API.

## Configuration

### Action

The action to execute

### Request-Patch

The JSON Patch operation to transform the request payload.

### Response-Patch

The JSON Patch operation to transform the response payload.

## JSON Patch

More information about [JSON Patch](https://jsonpatch.com/)

```json
[
  { "op": "replace", "path": "/baz", "value": "boo" },
  { "op": "add", "path": "/hello", "value": ["world"] },
  { "op": "remove", "path": "/foo" }
]
```