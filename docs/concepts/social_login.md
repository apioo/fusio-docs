
# Social Login

Fusio provides a developer portal where consumers of your API can register and create their apps. Besides the
traditional sign-up via email and password Fusio provides a system to allow 3rd party providers. By default Fusio
supports:

* Facebook
* Google
* Github

But it is also easy possible to add other providers. The provider must support OAuth2 in order to work with Fusio.

## Flow

The javascript app starts the authentication process by redirecting the user to the provider. I.e. the developer app
uses the AngularJS satellizer module to start this process. If the user returns, your app needs to send a POST request
to the endpoint `/consumer/provider/google` providing the following payload:

```json
{
  "code": "",
  "clientId": ""
  "redirectUri": ""
}
```

Then on the server side Fusio will try to obtain an access token using the code and client id. Fusio knows also the
client secret of the provider which you need to provide at the `.env` file. If this was successful Fusio tries to get
some additional information about the user (this step depends always on the remote provider how you get information
about the user).

If everything went fine Fusio creates a new “remote” user entry (if the id does not already exists) and returns directly
an JWT which can be used in any subsequent API calls:

```json
{
  "token": ""
}
```

## Implementation

If you want to add a new provider you need to create a class which implements the `Fusio\Engine\User\ProviderInterface`.
Then you need to register this class in your provider.php file. To give you an example how such a provider might look
please take a look at our Google provider:

```php
<?php

namespace Fusio\Impl\Provider\User;

use Fusio\Engine\User\ProviderInterface;
use Fusio\Engine\User\UserDetails;
use Fusio\Impl\Base;
use Fusio\Impl\Service\Config;
use PSX\Http\Client\ClientInterface;
use PSX\Http\Client\GetRequest;
use PSX\Http\Client\PostRequest;
use PSX\Json\Parser;
use PSX\Uri\Url;

class Google implements ProviderInterface
{
    private ClientInterface $httpClient;
    private string $secret;

    public function __construct(ClientInterface $httpClient, Config $config)
    {
        $this->httpClient = $httpClient;
        $this->secret     = $config->getValue('provider_google_secret');
    }

    public function getId(): int
    {
        return self::PROVIDER_GOOGLE;
    }

    public function requestUser(string $code, string $clientId, string $redirectUri): ?UserDetails
    {
        $accessToken = $this->getAccessToken($code, $clientId, $this->secret, $redirectUri);
        if (empty($accessToken)) {
            return null;
        }

        $url = new Url('https://www.googleapis.com/userinfo/v2/me');

        $headers = [
            'Authorization' => 'Bearer ' . $accessToken,
            'User-Agent'    => Base::getUserAgent()
        ];

        $response = $this->httpClient->request(new GetRequest($url, $headers));
        if ($response->getStatusCode() !== 200) {
            return null;
        }

        $data  = Parser::decode((string) $response->getBody());
        $id    = $data->id ?? null;
        $name  = $data->name ?? null;
        $email = $data->email ?? null;

        if (!empty($id) && !empty($name)) {
            return new UserDetails($id, $name, $email);
        } else {
            return null;
        }
    }

    protected function getAccessToken(string $code, string $clientId, string $clientSecret, string $redirectUri): ?string
    {
        $url = new Url('https://oauth2.googleapis.com/token');

        $params = [
            'code'          => $code,
            'client_id'     => $clientId,
            'client_secret' => $clientSecret,
            'redirect_uri'  => $redirectUri,
            'grant_type'    => 'authorization_code'
        ];

        $headers = [
            'Accept'     => 'application/json',
            'User-Agent' => Base::getUserAgent()
        ];

        $response = $this->httpClient->request(new PostRequest($url, $headers, $params));

        if ($response->getStatusCode() !== 200) {
            return null;
        }

        $data = Parser::decode((string) $response->getBody());
        if (isset($data->access_token)) {
            return $data->access_token;
        } else {
            return null;
        }
    }
}
```

