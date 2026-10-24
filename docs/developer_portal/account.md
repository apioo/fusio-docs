---
sidebar_position: 5
---

# Account

After login a developer has access to the account area of the developer portal. There a developer can
manage everything which is needed to work with your API. All these features are also available through
the [Consumer API](https://www.fusio-project.org/api/consumer), so you can integrate them into your own app.

## Account

Shows the name, email and remaining points of the developer and allows the developer to update the
account details.

## Security

Allows the developer to change the password.

## Apps

An [App](/docs/backend/consumer/app) contains an app key and secret which a developer can use to obtain an
access token through the OAuth2 `client_credentials` flow. This is the recommended way for server-to-server
integrations, since the access of an app can be revoked at any time. When creating an app, the developer
selects the scopes which the app needs.

## Tokens

A [Personal Access Token](/docs/security/personal_access_token) can be used directly as Bearer token to call
your API. This is the fastest way for a developer to make the first request, i.e. for testing or for small
scripts. Like at the app, the developer can select only the scopes which are needed.

## Webhooks

A [Webhook](/docs/backend/consumer/webhook) allows the developer to subscribe to an [Event](/docs/backend/api/event)
of your API. Fusio then sends an HTTP request to the configured endpoint every time the event occurs. Through
this developers can react to changes without polling your API.

## Subscriptions

If you [monetize](/docs/monetization) your API, a developer can buy one of your [Plans](/docs/backend/monetization/plan)
on this page. After a successful payment, the developer receives the points of the plan, which are then spent
by calling operations which have a cost assigned.

## Logs

Shows all requests which the developer has made against your API. This helps developers to debug problems
with their integration without the need to contact your support.

## Specification

Shows the specification of your API, so that the developer can browse all available operations and the
corresponding request and response schemas.

## Agents

If you have configured [AI agents](/docs/ai), a developer can chat with those agents, i.e. to get help
about the usage of your API.
