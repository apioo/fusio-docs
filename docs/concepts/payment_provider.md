
# Payment Provider

Through a payment provider a user is able to obtain points. This chapter explains more in detail how this process works.
If a user of your API wants to obtain points he has to use a configured payment provider. To start the payment process
your app has to send a POST request to the `/consumer/transaction/prepare/stripe` endpoint (in this example we use
stripe as provider) with the following payload:

```json
{
  "planId": 1,
  "returnUrl": "http://my-app.com/payment/return?transaction_id={transaction_id}"
}
```

The `planId` is the id of a plan which was configured at the backend. The return url is the url of your app where the
user returns after the payment was completed. If everything is valid the endpoint returns an approval url of the payment
provider:

```json
{
  "approvalUrl": ""
}
```

Your app has to simply redirect the user to this approval url. Then the user authenticates at the payment provider and
approves the payment. Then the user gets redirected to the `/consumer/transaction/execute/{transaction_id}` endpoint
where Fusio checks whether the payment was accepted. If yes Fusio credits the amount of points to the user.

Then it redirects the user to the return url which was provided in the initial prepare call. You app can then lookup the
status of the transaction and display a fitting message.

## Implementation

It is also easy to implement a custom payment provider. It is important that the provider supports a redirect based
flow. It is currently not possible to simply enter the credit card number. To create a new payment provider you need to
create a class which implements the `Fusio\Engine\Payment\ProviderInterface`

