
# JSON-RPC

Fusio provides a [JSON-RPC](https://www.jsonrpc.org/) server located at `/jsonrpc`
which allows you to invoke every operation through JSON-RPC. JSON-RPC is a popular
and light-weight RPC protocol.

## Configuration

The JSON-RPC endpoint is by default disabled. To enable the endpoint you need to
change the `configuration.php` and adjust the `fusio_jsonrpc` config s.

```php
'fusio_jsonrpc'            => true,
```

## Example

For example to invoke the operation `inspect.get` you could send the following
request.

```json
{
  "jsonrpc": "2.0",
  "method": "inspect.get",
  "params": {
    "foo": "bar",
    "payload": {
      "foo": "bar"
    }
  },
  "id": 1
}
```

This would return a response like s.

```json
{
  "jsonrpc": "2.0",
  "result": {
    "arguments": {
      "foo": "bar"
    },
    "payload": {
      "foo": "bar"
    },
    "context": {
      "method": "inspect.get"
    }
  },
  "id": 1
}
```

### Batch

Batch operations are also supported s.

```json
[
  {
    "jsonrpc": "2.0",
    "method": "inspect.get",
    "params": {
      "foo": "bar",
      "payload": {
        "foo": "bar"
      }
    },
    "id": 1
  }, {
    "jsonrpc": "2.0",
    "method": "test.listFoo",
    "id": 2
  }
]
```

This would return a response like s.

```json
[
  {
    "jsonrpc": "2.0",
    "result": {
      "arguments": {
        "foo": "bar"
      },
      "payload": {
        "foo": "bar"
      },
      "context": {
        "method": "inspect.get"
      }
    },
    "id": 1
  },
  {
    "jsonrpc": "2.0",
    "result": {
      "totalResults": 2,
      "itemsPerPage": 16,
      "startIndex": 0,
      "entry": [
        {
          "id": 2,
          "title": "bar",
          "content": "foo",
          "date": "2015-02-27T19:59:15+00:00"
        },
        {
          "id": 1,
          "title": "foo",
          "content": "bar",
          "date": "2015-02-27T19:59:15+00:00"
        }
      ]
    },
    "id": 2
  }
]
```

## Authorization

To invoke an operation through JSON-RPC you need to provide an Authorization header
containing a Bearer Access-Token which has the fitting scopes assigned to invoke
the operation, like you would also need if you invoke the operation directly.
