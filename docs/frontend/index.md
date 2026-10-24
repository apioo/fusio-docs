
# Frontend

Fusio is not only an API gateway, it is also a complete backend for your frontend. Whether you build
a single page application, a mobile app or a classic website, Fusio provides ready-to-use APIs for
the common tasks every app needs, like user login, registration or payments. This means you can focus
on building a great UI while Fusio takes care of the backend logic.

This page gives you an overview of all Fusio features which are useful for frontend developers.

## How it works

Your frontend communicates with Fusio only through a REST API. Besides the endpoints of your own API,
Fusio provides a so called **Consumer API** under the `/consumer` path. This API contains all endpoints
which a user of your app needs, for example to log in, to manage the account or to subscribe to events.
You can find the complete reference of the Consumer API at the [API documentation](https://www.fusio-project.org/api/consumer).

The general flow of every app looks like this:

1. The user logs in through the Consumer API and your app receives an access token
2. Your app sends this access token as `Authorization: Bearer [token]` header to every request
3. Fusio checks whether the user has the fitting scope to call the requested operation

## Authentication

Every app needs a way to identify its users. Fusio provides a complete user management system
which you can use directly from your frontend.

| Feature        | Description                                                                                                  |
|----------------|--------------------------------------------------------------------------------------------------------------|
| Login          | Log in a user with username and password through `/consumer/login` to obtain an access token                |
| Registration   | Register a new user through `/consumer/register` and activate the account through `/consumer/activate`      |
| Password reset | Let users reset a forgotten password through `/consumer/password_reset`                                     |
| Social login   | Let users log in through an external identity provider i.e. GitHub, Google or your own OpenID Connect server |
| Refresh token  | Extend the session of a user without the need to log in again                                               |
| Account        | Get and update the details of the authenticated user through `/consumer/account`                            |

Take a look at the [Authentication](/docs/security/authentication) page to see how you can integrate
the login and registration into your app. The [Authorization](/docs/security/authorization) page explains
how access tokens and scopes work.

## SDK

Instead of writing HTTP requests by hand, Fusio can automatically generate a TypeScript SDK for your API.
The SDK provides a client with a method for every operation and type definitions for every request and
response. This gives you autocompletion in your editor and the compiler tells you directly if you send
wrong data. Take a look at the [Generate SDK](/docs/development/generate_sdk) page to see how this works.

For the Consumer API there is also a ready-to-use [NPM package](https://www.npmjs.com/package/fusio-sdk):

```
npm install fusio-sdk
```

Of course, you can also use any HTTP client like `fetch` or `axios` to talk to Fusio without an SDK.

## Form

With the [Form](./form) feature you can render forms for your API dynamically. An admin configures
a form at the backend and your frontend receives the JSON Schema and UI-Schema of the target operation.
Through this you can use a library like [JSON Forms](https://jsonforms.io/) to render the form, without
hardcoding the form in your frontend.

## Pages

Through the [Page](/docs/backend/consumer/page) feature you can manage content like documentation or
legal pages at the backend. Your frontend can load these pages through the Consumer API, so that content
changes do not require a new deployment of your app.

## Webhooks

Users can subscribe to [Events](/docs/backend/api/event) of your API through the `/consumer/webhook`
endpoint. Fusio then calls the provided URL every time the event occurs. You can use this to build a
UI where your users manage their own webhook subscriptions.

## Monetization

If you want to charge for your API, Fusio provides a [Monetization](/docs/monetization) system. Users can buy
points through a payment provider like Stripe and spend those points by calling specific operations. Your
frontend can show the available plans and start the checkout process through the Consumer API.

## Frameworks

Since your frontend only talks to Fusio through a REST API, you can use any framework you like, for example
Angular, React, Vue or Svelte.

Fusio has extra support for Angular, since the type-safety of Fusio and Angular is a great match. The official
[backend](https://github.com/apioo/fusio-apps-backend) and [developer](https://github.com/apioo/fusio-apps-developer)
apps are also built with Angular. Take a look at the [Angular Integration](./angular_integration) page for more details.

## Developer Portal

If you need a frontend for external developers who want to use your API, you do not need to build it yourself.
Fusio provides a ready-to-use [Developer Portal](/docs/developer_portal) which contains documentation, registration,
login and app management. It is also a good reference if you want to see how a real app uses the Consumer API.
