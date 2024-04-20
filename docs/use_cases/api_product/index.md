
# API Product

Using Fusio as API product means, that you have an existing maybe legacy web
app and you use Fusio to create a state-of-the-art REST API beside your
existing web app where external developers can register to consume your API.

## Integration

The fist step is to integrate Fusio with your existing web app. You should
identify which resources of your web app you would like to expose through the
Fusio REST API. For example if you are a server hosting provider it would make
sense to create endpoints to give your users the option to start or shutdown a
server and to return a list of available servers. This is an important step,
which gives your customers new ways to work and integrate with your product.

### Database

The most direct and raw way is to give Fusio direct access to your web app
database. At Fusio you can easily create a database connection and use one
of the SQL actions to directly work with the database. This can be mostly
useful for read operations where you don`t need to execute additional business
logic.

### HTTP

Another solution would be to invoke an internal HTTP API or Form request in
case your web app already provides such an API. This has the advantage that
you trigger all your business logic and is the preferred solution for write
requests. Fusio can also transform your incoming requests to fit the format
of your internal API, so that you can build a clean API for your customers. 

### Message-Queue

Similar to the HTTP integration Fusio supports different message queue systems
like AMQP or Beanstalk. This can be useful for write requests to trigger a
specific worker or job in the background.

### Implementation

At last it is also possible to develop a complete custom action to trigger
your internal web app logic. This means you could use a custom protocol to
interact with your web app. For this please also take a look at the
[develop custom action](../api_framework/develop_custom_action.md) page.

## Authentication

The next step is to authenticate your users so that they can login to Fusio.
By default every user can register at Fusio either via email or through a
social login like GitHub or Google. It is also possible to configure a general
OpenID Connect provider so that you users don`t need to register a separate
account s.

![identity](/img/use_cases/api_product/identity.png)

## Developer portal

The last step is to configure the developer portal where all external developers
can login to consume your API. Fusio provides out of the box a developer portal
similar to other developer portals which you find at large companies s.

![developer_portal](/img/use_cases/api_product/developer_portal.png)

At this developer portal a user can manage all settings to access and work
with your API. We also provide the [account](https://github.com/apioo/fusio-apps-account)
app which basically only contains the user management aspect and removes all
other aspects of the developer portal, so it would be possible to include
this account app directly into your web app.

### Customizing

If you have specific CI requirements you can also completely include the
developer portal functionality into your existing web app.
Therefor you can take a look at the [consumer](https://www.fusio-project.org/api/consumer)
API specification which is also used by the developer app.
This requires of course a bit more work but gives you the complete freedom
to customize the frontend.
