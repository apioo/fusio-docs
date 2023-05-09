
# Setup Monetization

Fusio helps you to monetize your API. It has a concept of points which each user can buy. A user can then spend those
points by calling specific routes which cost a specific amount of points. The API developer can simply add a cost to
every route and request method.

## Installation

At first you need to create a plan at the Fusio backend. A plan has a name, a specific amount of points and a price
assigned.

![plan](/img/use_cases/plan.png)

Then you need to configure a payment provider. For this you need to include i.e. the stripe or paypal adapter which
configures a payment provider.

```
composer require fusio/adapter-stripe
php bin/fusio system:register "Fusio\Adapter\Stripe\Adapter"
```

Then you need to create a new connection at the Fusio backend. This connection must be named "stripe" and you need to
provide your app credentials. At the connection you need to provide the credentials.

## Webhook

Fusio uses the webhook system of Stripe to get information about the payment status. You need to register a webhook
at the Stripe portal which calls the `/system/payment/stripe/webhook` endpoint of your Fusio instance. Also you need to
set the `payment_stripe_secret` system setting to the webhook secret key provided by stripe.

## Video

<iframe width="560" height="315" src="https://www.youtube.com/embed/AsyLUdz9oOU" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
