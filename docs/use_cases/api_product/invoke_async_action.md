
# Invoke async action

Fusio provides an option to execute an action in async mode. This means that if a request arrives at this action the
request gets placed in a queue and will be executed later on in the background. To make an action async you need to 
simply set the async checkbox s.

![action_create_async](/img/use_cases/api_product/action_create_async.png)

In case the action is async your endpoint directly returns a 202 status code with an information that the request was
queued for execution. This feature is useful in case your action is really expensive and you dont want that a user
needs to wait for the response.
