---
sidebar_position: 2
---

# Getting started

To get started you need at first a running installation of Fusio. If you have not already installed Fusio please take a
look at the [installation](installation) page. Fusio is an open source API management platform which helps to build and
manage REST APIs. Through Fusio you can quickly build a state of the art API, set up a developer portal and monetize
your API. This page will explain the first steps with Fusio. We create a route at the backend which executes a specific
action, a schema which describes the payload and an action which proxies to a remote API.

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

At least we need to create a route which then invokes our action. A route contains some meta information like a
description and the request and response schemas and also which action should be invoked. In our example we simply
select the action and the schema which we have created.

![create_schema](/img/bootstrap/create_route.png)

## API Response

Now we can call the `/me` endpoint at our API which then proxies the HTTP request to our remote API and returns the
response.

![api_response](/img/bootstrap/api_response.png)

# Conclusion

This was a first basic example how to create a simple API endpoint with Fusio. Fusio provides then out of the box many
features to build a great API product, in short we try to provide all features which also big companies provide.
Since Fusio can solve many use cases we have structured our documentation into three parts:

### Use-Cases

Describes concrete use cases and how you can solve them with Fusio, like i.e. import an OpenAPI specification or set up
the developer portal.

### Concepts

This is a more technical section which describes general concepts of the Fusio system.

### Backend

Contains a complete documentation for the backend app. The pages are structured in the same way as the backend app, so
you can take a look at every page to understand how a specific panel works. These pages are also embedded into every
backend app if you click on the help button.
