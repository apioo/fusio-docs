
# HTTP Raw

The HTTP Raw action allows you to craft a complete custom HTTP request to invoke
any kind of url and return the response.

## Configuration

![http_raw](/img/backend/api/action/http_raw.png)

### Url

Contains the target URL of your internal API where the request should be redirected.
The url can contain also variable path fragments i.e. if your configured Fusio url ist `/product/:id`
you could use as url `https://api.internal.com/domain/product/:id` and Fusio will replace
the variable path fragment `:id` with the provided value. Otherwise all query parameters,
headers and body values are proxied to the url.

### Headers

Contains a map of configured HTTP headers which are added to the request.

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

### Body

Contains a custom HTTP payload which is send to the url. You can access all values
from the incoming HTTP request and place it in the request body i.e.

```xml
<?xml version="1.0" encoding="UTF-8"?>
<payload>
  {% if arguments.id %}<id>{{ arguments.id }}</id>{% endif %}
  <name>{{ payload.name }}</name>
</payload>
```

Internally this action uses the [Twig](https://twig.symfony.com/) template engine to
produce the fitting payload. The following keys are available:

### arguments

Contains all arguments i.e. variable path fragments or query parameters.

### payload

Contains the HTTP payload i.e. if a JSON payload `{"name": "test"}` is send to the
endpoint you can access the name value with `{{ payload.name }}`

## Execution

Invokes the configured url with the configured HTTP method, headers and payload and returns the response.
Fusio automatically adds some additional headers to the request which may be used by the endpoint i.e.:

```http
X-Fusio-Operation-Id: 12
X-Fusio-User-Anonymous: 0
X-Fusio-User-Id: 4
X-Fusio-User-Name: 4
X-Fusio-App-Id: 3
X-Fusio-App-Key: 1ba7b2e5-fa1a-4153-8668-8a855902edda
X-Fusio-Remote-Ip: 127.0.0.1
```
