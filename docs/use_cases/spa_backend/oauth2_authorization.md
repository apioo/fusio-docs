
# OAuth2 Authorization

Fusio contains a simple and lightweight OAuth2 authorization server which you can use
at your custom frontend app to handle authentication. At this page we explain shortly
how you can integrate the OAuth2 authorization server into your app. This can boost
your productivity since you can use all integrated tools by Fusio and since this is
based on OAuth2, you can later switch to a different identity provider like Octa or
EntraID.

## Configuration

At first, you need to create a new app at the Backend which represents your custom app.
At the app you need to set the correct app URL since all provided redirect urls must
have the same Base url. After creation, you get a Client-ID/Secret for this app.

## Redirect

Now we can start implementing the actual authorization in your app. If the current
user is not authenticated, you need to redirect the user to the following url:

https://my_fusio_url.com/authorization/authorize?client_id=&redirect_uri=&scope=&state=

With the following query parameters s.

### `client_id`

The client id of the app which you have previously configured at Fusio.

### `redirect_uri`

The redirect uri of your app, this is the place where you later exchange the code for an access token.

### `scope`

Optional the scopes which are needed by your app.

### `state`

Optional a random value which you can check later at the callback url.

## Callback

After successful authorization, we redirect the user back to the provided redirect uri.
At the redirect uri you need to exchange the provided code parameter with an access token.
Therefore you need to send the following request to the token endpoint:

```
POST /authorization/token HTTP/1.1
Host: my_fusio_url.com
Authorization: Basic czZCaGRSa3F0MzpnWDFmQmF0M2JW
Content-Type: application/x-www-form-urlencoded

grant_type=authorization_code&code=[code]
```

In the authorization header, you need to provide the client id/secret base64 encoded.
The `code` parameter is provided as query parameter to the callback url. As a response,
you get an access token which you can then use to access protected parts of the API.

