
# Worker

In case your endpoint needs to execute more complex business logic we provide
a worker system which allows you to implement your business logic in different
programming languages:

* [Java/Groovy](../../backend/api/action/worker-java.md)
* [Javascript](../../backend/api/action/worker-javascript.md)
* [PHP](../../backend/api/action/worker-php.md)
* [Python](../../backend/api/action/worker-python.md)

## Setup

To setup a worker you need at first run the worker. A worker is a simple separated
web app which implements the following [REST API](https://app.typehub.cloud/d/fusio/worker).
If the worker runs you need to create a connection at Fusio which connects to
this worker.

![worker_connection](/img/use_cases/api_gateway/worker_connection.png)

In this example we have created a connection to the Javascript-Worker. You can now
create an action which uses this worker and provides the business logic s.

![worker_action](/img/use_cases/api_gateway/worker_action.png)

Here we only select some data from a database table but you are free to implement
any custom logic. The action can then be used (like all other actions) at an operation,
which gets executed on a specific HTTP request.
