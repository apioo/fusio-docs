---
sidebar_position: 5
---

# HTTP

Fusio is often used as gateway in front of existing APIs and services. This page shows how to call or proxy remote
HTTP APIs, either through prebuilt actions without code or through a worker action.

## Prebuilt HTTP actions

| Action                                                              | Description                                                                         |
|---------------------------------------------------------------------|-------------------------------------------------------------------------------------|
| [HTTP-Processor](/docs/backend/api/action/http-processor)           | Forwards the request to a remote URL and returns the response                       |
| [HTTP-Composition](/docs/backend/api/action/http-composition)       | Calls multiple remote URLs and combines the responses into a single response       |
| [HTTP-Load-Balancer](/docs/backend/api/action/http-load-balancer)   | Distributes requests across multiple remote URLs                                    |
| [HTTP-Raw](/docs/backend/api/action/http-raw)                       | Sends a raw HTTP request to a remote URL                                            |

The HTTP-Processor is the most common action, i.e. to put an existing internal service behind Fusio, so that
it is protected by authentication and rate limiting. Take a look at the [Getting started](/docs/bootstrap) page for
a complete example.

## Connection

The HTTP actions can be used with an absolute URL or together with an [HTTP connection](/docs/backend/api/connection/http).
A connection contains the base URL and i.e. authentication headers of the remote API, so you configure them only once.
Inside a worker action, an HTTP connection returns a [Guzzle](https://docs.guzzlephp.org/) client which is already
configured with the base URL.

## Worker examples

The following examples use the Worker-PHP-Local action and an HTTP connection with the name `Internal-API`.

### Call a remote API

Calls a remote API, i.e. to enrich or transform the data, and returns a custom response:

```php
<?php

use Fusio\Worker;
use Fusio\Engine;
use Psr\Log\LoggerInterface;

return function(Worker\ExecuteRequest $request, Worker\ExecuteContext $context, Engine\ConnectorInterface $connector, Engine\Response\FactoryInterface $response, Engine\DispatcherInterface $dispatcher, LoggerInterface $logger) {
    /** @var \GuzzleHttp\Client $client */
    $client = $connector->getConnection('Internal-API');

    $resp = $client->request('POST', '/my_api', [
        'json' => ['my_payload' => 'foobar'],
        'http_errors' => false,
    ]);

    if ($resp->getStatusCode() !== 200) {
        $logger->error('Remote API returned ' . $resp->getStatusCode());
        return $response->internalServerError('Could not call internal API');
    }

    $data = \json_decode((string) $resp->getBody());

    return $response->ok($data);
};
```

### Proxy a remote API

Forwards the response of the remote API unchanged to the client, including the status code and headers:

```php
<?php

use Fusio\Worker;
use Fusio\Engine;
use Psr\Log\LoggerInterface;

return function(Worker\ExecuteRequest $request, Worker\ExecuteContext $context, Engine\ConnectorInterface $connector, Engine\Response\FactoryInterface $response, Engine\DispatcherInterface $dispatcher, LoggerInterface $logger) {
    /** @var \GuzzleHttp\Client $client */
    $client = $connector->getConnection('Internal-API');

    $resp = $client->request('POST', '/my_api', [
        'json' => $request->getPayload(),
        'http_errors' => false,
    ]);

    return $response->proxy($resp);
};
```
