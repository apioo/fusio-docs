---
sidebar_position: 2
---

# Operation

An operation is mapped to a HTTP method and path and invokes a specific action. You can attach various meta information
to an operation like the parameters, incoming and outgoing schema or a description. Fusio can use this information to
generate a fitting OpenAPI specification or client SDK. If a request method is public it is possible to request the API
endpoint without an access token.

![routes_update](/img/backend/api/operation_update.png)

## HTTP Path

The path can contain variable path fragments. These fragments can be accessed inside an action. The following list
describes the syntax.

* `/product`
  No variable path fragment only the request to `/product` matches this route

* `/product/:product_id`
  Simple variable path fragment. This route matches to any value except a slash. I.e. `/product/foo` or `/product/12`
  matches this route

* `/product/$year<[0-9]+>`
  Variable path fragment with a regular expression. I.e. only `/product/2015` matches this route

* `/file/*path`
  Variable path fragment which matches all values. I.e. `/file/foo/bar` or `/file/12` matches this route

## Scopes

The scopes field defines a set of scopes assigned to a route. If the route is protected, an end user needs to obtain a
scope in order to access the endpoint.

## Action

The action contains the business logic of your API endpoint. It i.e. selects or inserts entries from a database or
pushes a new entry to a message queue. You can select different types of actions, the following list describes each
type:

* __Action__  
  Selects a preconfigured action which was previously created at the action panel.
* __Class__  
  Reference a PHP class which is available at your source code i.e. `App\Action\MyAction` the action class must implement
  the `Fusio\Engine\ActionInterface`.
* __HTTP/HTTPS__  
  Invokes a HTTP url, it proxies the request to the endpoint and also adds Fusio specific information

## Costs

Contains how much a user needs to pay in order to invoke a route. A user can obtain points by buying a
specific plan at the developer portal.
