
# Create schema

In Fusio it is possible to describe query parameters and request/response
payloads of every endpoint. While this is optional it has many benefits to
describe this data, since Fusio can use this to generate accurate OpenAPI
specifications and to automatically generate client SDKs.

## Operation

If you create an operation, you have the option to describe query parameters
and incoming and outgoing payload s.
![operation_schema](/img/use_cases/api_gateway/operation_schema.png)

Parameters can be described directly at the operation. At the incoming and outgoing
field you can select a schema from the Fusio schema store. The throws field contains
potential error responses where you can also select a response schema.

## Designer

Fusio uses [TypeSchema](https://typeschema.org/) to describe JSON structures.
You can write those schemas by hand or you use the editor which provides a simple
interface to build such schemas s.
![schema_designer](/img/use_cases/api_gateway/schema_designer.png)

With the "New Type" button you can add a new type and with the "New Property" button
you can add a property to a type. It is also possible to reorder and edit each
property.

If you click on the save button the editor generates the TypeSchema specification
and opens the save dialog to persist the schema s.
![schema_update](/img/use_cases/api_gateway/schema_update.png)

You can then use this schema at evey operation.
