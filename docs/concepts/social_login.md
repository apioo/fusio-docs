
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

namespace Fusio\Impl\Provider\Identity;

use Fusio\Engine\Form\BuilderInterface;
use Fusio\Engine\Form\ElementFactoryInterface;
use Fusio\Engine\Identity\ProviderAbstract;

class Google extends ProviderAbstract
{
    public function configure(BuilderInterface $builder, ElementFactoryInterface $elementFactory): void
    {
        $builder->add($elementFactory->newInput('client_id', 'Client-ID', 'text', 'Client-ID'));
        $builder->add($elementFactory->newInput('client_secret', 'Client-Secret', 'text', 'Client-Secret'));
    }

    public function getAuthorizationUri(): ?string
    {
        return 'https://accounts.google.com/o/oauth2/v2/auth';
    }

    public function getTokenUri(): ?string
    {
        return 'https://oauth2.googleapis.com/token';
    }

    public function getUserInfoUri(): ?string
    {
        return 'https://openidconnect.googleapis.com/v1/userinfo';
    }
}
```
