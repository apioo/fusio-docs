
# Social Login

Fusio supports social logins which are used at the developer portal and can be also used at your SPA. Fusio
supports out-of-the-box the following identity provider:

* Facebook
* Google
* Github
* OpenID-Connect

But it is also easy possible to add other providers. The provider must support OAuth2 in order to work with Fusio.

## Flow

The app starts the authentication process by redirecting the user to the [/consumer/identity/:identity/redirect](https://www.fusio-project.org/api/consumer#tag/identity/operation/consumer.identity.redirect)
endpoint. If the user returns, your app needs to send a POST request to the [/consumer/identity/:identity/exchange](https://www.fusio-project.org/api/consumer#tag/identity/operation/consumer.identity.exchange) endpoint providing the following payload:

```json
{
  "code": "",
  "clientId": "",
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
To give you an example how such a provider might look please take a look at our GitHub provider:

```php
<?php

namespace Fusio\Impl\Provider\Identity;

use Fusio\Engine\Form\BuilderInterface;
use Fusio\Engine\Form\ElementFactoryInterface;
use Fusio\Engine\Identity\ProviderAbstract;

class Github extends ProviderAbstract
{
    public function configure(BuilderInterface $builder, ElementFactoryInterface $elementFactory): void
    {
        $builder->add($elementFactory->newInput('client_id', 'Client-ID', 'text', 'Client-ID'));
        $builder->add($elementFactory->newInput('client_secret', 'Client-Secret', 'text', 'Client-Secret'));
    }

    public function getAuthorizationUri(): ?string
    {
        return 'https://github.com/login/oauth/authorize';
    }

    public function getTokenUri(): ?string
    {
        return 'https://github.com/login/oauth/access_token';
    }

    public function getUserInfoUri(): ?string
    {
        return 'https://api.github.com/user';
    }

    public function getNameProperty(): string
    {
        return 'login';
    }
}
```
