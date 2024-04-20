
# SPA Backend

Using Fusio as SPA Backend means, that you have an existing Single-Page-Application
like Angular or REACT and you need a backend for this frontend app.
Fusio can act as backend for those apps by providing the fitting endpoints
i.e. to CRUD entities or also to execute more complex business logic. The great
advantage of Fusio in this use case is that it has the ability to generate complete
type safe SDKs which makes building those apps more robust since you directly
know at the build-step in case a property of a response has changed.
It also helps to handle topics like authorization and authentication.

## Development

To build basic CRUD endpoints for your frontend app we recommend to use the [entity generator](./entity_generator)
which provides a simple way to automatically create CRUD endpoints. The
generator automatically generates the fitting database table, and automatically
creates the fitting schemas, actions and operations so that you can directly
start to use those endpoints. You can later on always customize each operation.
Besides using the generator it is of course also possible to manually create the fitting
actions or you can also build a complete [custom action](../api_framework/develop_custom_action)
in case your use case can not be solved by the existing actions.

## Integration

If you have developed the fitting endpoints you can start to integrate the API
into your app. Most likely your operations are protected, in this case you need
to obtain an access token in order to [invoke the protected operation](./invoke_protected_operation).

To integrate your API into your app we recommend to automatically [generate](../api_gateway/generate_sdk)
a client SDK for your app

## Authorization

