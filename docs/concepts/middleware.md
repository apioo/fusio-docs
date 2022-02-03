
# Middleware

In Fusio it is possible to configure a global middleware. The middleware is executed for every route. This can be
configured at the `configuration.php` file i.e.:

```
'psx_filter_pre'    => [function($request, $response, $filterChain){
    // add a custom header
    $response->setHeader('X-Foo', 'bar');

    $filterChain->handle($request, $response);
}],
'psx_filter_post'   => [
],
```

The filter can be either a classname, closure or `PSX\Http\FilterInterface` instance. In the example we add a middleware
which adds a custom header to every response. Please take a look at the following repository to see common middleware
implementations.
