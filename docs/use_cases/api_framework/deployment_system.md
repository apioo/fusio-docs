
# Deployment system

Fusio has a deployment system which allows you to store your complete Fusio configuration into `.yaml` config files.
This allows you to store all config in a VCS so that you can easily reproduce a Fusio installation without sharing a
database. You can execute the deployment system with the `php bin/fusio deploy` command, then Fusio reads all defined
configuration files and sends them to the internal REST API. If you want to see an example you can take a look at our
[headless CMS repository](https://github.com/apioo/fusio-sample-cms) which uses the deploy system to build a headless
CMS.

## Operations

All operations are stored in a dedicated [operations](https://github.com/apioo/fusio-sample-cms/blob/master/resources/operations.yaml)
file which includes for each operation a detail yaml file.

```yaml
"page.getAll": !include resources/operations/page/collection.yaml
"page.get": !include resources/operations/page/entity.yaml
"post.getAll": !include resources/operations/post/collection.yaml
"post.get": !include resources/operations/post/entity.yaml
"comment.getAll": !include resources/operations/comment/collection.yaml
"comment.get": !include resources/operations/comment/entity.yaml
```

The operations detail yaml file contains all information about an operation which you can also provide at the backend.
In this example we use as schema model PHP classes which we have generated. Your action then also automatically receives
those generated model classes.

```yaml
scopes: ["comment"]
public: true
description: "Returns all available comments"
httpMethod: GET
httpPath: "/page"
httpCode: 200
outgoing: "App\\Model\\CommentCollection"
throws:
  500: "App\\Model\\Message"
action: "App\\Action\\Comment\\GetAll"
```

## Model

All models are generated through a TypeSchema definition. Please take a look at the [TypeSchema integration](./typeschema_integration)
page for more information how to automatically generate those models.

## Action

Each action uses a service to handle a specific resource. I.e. the comment create action only invokes the create method
of the comment service so that the action does not contain any complex logic.

```php
class Create extends ActionAbstract
{
    private Comment $commentService;

    public function __construct(Comment $commentService)
    {
        $this->commentService = $commentService;
    }

    public function handle(RequestInterface $request, ParametersInterface $configuration, ContextInterface $context)
    {
        try {
            $id = $this->commentService->create(
                $request->getPayload(),
                $context
            );

            $message = new Message();
            $message->setSuccess(true);
            $message->setMessage('Comment successful created');
            $message->setId($id);
        } catch (StatusCodeException $e) {
            throw $e;
        } catch (\Throwable $e) {
            throw new InternalServerErrorException($e->getMessage());
        }

        return $this->response->build(201, [], $message);
    }
}
```

### PHP Class

```yaml
action: "App\\Todo\\CollectionAction"
```

If the action string is a PHP class Fusio tries to autoload this class through composer. The class must implement the
`Fusio\Engine\ActionInterface`. This is the most advanced solution since it is also possible to access services from the
DI container. In the following an example implementation:

```php
<?php

namespace App\Todo;

use Fusio\Engine\ActionAbstract;
use Fusio\Engine\ContextInterface;
use Fusio\Engine\ParametersInterface;
use Fusio\Engine\RequestInterface;

class CollectionAction extends ActionAbstract
{
    public function handle(RequestInterface $request, ParametersInterface $configuration, ContextInterface $context)
    {
        // @TODO handle request and return response

        return $this->response->build(200, [], [
            'message' => 'Hello World!',
        ]);
    }
}
```

### PHP File

```yaml
action: "${dir.src}/Todo/collection.php"
```

If the action points to a file with a `php` file extension Fusio simply includes this file. In the following an example
implementation:

```php
<?php
/**
 * @var \Fusio\Engine\ConnectorInterface $connector
 * @var \Fusio\Engine\ContextInterface $context
 * @var \Fusio\Engine\RequestInterface $request
 * @var \Fusio\Engine\Response\FactoryInterface $response
 * @var \Fusio\Engine\ProcessorInterface $processor
 * @var \Fusio\Engine\DispatcherInterface $dispatcher
 * @var \Psr\Log\LoggerInterface $logger
 * @var \Psr\SimpleCache\CacheInterface $cache
 */

// @TODO handle request and return response

$response->build(200, [], [
    'message' => 'Hello World!',
]);
```

### HTTP Url

```yaml
action: "http://foo.bar"
```

If the action contains an `http` or `https` url the request gets forwarded to the defined endpoint. Fusio automatically
adds some additional headers to the request which may be used by the endpoint i.e.:

```http
X-Fusio-Route-Id: 72
X-Fusio-User-Anonymous: 1
X-Fusio-User-Id: 4
X-Fusio-App-Id: 3
X-Fusio-App-Key: 1ba7b2e5-fa1a-4153-8668-8a855902edda
X-Fusio-Remote-Ip: 127.0.0.1
```

### Static file

```yaml
action: "${dir.src}/static.json"
```

If the action points to a simple file Fusio will simply forward the content to the client. This is helpful if you want
to build fast an sample API with dummy responses.

## Deployment

Through the command `php bin/fusio deploy` you can deploy the API. This command reads all `.yaml` files and
creates/updates all resources through the API.

## Advanced

We have only covered deploying "operation" objects, but it is possible to deploy almost any
object which is available at Fusio. Therefor you need to configure the [.fusio.yml](https://github.com/apioo/fusio-sample-cms/blob/master/.fusio.yml)
file to include the fitting files. The following list shows all resources which can be deployed:

* Action
* Config
* Connection
* Cronjob
* Event
* Plan
* Rate
* Role
* Operation
* Schema
* Scope
