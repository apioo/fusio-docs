
# Util Condition

This action allows to evaluate a condition and execute another action depending on the result

## Configuration

### Condition

The condition to evaluate. Inside the expression you can access all values of the request and context.

* `request.get("id") == 1`
* `request.get("param") == "foo"`
* `request.getPayload().foo == "bar"`
* `context.getUser().getPlanId() == 2`

### True

The Action to execute in case the condition is true

### False

The Action to execute in case the condition is false
