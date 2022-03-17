---
sidebar_position: 2
---

# Getting started

To get started you need at first a running installation of Fusio. If you have not already installed Fusio please take a
look at the [installation](installation) page. Fusio is an open source API management platform which helps to build and
manage REST APIs. Through Fusio you can quickly build a state-of-the-art API, set up a developer portal and monetize
your API.

Fusio supports different ways to setup your API:
* Use Fusio as API Gateway to proxy calls to a remote API
* Use Fusio to automatically create an API from different sources i.e. a database
* Use Fusio to implement custom business logic via an action or worker

Once you have created your API with Fusio you can start to onboard external developers through the developer portal.
This page will explain the first steps how to proxy a route to an internal API. We create a route at the backend which
executes a specific action, a schema which describes the payload and an action which proxies to a remote API.

## Creating an action

To start we must create an action. An action is basically a small function (i.e. like a serverless lambda function)
which receives a HTTP request and produces a response. Fusio contains already many prebuild actions which can solve
many tasks like i.e. proxy an HTTP request to a remote API or build an API based on a database table. In this example
we simply create an action which proxies a remote API:

![create_action](/img/bootstrap/create_action.png)

## Creating a schema

As next step we create a schema to describe the response of our action. This step is optional, but creating a schema is
highly recommended, a schema is then the contract to your API consumers how the request and response format is designed.
Internally Fusio uses [TypeSchema](https://typeschema.org/) to describe the JSON format. Through a schema Fusio can then
automatically create an OpenAPI specification or generate a client SDK.

![create_schema](/img/bootstrap/create_schema.png)

## Creating a route

At last we need to create a route which then invokes our action. A route contains some meta information like a
description and the request and response schemas and also which action should be invoked. In our example we simply
select the action and the schema which we have created.

![create_schema](/img/bootstrap/create_route.png)

## API Response

Now we can call the `/me` endpoint at our API which then proxies the HTTP request to our remote API and returns the
response.

![api_response](/img/bootstrap/api_response.png)

# Conclusion

This was a first basic example how to create a simple API endpoint with Fusio. Fusio provides then out of the box many
features to build a great API product, in short we try to provide all features of a modern API solution which you also
find at most popular developer portals. Since Fusio can solve many use cases we have structured our documentation into
three parts:

* [Use-Cases](use_cases)
* [Concepts](concepts)
* [Backend](backend)
