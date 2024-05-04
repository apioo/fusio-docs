
# Marketplace

The marketplace is a concept in Fusio to easily install small apps which work with the Fusio API.
I.e. through the marketplace you can install the Fusio backend app and also the developer app which
provides a basic developer portal.

## Configuration

In Fusio there is a configuration at the `.env` file which controls whether the marketplace is active s.

```
APP_MARKETPLACE="off"
```

If the marketplace is `off` it only shows all available apps, there is no way to install new apps. If
the marketplace is `on` you can install remote apps. By default the marketplace is `off` since it
dynamically downloads files and in some environments you want that your code base is immutable and
does not dynamically changes. In this case it would be better to use the marketplace CLI commands to
install an app at a build step.

## Backend

In case the marketplace is on you can see at the backend app all available apps s.

![marketplace_on](/img/concepts/marketplace_on.png)

With a click on the "plus" button you can install a new app.
Those are the same apps which we also list at our [website](https://www.fusio-project.org/marketplace).
If the marketplace is off you only see all installed apps s.

![marketplace_off](/img/concepts/marketplace_off.png)

## CLI

Besides the backend it is also possible to install an app through a CLI command. Through
the `list` command you can list all available apps at the marketplace s.

```
php bin/fusio marketplace:list
```

Then you can use the following commands to install, update or remove an app.

```
php bin/fusio marketplace:install [app_name]
php bin/fusio marketplace:update [app_name]
php bin/fusio marketplace:remove [app_name]
```

