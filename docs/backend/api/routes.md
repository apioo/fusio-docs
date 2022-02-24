---
sidebar_position: 2
---

# Routes

A route redirects the incoming request to an action. Beside the action you can attach various meta information to a
route like the request and response schema or a description. Fusio can use these information to generate a fitting
OpenAPI specification. If a request method is public it is possible to request the API endpoint without an
access token.

![routes_update](/img/backend/api/routes_update.png)

## Path

The path can contain variable path fragments. It is possible to access these variable path fragments inside an action.
The following list describes the syntax.

* `/news`
  No variable path fragment only the request to `/news` matches this route

* `/news/:news_id`
  Simple variable path fragment. This route matches to any value except a slash. I.e. `/news/foo` or `/news/12` matches
  this route

* `/news/$year<[0-9]+>`
  Variable path fragment with a regular expression. I.e. only `/news/2015` matches this route

* `/file/*path`
  Variable path fragment which matches all values. I.e. `/file/foo/bar` or `/file/12` matches this route

## Scopes

The scopes field defines a set of scopes which are assigned to this route. If the route is protected an enduser needs
to obtain such a scope in order to access the endpoint.

## Status

The status affects the behaviour of the API endpoint. The following list describes each status

* `Development`
  Used as first status to develop a new API endpoint. It adds a "Warning" header to each response that the API is in
  development mode.

* `Production`
  Used if the API is ready for production use.

* `Deprecated`
  Used if you want to deprecate a specific version of the API. Adds a "Warning" header to each response that the API is
  deprecated.

* `Closed`
  Used if you dont want to support a specific version anymore. Returns an error message with a `410 Gone` status code

## Action

The action contains the business logic of your API endpoint. It i.e. selects or inserts entries from a database or
pushes a new entry to a message queue. Through the dropdown you can simply select an action.

## Costs

Contains an amount how much a user needs to pay in order to invoke this route. A user can obtain points by buying a
specific plan at the developer portal.
