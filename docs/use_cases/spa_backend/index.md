
# SPA Backend

Using Fusio as SPA Backend means, that you have an existing Single-Page-Application
like Angular or React and you need a backend for this frontend app.
Fusio can act as backend for those apps by providing the fitting endpoints
i.e. to CRUD entities or also to execute more complex business logic. The great
advantage of Fusio in this use case is that it has the ability to generate complete
type safe SDKs which makes building those apps more robust since all method and
property calls are validated in the build-step. It also helps to handle topics like
authorization and authentication.

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
into your app. To integrate your API into your app we recommend to [generate](../api_gateway/generate_sdk)
a client SDK for your app. Our SDK generator produces great TypeScript code which
can be easily integrated into your project.

Beside the SDK you can of course als work manually with the REST API, in this case
you need to provide an access token to each call, since you most likely invoke protected
endpoints. Take a look at our [invoke the protected operation](./invoke_protected_operation)
document which describes how to invoke a protected method.

### Angular

Fusio has a dedicated [Angular SDK](https://github.com/apioo/fusio-sdk-javascript-angular) which
you can use in case you work on an Angular app. All our internal apps like the backend and developer
app are also based on Angular, which also use this SDK.

## Authentication

Your SPA most likely needs a way to authenticate your users. Fusio already provides
all tools to handle authentication and registration / social logins of new users.
Take a look at our [authentication](./authentication) document where we describe how you
can integrate this into your app.

