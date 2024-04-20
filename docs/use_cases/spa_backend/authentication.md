
# Authentication

This document describes how you can integrate the Fusio login and registration
into your app. While it is targeted at Single-Page-Applications running in a
browser you could also integrate this into any kind of app.

## Login

To implement a basic login you can use the [/consumer/login](https://www.fusio-project.org/api/consumer#tag/account/operation/consumer.account.login)
endpoint where you only need to provide the username and password of the user and
it returns an access token on success. This access token can then be stored and used
for any call of your API.

### OAuth2

Besides this Fusio provides at the `/authorization/token` a complete OAuth2 endpoint.
With the `client_credentials` grant it is also possible to login with the user credentials.
The endpoint also returns an access token which you can use for further requests.

## Social-Login

At Fusio you can also configure OpenID connection identity provider i.e. if you
have a self-hosted identity provider like Keycloak. In this case you need to configure
at the backend this identity provider under System / Identity s.

![identity](/img/use_cases/api_product/identity.png)

Each identity provider is assigned to a specific app. To get all configured identity
provider for a specific app you need to use the [/consumer/identity](https://www.fusio-project.org/api/consumer#tag/identity/operation/consumer.identity.getAll)
endpoint. You can then render a login button for each identity provider. If a user
clicks on this button your need to redirect the user to the provided redirect url.

Note it is important that you add a query parameter `redirect_uri` to the redirect so that
the user gets redirected to your app. If your provide no redirect Fusio will show the user
only the access token which can be used i.e. for desktop apps.

### Callback

If the login was successful at the identity provider the user gets redirected to the configured
`redirect_uri` of your app. Fusio adds the following query parameters to the `redirect_uri`
which you can then use inside your app:

* `access_token`
* `token_type`
* `expires_in`
* `refresh_token`
* `scope`

You can then store the `access_token` and use it for further requests. To get more
details about the user you can make a request to the [/consumer/account](https://www.fusio-project.org/api/consumer#tag/account/operation/consumer.account.get)
endpoint which returns more details about the authenticated user.

## Refresh

Every access token is limited to a specific time frame, you can adjust this time frame
at the Fusio configuration. It is possible to use the refresh token to obtain a new access token.
Through this the user does not need authenticate again.

To refresh a token you can either send a PUT request to the [/consumer/login](http://127.0.0.1/website/fusio-project.org/public/index.php/api/consumer#tag/account/operation/consumer.account.refresh)
endpoint or you can also use OAuth2 `/authorization/token` endpoint which supports the `refresh_token`
grant.

## Registration

To implement a basic user registration you can use the [/consumer/register](http://127.0.0.1/website/fusio-project.org/public/index.php/api/consumer#tag/account/operation/consumer.account.register)
endpoint. There you only need to provide the name, email and password of the user and
the user gets registered. In this stage the account is created but disabled. The user then
needs to verify the email address. Fusio sends an email to the provided address
containing a link to activate the account. This link and the email content can be customized
at the Fusio settings s.

![settings_register_email](/img/use_cases/spa_backend/settings_register_email.png)

### Activation

The activation link must point to an url of your app. If the user arrives at the
activation endpoint you need to get the `token` parameter and call the
[/consumer/activate](https://www.fusio-project.org/api/consumer#tag/account/operation/consumer.account.activate) endpoint
providing the token. If everything is fine the account gets activated and the user
can login.

## Password reset

If a user has lost his password it is possible to start a password recovery process.
For this the user only needs to provide the email address and Fusio will send a password
reset mail. To initiate a password reset you need to send a POST request to the [/consumer/password_reset](https://www.fusio-project.org/api/consumer#tag/account/operation/consumer.account.requestPasswordReset)
endpoint providing the email of the user. The password reset email can be also customized
at the Fusio settings s.

![settings_pw_reset_email](/img/use_cases/spa_backend/settings_pw_reset_email.png)

The mail contains also a link to your app containing a token. If the user arrives at the
confirmation endpoint a user can provide a new password and you need to send this new
password with the token to the [/consumer/password_reset](https://www.fusio-project.org/api/consumer#tag/account/operation/consumer.account.executePasswordReset)
endpoint. If everything is finde Fusio will change the password of the user.

## Captcha

At the registration and password reset endpoint you can also provide a `captcha` value.
This is needed in case you have configured at the Fusio settings a [ReCaptcha](https://www.google.com/recaptcha)
key and secret.

![settings_recaptcha](/img/use_cases/spa_backend/settings_recaptcha.png)

If configured Fusio will require this `captcha` parameter. This can be useful if you want
to protect those open endpoints from abuse. Currently we only support the [Google ReCaptcha](https://www.google.com/recaptcha)
service as captcha provider but this can be also extended if there is a demand for other
solutions.
