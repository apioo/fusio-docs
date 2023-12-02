
# Adapter

An adapter is a composer package which provides classes to extend the functionality of Fusio. Through an adapter it is
i.e. possible to provide custom action/connection classes. Our website lists every available composer package which has
the `fusio-adapter` keyword defined in the composer.json file.

The adapter needs to require the `fusio/engine` package and must have an adapter class which implements the
`Fusio\Engine\AdapterInterface` interface. This interface has a method `getContainerFile` which returns an absolute path
to a Symfony DI container file. This definition contains all services of the adapter to extend the system. The adapter
can be installed through the register command:

```
php bin/fusio system:register "Acme\System\Adapter"
```

This basically only writes the adapter class to the `provider.php` file, you can also easily manually add the adapter
class to the list.

## Services

### Connection

Interface: `Fusio\Engine\ConnectionInterface`

Describes a custom connection which can be used to work with an external system i.e. a database or external API. Please
take a look at our [SQL connection](https://github.com/apioo/fusio-adapter-sql/blob/master/src/Connection/Sql.php)
to see an example how to build a custom connection. Basically the `getConnection` method must return the configured
connection object, which parameters are available at the backend can be defined at the `configure` method.

### Action

Interface: `Fusio\Engine\ActionInterface`

Describes a custom action which can be used to implement a specific business logic of an operation i.e. the SQL adapter
provides an action to insert a new entry into a table. An action always handles the business logic of a specific HTTP
path and method. Please take a look at our [SQL insert action](https://github.com/apioo/fusio-adapter-sql/blob/master/src/Action/SqlInsert.php)
to see an example how to build a custom action.

### Identity

Interface: `Fusio\Engine\Identity\ProviderInterface`

Describes a remote identity provider which can be used to authorize a user through a remote system so that the
developer dont need to create an account. Usually this is done through OAuth2, which has the following flow:

* The App redirects the user to the authorization endpoint of the remote provider (i.e. Google)
* The user authenticates and returns via redirect to the App
* The App calls the API endpoint and provides the fitting data to Fusio
* If everything is ok Fusio will get additional information and create a new account

Please take a look at the [Github provider](https://github.com/apioo/fusio-impl/blob/master/src/Provider/Identity/Github.php)
to see an example implementation.

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

Please take a look at the [Stripe provider](https://github.com/apioo/fusio-adapter-stripe/blob/main/src/Payment/Stripe.php)
to see an example implementation.

### Generator

Interface: `Fusio\Engine\Generator\ProviderInterface`

Describes a generator which can be used to generate new operation, action or schema entries. I.e. we provide a
generator to import an OpenAPI specification.

Please take a look at the [OpenAPI provider](https://github.com/apioo/fusio-impl/blob/master/src/Provider/Generator/OpenAPI.php)
to see an example implementation.
