
# Create API from OpenAPI

This generator helps to create an API based on an OpenAPI specification.
It creates automatically all fitting routes, actions and schemas.

## Provider

Go to the Generator panel and select as class the "Import-OpenAPI" provider,
then you should see the following form:

![generator_database](/img/use_cases/api_builder/import_openapi.png)

In the following we explain the generator specific fields, please take a look at our
[generator concept](../../concepts/generator) page to understand the general concept.

#### Specification

The OpenAPI specification which you want to import. Note Fusio uses [TypeSchema](https://typeschema.org/)
instead of JsonSchema, which is a more strict and generator optimized specification.
