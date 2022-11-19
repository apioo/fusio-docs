---
sidebar_position: 2
---

# Getting started

To get started you first need a running installation of Fusio. If you have not already installed Fusio please take a
look at the [installation](./installation/index.md) page. Fusio is an open source API management platform which helps to build and
manage REST APIs. Through Fusio you can quickly build a state-of-the-art API, set up a developer portal and monetize
your API.

Fusio supports different ways to setup your API:
* Use Fusio as API Gateway to proxy calls to a remote API
* Use Fusio to automatically create an API from different sources i.e. a database
* Use Fusio to implement custom business logic via an action or worker

This page will explain the first steps on how to proxy a route to an internal API. We create a route at the backend which
executes a specific action, a schema which describes the payload and an action which proxies to a remote API.

## Creating an action

To start we must create an action. An action is a small function (i.e. like a serverless lambda function)
which receives a HTTP request and produces a response. Fusio already contains many prebuilt actions which can solve
many tasks, such as, proxy an HTTP request to a remote API or build an API based on a database table. In this example
we simply create an action which proxies a remote API:

![create_action](/img/bootstrap/create_action.png)

## Creating a schema

Next we create a schema to describe the response of our action. This step is optional, but creating a schema is
highly recommended. The schema is then the contract to your API consumers; how the request and response format is designed.
Internally Fusio uses [TypeSchema](https://typeschema.org/) to describe the JSON format. Through a schema, Fusio can then
automatically create an OpenAPI specification or generate a client SDK.

![create_schema](/img/bootstrap/create_schema.png)

## Creating a route

Lastly, we need to create a route which then invokes our action. A route contains some meta information like a
description, the request and response schemas, and which action should be invoked. In our example we simply
select the action and the schema which we have created.

![create_schema](/img/bootstrap/create_route.png)

## API Response

Now we can call the `/me` endpoint at our API which then proxies the HTTP request to our remote API and returns the
response.

![api_response](/img/bootstrap/api_response.png)

## Conclusion

This was a first basic example on how to create a simple API endpoint with Fusio. Fusio provides then out of the box many
features to build a great API product. We try to provide all features of a modern API solution which you also
find at most popular developer portals. Since Fusio can solve many use cases, we have structured our documentation into
three parts:

* [Use-Cases](./use_cases/index.md)
* [Concepts](./concepts/index.md)
* [Backend](./backend/index.md)

## Architecture overview

In this chapter we provide a first overview about the architecture, the following diagram shows the basic entities of
Fusio:

![architecture](/img/bootstrap/architecture.png)

### 1. Route

The route entity specifies a path at your API i.e. if you create a route `/hello/world` then you can invoke this route
at your API. The route invokes a specific action which executes the business logic of your API. Besides this the route
describes through a schema how the request and response data of your endpoint is designed. Fusio then also uses those
schemas to validate request data and to automatically generate an SDK.

### 2. Action

The action contains the actual business logic of your API i.e. to proxy a request to a remote API or directly selects
data from a database table. You can use either one of our [existing actions](/docs/backend/api/action/) to solve your problem or you can also easily
[build your own](/docs/use_cases/develop_custom_action/) action.

### 3. Schema

The schema simply describes a JSON payload. We use a schema to describe i.e. request/response data of a route
or also event payloads which are dispatched by the system. Every schema is based on [TypeSchema](https://typeschema.org/)
which we also use to generate a client SDK or other specifications like OpenAPI.

### 4. Event

An event gets dispatched by an action in your API, it can be used to create an async workflow where external parties are
notified in case a specific event occurred at your API. I.e. you could create an event "contract_created" and dispatch
this event everytime a contract was created at your API, then external users can register a webhook and Fusio will
invoke this webhook once a contract was created. You can describe the payload of your event also by a schema.

### 5. Cronjob

A cronjob provides a way to invoke an action at a specific interval. Normally an action is invoked by a route but
you can use a cronjob to invoke your action periodically.

### 6. Connection

A connection provides access to a remote service. I.e. we have a SQL connection which works with a SQL database or a
HTTP connection which works with a remote HTTP server. One key concept is that a connection always uses an external
library to connect to the remote service i.e for the SQL connection we use the `doctrine/dbal` library and for the HTTP
connection we use `guzzlehttp/guzzle`. A connection returns always a fully configured client which you can use in your
action. A remote service can be also an external API i.e. we provide connections to Stripe or also AWS which works with
the official SDK.
