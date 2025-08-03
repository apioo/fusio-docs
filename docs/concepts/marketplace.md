
# Marketplace

The marketplace is a concept in Fusio to easily install small apps which work with the Fusio API.
I.e. through the marketplace you can install the Fusio backend app and also the developer app which
provides a basic developer portal.

## Backend

At the backend the marketplace lists all available actions and apps s.

![marketplace](/img/concepts/marketplace.png)

With a click on the detail button you can see all details about the action or
app.

![marketplace](/img/concepts/marketplace_detail.png)

Through the install button you can download the action or app to your local Fusio
instance. Some actions or apps might have an assigned cost, this means you can only
install those actions or apps in case you have purchased some Fusio coins, which
you can obtain by registering at the [marketplace](https://www.fusio-project.org/marketplace).
After registration, you can provide your marketplace credentials to your Fusio
instance by configuring the `marketplace_client_id` and `marketplace_client_secret`
setting.

## CLI

Besides the backend it is also possible to install an action or app through a CLI
command. Through the `list` command you can list all available apps at the marketplace s.

```
php bin/fusio marketplace:list action
php bin/fusio marketplace:list app
```

Then you can use the following commands to install or update an action or app.

```
php bin/fusio marketplace:install app [app_name]
php bin/fusio marketplace:update app [app_name]
```

