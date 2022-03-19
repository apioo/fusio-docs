
# Deployment system

Fusio has a deployment system which allows you to store your complete Fusio configuration into `.yaml` config files.
This allows you to store all config in a VCS so that you can easily reproduce a Fusio installation without sharing a
database. The deploy system internally also only talks to the REST API which is used by the backend app. If you want to
see a complex example you can take a look at our [headless CMS repository](https://github.com/apioo/fusio-sample-cms)
which uses the deploy system to build a headless CMS.

## Routes

All routes are stored in dedicated [routes](https://github.com/apioo/fusio-sample-cms/blob/master/resources/routes.yaml)
file which includes for each route a detail yaml file.

```yaml
"/page": !include resources/routes/page/collection.yaml
"/page/:page_id": !include resources/routes/page/entity.yaml
"/post": !include resources/routes/post/collection.yaml
"/post/:post_id": !include resources/routes/post/entity.yaml
"/comment": !include resources/routes/comment/collection.yaml
"/comment/:comment_id": !include resources/routes/comment/entity.yaml
```

The routes detail yaml file contains all information about a route which you can also provide at the backend. In this
example we use as schema model classes which we have generated. Your action then also automatically receives those
generated model classes.

```yaml
version: 1
scopes: ["comment"]
methods:
  GET:
    public: true
    description: "Returns all available comments"
    parameters: "App\\Model\\Comment_Query"
    responses: 
      200: "App\\Model\\Comment_Collection"
      500: "App\\Model\\Message"
    action: "App\\Action\\Comment\\GetAll"
  POST:
    public: false
    description: "Creates a new comment"
    request: "App\\Model\\Comment"
    responses: 
      201: "App\\Model\\Message"
      500: "App\\Model\\Message"
    action: "App\\Action\\Comment\\Create"
```

## Models

All models are generated through a TypeSchema definition. Please take a look at the [gen/](https://github.com/apioo/fusio-sample-cms/tree/master/gen)
folder which contains hte script to generate the models based on a TypeSchema definition.

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
