
# HTTP Load Balancer

Invokes randomly one of the configured urls for load balancing.

## Configuration

![http_composite](/img/backend/api/action/http_composite.png)

### URL

A list of urls where one url is randomly selected on request.

### Content-Type

Describes the Content-Type of the internal API response. Fusio then parses the response and
returns the fitting format.

### HTTP-Version

Optional to explicit specify the used HTTP version.

### Authorization

Optional an `Authorization` header value for internal authorization. You need to provide the
complete authorization value i.e. `Basic [credentials]` or `Bearer [my_token]`.

### Query

Optional static query parameters which are always added to the url i.e. in the format
`foo=bar&key=foo`

### Cache

Optional to enable HTTP caching, this means that Fusio will interpret all HTTP caching headers
and cache the response if possible.

## Execution

Selects on of the configured url on request and returns the response.
