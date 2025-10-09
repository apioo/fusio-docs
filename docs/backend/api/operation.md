---
sidebar_position: 2
---

# Operation

An operation is mapped to a HTTP method and path and invokes a specific action. You can attach various meta information
to an operation like the parameters, incoming and outgoing schema or a description. Fusio can use this information to
generate a fitting OpenAPI specification or client SDK. If a request method is public it is possible to request the API
endpoint without an access token.

## Configuration

![operation_create](/img/backend/api/operation_create.png)

### Name

The name of the operation. It is recommended to use a namespace to separate your operations with dots into logical units
i.e. `my.namespace.getAll` or `my.namespace.update`. The generated client SDK will also reflect this namespace i.e.
`client.my().namespace().getAll()` or `client.my().namespace().update()`.

### Scopes

The scopes field defines a set of scopes assigned to an operation. If the operation is protected, an end user needs to
obtain a scope in order to access the endpoint.

### Active

Whether the operation is active or not. If the operation is not active it is not possible to invoke this operation.

### Public

Whether the operation is public or private. If an operation is private (by default) the user needs to private an access
token to invoke the operation. The user also needs to have the fitting scope to invoke this operation.

### Stability

Indicates the stability of this operation. If the operation is stable it is not possible to change any values.

### Description

A short description of this operation.

### HTTP Method

The target HTTP method.

### HTTP Path

The target HTTP path can contain variable path fragments. These fragments can be accessed inside an action. The
following list describes the syntax.

* `/product`
  No variable path fragment only the request to `/product` matches this route

* `/product/:product_id`
  Simple variable path fragment. This route matches to any value except a slash. I.e. `/product/foo` or `/product/12`
  matches this route

* `/product/$year<[0-9]+>`
  Variable path fragment with a regular expression. I.e. only `/product/2015` matches this route

* `/file/*path`
  Variable path fragment which matches all values. I.e. `/file/foo/bar` or `/file/12` matches this route

### HTTP Code

The HTTP success code, this is mostly OK `200` or Created `201`

### Parameters

Defines all query parameters for this operation.

### Outgoing

A schema which describes the success response payload. You can select one of the following schema sources:

* __Schema__  
  Selects a preconfigured schema which was previously created at the schema panel.
* __Class__  
  Reference a PHP class which is available at your source code i.e. `App\Model\MySchema`. You can also automatically
  generate those [model classes](./../../use_cases/api_framework/generate_model)
* __HTTP/HTTPS__  
  Invokes an HTTP url and resolves the schema
* __File__  
  Loads a file and resolves the schema
* __Content-Type__  
  In case the response is not JSON you can select a content type

### Throws

Schemas to describe the error response payloads. You can select one of the following schema sources:

* __Schema__  
  Selects a preconfigured schema which was previously created at the schema panel.
* __Class__  
  Reference a PHP class which is available at your source code i.e. `App\Model\MySchema`. You can also automatically
  generate those [model classes](./../../use_cases/api_framework/generate_model)
* __HTTP/HTTPS__  
  Invokes an HTTP url and resolves the schema
* __File__  
  Loads a file and resolves the schema
* __Content-Type__  
  In case the response is not JSON you can select a content type

### Action

The action contains the business logic of your API endpoint. It i.e. selects or inserts entries from a database or
pushes a new entry to a message queue. You can select different types of actions, the following list describes each
type:

* __Action__  
  Selects a preconfigured action which was previously created at the action panel.
* __Class__  
  Reference a PHP class which is available at your source code i.e. `App\Action\MyAction` the action class must implement
  the `Fusio\Engine\ActionInterface`.
* __HTTP/HTTPS__  
  Invokes an HTTP url, it proxies the request to the endpoint and also adds Fusio specific information
* __File__  
  Executes the provided action file

### Costs

Contains how much a user needs to pay to invoke a route. A user can obtain points by buying a
specific plan at the developer portal.
