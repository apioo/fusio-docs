
# Adapter

An adapter is a composer package which provides classes to extend the functionality of Fusio. Through an adapter it is
i.e. possible to provide custom action/connection classes or to install predefined routes for an existing system. Our
website lists every available composer package which has the `fusio-adapter` keyword defined in the composer.json file.

The adapter needs to require the `fusio/engine` package and must have an adapter class which implements the
`Fusio\Engine\AdapterInterface` interface. This interface has a method getDefinition which returns an absolute path to a
`adapter.json` definition file. This definition contains all information for Fusio how to extend the system. The adapter
can be installed through the register command:

```
php bin/fusio system:register "Acme\System\Adapter"
```

## Provider

### Action

Interface: `Fusio\Engine\ActionInterface`

```json
{
  "actionClass": ["Acme\System\Payment\Provider"]
}
```

### Connection

Interface: `Fusio\Engine\ConnectionInterface`

```json
{
  "connectionClass": ["Acme\System\Payment\Provider"]
}
```

### Payment

Interface: `Fusio\Engine\Payment\ProviderInterface`

Describes a payment provider which can be used to execute payments. Through the developer app the user has the
possibility to buy points which can be used to call specific routes which cost points. To buy those points Fusio uses
these payment providers to execute a payment. Usually the flow is:

* App calls the API endpoint to prepare a specific product, it provides an plan and a return url. The call returns an 
  approval url
* App redirects the user to the approval url. The user has to approve the payment at the payment provider
* User returns to the App, the url contains the id of the transaction so the app can call the API endpoint to get
  details about the transaction
* If everything is ok Fusio will credit the points to the user so that he can start calling specific endpoints

Please take a look at the Paypal provider for an example implementation.

```json
{
  "paymentClass": ["Acme\System\Payment\Provider"]
}
```

### User

Interface: `Fusio\Engine\User\ProviderInterface`

Describes a remote identity provider which can be used to authorize an user through a remote system so that the
developer dont need to create an account. Usually this is done through OAuth2, which has the following flow:

* The App redirects the user to the authorization endpoint of the remote provider (i.e. Google)
* The user authenticates and returns via redirect to the App
* The App calls the API endpoint and provides the fitting data to Fusio
* If everything is ok Fusio will get additional information and create a new account

Please take a look at the Github provider for an example implementation.

```json
{
  "userClass": ["Acme\System\User\Provider"]
}
```

### Routes

Interface: `Fusio\Engine\Routes\ProviderInterface`

Preconfigured route provider which helps to create automatically schemas, actions and routes for the user. This can be
used to create complete applications.

Please take a look at the SQL-Table provider for an example implementation.

```json
{
  "routesClass": ["Acme\System\Routes\Provider"]
}
```