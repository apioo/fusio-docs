
# AMQP Publish

Accepts the following payload to push a message into a queue:

```json
{
  "exchange": "my_exchange",
  "queue": "my_queue",
  "contentType": "text/plain",
  "body": "foobar"
}
```
