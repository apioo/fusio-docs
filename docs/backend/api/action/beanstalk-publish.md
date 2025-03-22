
# Beanstalk Publish

Pushes data into a Beanstalkd queue.

## Configuration

### Connection

The Beanstalk connection which should be used to publish the message.

### Tube

The target tube.

## Execution

On execution this action pushes the provided body payload into the configured tube.

## Response

```json
{
  "success": true,
  "message": "Message successful published"
}
```
