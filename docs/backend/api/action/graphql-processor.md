
# GraphQL Processor

Proxies a query to a remote GraphQL server and returns the response. Through this
it is possible to expose a GraphQL server through Fusio.

Note this means you expose a complete GraphQL server to your users, this has some
problems regarding schema description, since a GraphQL server can return arbitrary
JSON responses it is not possible to describes those responses with a schema. In
general we recommend to use the GraphQL-Query action which only returns a specific
query response. Through this you get also other advantages i.e. that you could cache
a specific response.

## Configuration

![graphql_processor](/img/backend/api/action/graphql_processor.png)

### URL

The target GraphQL server
