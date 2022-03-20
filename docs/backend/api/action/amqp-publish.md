
# AMQP Publish

Pushes data into a queue.

## Request

```json
{
  "exchange": "my_exchange",
  "queue": "my_queue",
  "contentType": "text/plain",
  "body": "foobar"
}
```

## Response

```json
{
  "success": true,
  "message": "Message successful published"
}
```
