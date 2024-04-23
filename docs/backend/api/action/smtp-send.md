
# SMTP Send

Sends a mail to the provided address. Note you should only use this action internally to prevent misuse.

## Configuration

![smtp_send](/img/backend/api/action/smtp_send.png)

### Connection

The SMTP connection to send this mail.

### To

The receiver of this mail. If this field is empty we try to use the email from the authenticated user.

### CC

Optional a CC receiver.

### BCC

Optional a BCC receiver.

### From

Optional the from email.

### Subject

The subject of this mail.

### Body

The body of this mail in HTML format. You can access dynamic values from the provided payload or
arguments i.e. if you send the following payload to this action

```json
{
  "hello": "world"
}
```

You can then use those values inside the HTML body like:

```html
<p>Hello {{ payload.hello }}</p>
```

## Response

```json
{
  "success": true,
  "message": "Mail successful send"
}
```
