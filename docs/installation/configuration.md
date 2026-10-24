---
sidebar_position: 5
---

# Configuration

Fusio is configured through the `.env` file in the root folder of your Fusio installation. If you use
[Docker](./docker) you provide the same settings as environment variables with a `FUSIO_` prefix instead of
`APP_`, i.e. `APP_CONNECTION` becomes `FUSIO_CONNECTION`.

## Settings

| Variable                 | Description                                                                                                                         |
|--------------------------|-------------------------------------------------------------------------------------------------------------------------------------|
| `APP_PROJECT_KEY`        | A secret key which is used i.e. to sign tokens. Use a long random string and keep it secret                                        |
| `APP_ENV`                | The environment, either `dev` or `prod`. Use `prod` for production systems                                                         |
| `APP_DEBUG`              | Whether to show detailed error messages, either `true` or `false`. Use `false` for production systems                              |
| `APP_CONNECTION`         | The database connection, i.e. `pdo-mysql://user:password@localhost/fusio` or `pdo-pgsql://user:password@localhost/fusio`           |
| `APP_MAILER`             | The mailer which is used to send mails i.e. at the registration, i.e. `native://default` or `smtp://user:password@smtp.acme.com:25` |
| `APP_MESSENGER`          | The message queue which is used to process asynchronous tasks, by default `doctrine://default` which uses your database            |
| `APP_URL`                | The URL which points to the `public/` folder, i.e. `https://api.acme.com`                                                           |
| `APP_APPS_URL`           | The URL which points to the `public/apps/` folder, i.e. `https://api.acme.com/apps`                                                 |
| `APP_MAIL_SENDER`        | The sender address of all mails which Fusio sends, i.e. `info@acme.com`                                                             |
| `APP_TRUSTED_IP_HEADER`  | In case Fusio runs behind a reverse proxy or load balancer, the header which contains the client IP, i.e. `X-Forwarded-For`        |
| `APP_TENANT_ID`          | Optional tenant id, only needed in case you run multiple Fusio instances on a shared database                                       |
| `SDKGEN_CLIENT_ID`       | Optional client id of your [SDKgen](https://sdkgen.app/) account to generate client SDKs                                            |
| `SDKGEN_CLIENT_SECRET`   | Optional client secret of your [SDKgen](https://sdkgen.app/) account                                                                |

## Example

The following shows a typical `.env` file for a production system:

```env
APP_PROJECT_KEY="cee262a5a1bdd205cbfe0dfc2ad4eddf"
APP_ENV=prod
APP_DEBUG=false
APP_CONNECTION="pdo-mysql://fusio:my_secret@localhost/fusio"
APP_MAILER="smtp://user:password@smtp.acme.com:587"
APP_MESSENGER="doctrine://default"
APP_URL="https://api.acme.com"
APP_APPS_URL="https://api.acme.com/apps"
APP_MAIL_SENDER="info@acme.com"
```

:::warning
Do not use the project key of this example, always generate your own random key.
:::

## System settings

Besides the `.env` file, many settings like the mail templates, the default role of new users or the token expiration
can be adjusted at runtime through the backend app under System / [Config](/docs/backend/system/config).
