
# AMQP Publish

Pushes data into a AMQP compatible message queue like RabbitMQ.

## Configuration

![amqp_publish](/img/backend/api/action/amqp_publish.png)

### Connection

The AMQP connection which should be used to publish the message.

### Exchange

The target exchange.

### Queue

The target queue.

## Execution

On execution this action pushes the provided body payload into the configured
exchange and queue.

## Response

```json
{
  "success": true,
  "message": "Message successful published"
}
```
