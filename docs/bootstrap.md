---
sidebar_position: 1
---

# Getting started

Fusio is an open source API management platform which helps you to build, manage and monetize APIs. With Fusio
you can quickly create a state-of-the-art API, either on top of your existing services and databases or with your
own business logic, and provide it to your customers through a developer portal.

## What can Fusio do for you?

Fusio covers the complete lifecycle of an API, so you don't need to combine many different tools:

* **Build APIs**: Create endpoints which proxy existing services, expose a database table or execute your own
  business logic written in PHP, JavaScript, Python or Java
* **API Gateway**: Put a single entry point in front of your internal services and add authentication, rate limiting
  and logging to them
* **Documentation and SDKs**: Fusio automatically generates an OpenAPI specification and client SDKs for your API
* **Developer Portal**: Provide a [portal](./developer_portal/index.md) where third-party developers can register,
  read your documentation and obtain credentials
* **Security**: Protect your API with OAuth2, scopes and user management out of the box
* **Monetization**: Charge for your API through plans and a points system with a payment provider like Stripe,
  s. [Monetization](./monetization.md)
* **AI**: Use [AI agents](./ai/index.md) to help you build your API and expose your API to AI tools through
  [MCP](./protocol/mcp.md)

## How it works

Fusio is built around three core concepts. Once you know them, you understand how every API in Fusio works:

| Concept       | Description                                                                                                              |
|---------------|--------------------------------------------------------------------------------------------------------------------------|
| **Operation** | The public endpoint of your API, it defines the HTTP method and path i.e. `GET /hello`, and which action is invoked      |
| **Action**    | The business logic which is executed when the operation is called, comparable to a serverless function                   |
| **Schema**    | The contract of your API, it describes the format of the request and response so that Fusio can generate docs and SDKs |

When a client calls your API, Fusio looks up the matching operation, checks authentication and rate limits,
invokes the action and returns the response. You can read more about this at the [Architecture](./architecture.md) page.

## Your first API endpoint

Let's build a first endpoint to see these concepts in practice. In this example we create an endpoint which
proxies the GitHub API and returns a GitHub user profile. It takes only a few minutes and requires no code.

### Prerequisites

You need a running Fusio instance. If you have not installed Fusio yet, take a look at the [Installation](./installation/index.md)
page, the fastest way is to use our [Docker](./installation/docker.md) image. After the installation you can login
to the backend app at `/apps/fusio`.

### Step 1: Create an action

First we create the action which contains the logic of our endpoint. Fusio already contains many prebuilt actions,
i.e. to proxy an HTTP request, to query a database or to send a message to a queue. In our case we use the
[HTTP-Processor](./backend/api/action/http-processor.md) action, which forwards the request to a remote URL.

Go to API / Action, click on create and fill in the following values:

* **Name**: `proxy-action`
* **Class**: `HTTP-Processor`
* **URL**: `https://api.github.com/users/chriskapp`

![create_action](/img/bootstrap/create_action.png)

### Step 2: Create a schema

Next we create a schema which describes the response of our endpoint. This step is optional, but highly
recommended, since the schema is the contract between you and your API consumers. Based on the schema Fusio
can automatically generate an OpenAPI specification and client SDKs. Fusio uses [TypeSchema](https://typeschema.org/)
to describe the JSON format.

Go to API / Schema, click on create, use the name `GitHub-User` and describe the properties of the GitHub user:

![create_schema](/img/bootstrap/create_schema.png)

### Step 3: Create an operation

Finally, we create the operation which makes our action available as an API endpoint. Go to API / Operation, click
on create and fill in the following values:

* **Name**: `github.getProfile`
* **Public**: enabled, so that the endpoint can be called without an access token
* **HTTP-Method**: `GET`
* **HTTP-Path**: `/proxy`
* **Outgoing**: the `GitHub-User` schema
* **Action**: the `proxy-action` action

![create_operation](/img/bootstrap/create_operation.png)

### Step 4: Call your API

That's it, your endpoint is live. Now you can call the `/proxy` endpoint of your Fusio instance, i.e. through your
browser or `curl`:

```
curl http://localhost/proxy
```

Fusio forwards the request to the GitHub API and returns the response:

![api_response](/img/bootstrap/api_response.png)

## Next steps

You have built your first API endpoint with Fusio. From here you can dive deeper into the topics which
are relevant for you:

* [Architecture](./architecture.md) - Learn more about the core concepts of Fusio
* [Operation](./operation/index.md) - Learn how to design operations, i.e. versioning or private operations
* [Action](./action/index.md) - Write your own business logic or use one of the many prebuilt actions
* [Security](./security/authorization.md) - Protect your operations with scopes and access tokens
* [Developer Portal](./developer_portal/index.md) - Invite third-party developers to use your API
* [AI](./ai/index.md) - Let AI agents help you to build your API
