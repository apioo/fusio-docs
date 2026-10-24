
# Pulse

Pulse is a self-hosted REST API to send notifications. It wraps the
[Symfony Notifier](https://symfony.com/doc/current/notifier.html) component behind
a simple JSON API, so any application, regardless of its language, can send chat,
email, push and SMS messages through a single HTTP call. Pulse is built on
[Fusio](https://www.fusio-project.org/), which gives you authentication,
scopes, rate limiting, logging, an API documentation and a developer portal out of the box.

## Features

* **One API, four channels**: send messages via `POST /chat`, `POST /email`, `POST /push` and `POST /sms`
* **Many providers**: switch between providers like Twilio, Slack, Discord or SendGrid by changing a DSN, without changing your client code
* **Provider specific options**: pass provider specific options (i.e. Slack blocks, Telegram parse mode, Expo push token) through the `options` field
* **Access control**: every channel is protected by its own scope (`chat`, `email`, `push`, `sms`), so you can decide which app is allowed to use which channel
* **Events**: every sent message triggers an event (`chat.sent`, `email.sent`, `push.sent`, `sms.sent`) in the [CloudEvents](https://cloudevents.io/) format, which you can subscribe to via webhooks
* **Docker ready**: an official image is available at [`fusio/pulse`](https://hub.docker.com/r/fusio/pulse)

## Supported providers

The following Symfony bridges are installed by default:

| Channel | Providers                                                                       |
|---------|---------------------------------------------------------------------------------|
| Chat    | Slack, Discord, Microsoft Teams, Telegram, Google Chat, Fake Chat (for testing) |
| Email   | SendGrid, Mailgun, Amazon SES, Postmark, Resend                                 |
| Push    | Expo, OneSignal, Novu                                                           |
| SMS     | Twilio, Vonage, Sinch, Infobip, Telnyx                                          |

Additional providers can be added by requiring the fitting Symfony bridge, i.e.
`composer require symfony/mattermost-notifier`.

## Configuration

Each channel is configured through a DSN environment variable in the `.env` file. A
channel which has no DSN configured returns a `501 Not Implemented` response.

```dotenv
CHAT_DSN="slack://TOKEN@default?channel=CHANNEL"
EMAIL_DSN="sendgrid://KEY@default"
PUSH_DSN="expo://TOKEN@default"
SMS_DSN="twilio://SID:TOKEN@default?from=FROM"
```

The exact DSN format of each provider is described in the
[Symfony Notifier documentation](https://symfony.com/doc/current/notifier.html#channels).

Besides the DSNs you need to configure the regular Fusio settings like the database
connection (`FUSIO_CONNECTION`), the base url (`FUSIO_URL`) and the project key
(`FUSIO_PROJECT_KEY`).

## Installation

### Docker

```bash
docker run -d -p 8080:80 \
  -e FUSIO_PROJECT_KEY=change-me \
  -e FUSIO_URL=http://localhost:8080 \
  -e FUSIO_CONNECTION="pdo-mysql://user:password@db/pulse" \
  -e SMS_DSN="twilio://SID:TOKEN@default?from=FROM" \
  fusio/pulse
```

### Manual

```bash
git clone https://github.com/apioo/fusio-pulse.git
cd fusio-pulse
composer install

# adjust the .env file, then
php bin/fusio migrate
php bin/fusio adduser --role=1 --username=admin --email=admin@example.com --password=change-me
php bin/fusio login --username=admin --password=change-me
php bin/fusio deploy
```

Point the document root of your web server to the `public/` folder.

## Usage

### Authentication

All endpoints require an access token which contains the scope of the channel. You can
obtain a token through the Fusio authorization endpoint, i.e. via the client credentials
grant using your app key and secret:

```bash
curl -X POST http://localhost:8080/authorization/token \
  -u "APP_KEY:APP_SECRET" \
  -d "grant_type=client_credentials&scope=chat,email,push,sms"
```

Send the token in the `Authorization` header of every request:

```
Authorization: Bearer [TOKEN]
```

### Chat

`POST /chat` (scope `chat`)

```bash
curl -X POST http://localhost:8080/chat \
  -H "Authorization: Bearer TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "subject": "Deployment finished successfully",
    "options": {
      "channel": "#releases"
    }
  }'
```

| Field     | Type   | Description                         |
|-----------|--------|-------------------------------------|
| `subject` | string | **Required** The message text       |
| `options` | map    | Provider specific options           |

### Email

`POST /email` (scope `email`)

```bash
curl -X POST http://localhost:8080/email \
  -H "Authorization: Bearer TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "from": "noreply@example.com",
    "to": ["jane@example.com"],
    "subject": "Welcome",
    "text": "Hello Jane, welcome on board!",
    "html": "<p>Hello Jane, welcome on board!</p>"
  }'
```

| Field      | Type     | Description                               |
|------------|----------|-------------------------------------------|
| `from`     | string   | Sender address                            |
| `to`       | string[] | Recipient addresses                       |
| `replyTo`  | string[] | Reply-To addresses                        |
| `cc`       | string[] | CC addresses                              |
| `bcc`      | string[] | BCC addresses                             |
| `priority` | integer  | Priority from 1 (highest) to 5 (lowest)   |
| `subject`  | string   | Subject of the email                      |
| `text`     | string   | Plain text body                           |
| `html`     | string   | HTML body                                 |

### Push

`POST /push` (scope `push`)

```bash
curl -X POST http://localhost:8080/push \
  -H "Authorization: Bearer TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "subject": "New message",
    "content": "You have received a new message",
    "options": {
      "to": "ExponentPushToken[xxxxxxxx]"
    }
  }'
```

| Field     | Type   | Description                                                   |
|-----------|--------|---------------------------------------------------------------|
| `subject` | string | **Required** Title of the notification                        |
| `content` | string | **Required** Body of the notification                         |
| `options` | map    | Provider specific options, i.e. the device token `to` for Expo |

### SMS

`POST /sms` (scope `sms`)

```bash
curl -X POST http://localhost:8080/sms \
  -H "Authorization: Bearer TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "phone": "+4917612345678",
    "subject": "Your verification code is 123456"
  }'
```

| Field     | Type   | Description                                         |
|-----------|--------|-----------------------------------------------------|
| `phone`   | string | **Required** Phone number of the recipient          |
| `subject` | string | **Required** The message text                       |
| `from`    | string | Sender, overrides the `from` configured in the DSN  |
| `options` | map    | Provider specific options                           |

### Response

All endpoints return the same response format:

```json
{
  "success": true,
  "message": "SMS successfully sent"
}
```

| Status | Description                                               |
|--------|-----------------------------------------------------------|
| `200`  | The message was sent                                      |
| `400`  | The request payload is invalid                            |
| `401`  | The access token is missing or has not the needed scope   |
| `500`  | The provider could not send the message                   |
| `501`  | The channel has no DSN configured                         |

### Events

After a message was sent, Pulse dispatches one of the following events. You can
register a webhook in the Fusio backend to get notified, i.e. to keep an audit log
of all sent messages.

| Event        | Description                |
|--------------|----------------------------|
| `chat.sent`  | A chat message was sent    |
| `email.sent` | An email message was sent  |
| `push.sent`  | A push message was sent    |
| `sms.sent`   | A SMS message was sent     |

## Development

The API is defined in configuration files which are deployed through `php bin/fusio deploy`:

* `resources/operation.yaml` - the available endpoints (see `resources/operations/`)
* `resources/scope.yaml` - the scopes of each channel
* `resources/role.yaml` - the roles and their scopes
* `resources/event.yaml` - the events which are dispatched
* `resources/typeschema.json` - the [TypeSchema](https://typeschema.org/) specification of the request and response models

The business logic lives in `src/`: the `Action` classes handle the HTTP request and
delegate to the `Service` classes which build the Symfony Notifier message and send it
through the configured transport. The classes in `src/Model` are generated from the
TypeSchema specification.

Run the static analysis with:

```bash
vendor/bin/phpstan analyse
```

## License

This project is licensed under the Apache License 2.0, see the LICENSE file for details.
