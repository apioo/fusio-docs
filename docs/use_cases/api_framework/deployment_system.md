
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
