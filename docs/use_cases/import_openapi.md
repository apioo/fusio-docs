
# Import OpenAPI

To import an existing OpenAPI specification into Fusio you need to go to the routes panel and click there on the top
right briefcase button, then you should see the following dialog:

![routes_provider_openapi](/img/use_cases/routes_provider_openapi.png)

There you need to select the "OpenAPI" provider. At the specification field you can then insert your target
specification. If you click on the `Changelog` button you will see all routes, actions and schemas which this import
creates. Through the `Save` button you start the actual import.

## TypeSchema

Fusio uses internally TypeSchema which greatly improves the quality of our automated generated SDK code. TypeSchema is
basically a stricter version of JsonSchema which is optimized for code generation. If you import an OpenAPI spec it is
possible that Fusio will throw an error in case it is not TypeSchema compatible. In this case you can also go to the
[TypeSchema](https://typeschema.org/migration/openapi) website where you find a migration tool to convert your existing
OpenAPI spec to a TypeSchema compatible spec.
