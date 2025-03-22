
# HTTP Composition

Invokes multiple urls and returns the response of each url as combined
response. This can be useful to improve performance so that a client only
needs to request a single endpoint.

## Configuration

### URL

A list of urls which should be requested

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

Requests each configured url and puts the response in an object where the key is the
url and the value is the response of the url.
