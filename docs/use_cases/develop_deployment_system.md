
# Develop deployment system

Fusio has a deployment system which allows you to store your complete Fusio configuration into `.yaml` config files.
This allows you to store all config in a VCS so that you can easily reproduce a Fusio installation without sharing a
database. The deploy system internally also only talks to the REST API which is used by the backend app. If you want to
see a complex example you can take a look at our [headless CMS repository](https://github.com/apioo/fusio-sample-cms)
which uses the deploy system to build a headless CMS.

## Routes

Describes for each route the available request methods, whether the endpoint is public or private, the available
request/response schema and also the action which should be executed:

```yaml
"/todo": !include resources/routes/todo/collection.yaml
"/todo/:todo_id": !include resources/routes/todo/entity.yaml
```

## Connection

Provides connections to a remote service i.e. mysql or mongodb. This connection can be used inside an action. By default
we use the System connection which uses the database which you have provided at the `.env` file. But through this it is
possible to connect to multiple different external services.

```yaml
My-Connection:
  class: Fusio\Adapter\Sql\Connection\Sql
  config:
    type: "pdo_mysql"
    host: "127.0.0.1"
    username: "user"
    password: "pw"
    database: "my_db"
```

Through the command `php bin/fusio deploy` you can deploy the API. It is now possible to visit the API endpoint at:
`/todo`.
