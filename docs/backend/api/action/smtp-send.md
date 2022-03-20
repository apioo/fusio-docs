
# SMTP Send

Sends a mail to the provided address. Note you should only use this action internally to prevent misuse.

## Request

```json
{
  "subject": "My email",
  "to": "foo@bar.com",
  "body": "My html content"
}
```

## Response

```json
{
  "success": true,
  "message": "Mail successful send"
}
```
