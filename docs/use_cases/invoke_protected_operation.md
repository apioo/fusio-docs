
# Invoke protected operation

By default every operation is private unless you explicit mark it as public. In order to access a private operation a
user needs to provide an access token.

## Assign scope to user

Before obtaining an access token it is important that scopes are assigned to the user. The scopes which are assigned to
the user depended on the role of the user. If you create a new role you can select the scopes s.

![role_create](/img/use_cases/role_create.png)

At the system setting you can also configure a default role, this role gets then assigned to every new user which
registers at the developer portal, by default this is the `Consumer` role.

## Obtain access token

### Basic

The most basic way to obtain an access token is to use your personal credentials i.e.

__Request__

```
POST /consumer/login
Content-Type: application/json

{
  "username": "[username]",
  "password": "[password]",
}
```

__Response__

```
{
  "token": "",
  "expires_in": "",
  "refresh_token": ""
}
```

### OAuth2

It is also possible to use our [OAuth2](https://datatracker.ietf.org/doc/html/rfc6749) authorization endpoint.

#### Client credentials

__Request__

```
POST /authorization/token
Authorization: Basic czZCaGRSa3F0MzpnWDFmQmF0M2JW
Content-Type: application/x-www-form-urlencoded

grant_type=client_credentials
```

As Basic authorization header you need to provide the `[app key] + ":" + [app secret]` as base64 encoded string. It is
also possible to provide your username and password but in general it is recommended to use the app key and secret since
the app access can always be revoked later on.

__Response__

```
{
  "access_token": "",
  "token_type": "bearer",
  "expires_in": 3600,
  "refresh_token": ""
}
```

#### Refresh token

Most token responses always include a refresh token. You can use this refresh token to extend an access token before it
expires.

__Request__

```
POST /authorization/token
Authorization: Basic czZCaGRSa3F0MzpnWDFmQmF0M2JW
Content-Type: application/x-www-form-urlencoded

grant_type=refresh_token&refresh_token=[refresh_token]
```

Like at the client credentials call the Basic header must contain the base64 encode app key and secret.

__Response__

```
{
  "access_token": "",
  "token_type": "bearer",
  "expires_in": 3600,
  "refresh_token": ""
}
```

## Invoke a protected endpoint

If we have obtained an access token we can now invoke a protected endpoint. Therefor we only need to add the
`Authorization` header to a request containing he access token as `Bearer` token.

```
POST /protected_endpoint HTTP/1.1
Authorization: Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI5N2JkNDUzYjdlMDZlOWFlMDQxNi00YmY2MWFiYjg4MDJjZmRmOWZmN2UyNDg4OTNmNzYyYmU5Njc5MGUzYTk4NDQ3MDEtYjNkYTk1MDYyNCIsImlhdCI6MTQ5MTE2NzIzNiwiZXhwIjoxNDkxMTcwODM2LCJuYW1lIjoidGVzdCJ9.T49Af5wnPIFYbPer3rOn-KV5PcN0FLcBVykUMCIAuwI
Content-Type: application/json

{
  "title": "lorem ipsum"
}
```

## Video

<iframe width="560" height="315" src="https://www.youtube.com/embed/DkZAB9FHack" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
