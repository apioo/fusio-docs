
# API Gateway

Using Fusio as API Gateway means, that you have existing internal APIs / microservices
or legacy SOAP APIs and you want to expose those APIs through a modern REST API.

## Design

The first step would be to specify the endpoints which you like to expose
and define the request and response schema of those endpoints. You could do
this also directly in Fusio, before you actually integrate those endpoints,
take a look at the [create schema](./create_schema) page.

## Integration

The next step is to create the fitting actions to proxy the requests from Fusio
to your internal APIs. In this use case the following actions are mostly used:

* [Create HTTP Proxy action](../../backend/api/action/http-processor)
* [Create HTTP Raw action](../../backend/api/action/http-raw)
* [Create AMQP action](../../backend/api/action/amqp-publish)
* [Transform request/response action](../../backend/api/action/util-json-patch)

Besides this you can of course always build a [custom action](../api_framework/develop_custom_action.md)
to solve specific technical requirements.

## SDK

The last step is optional, but you could now automatically [generate an SDK](./generate_sdk)
for your API. An SDK makes it easier for clients to consume your API since all generated
SDKs are complete type safe.

## Beyond

These steps are already enough to build a basic API gateway with Fusio. If
your API gateway should be consumed by external developers you can also setup
a [developer portal](../api_product/setup_developer_portal) or start to
[monetize](../api_product/setup_monetization) your API.

