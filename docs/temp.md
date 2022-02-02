







Fusio is as an open source api management and serverless platform which helps to build great APIs while being self
hosted and vendor independent. More information on https://www.fusio-project.org/

## API management and features

Fusio is an API management platform where you can configure routes which execute specific actions. An action triggers
your business logic, it is like a controller in a classical framework, you can also think of it like a serverless lambda
function, which can be executed on a route call or via RPC. Fusio covers many aspects of the API management life cycle
so that you can concentrate on writing the actual business logic of your API. The following feature list gives you a
first overview:

## Features

* __OpenAPI generation__  
  Fusio generates automatically an OpenAPI specification for the defined routes.

* __SDK generation__  
  Fusio can automatically generate a client SDK for your API based on the defined schema.

* __Subscription support__  
  Fusio contains a subscription layer which helps to build pub/sub for your API.

* __Rate limiting__  
  Fusio provides a way to rate limit requests based on the user or app.

* __Authorization__  
  Fusio uses OAuth2 for API authorization.

* __RPC support__  
  Fusio provides RPC support, every action which you create can be also called via JsonRPC

* __Monetization__  
  Fusio provides a simple payment system to charge for specific routes.

* __Versioning__  
  It is possible to define different versions of your endpoint.

* __Validation__  
  Fusio uses the TypeSchema to automatically validate incoming request data

* __Analytics__  
  Fusio monitors all API activities and shows them on a dashboard.

* __User management__  
  Fusio provides a developer app where new users can login or register a new account through GitHub, Google, Facebook or through normal email registration.

* __Logging__  
  All errors which occur in your endpoint are logged and are visible at the backend including all information from the request.

* __Connection__  
  Fusio provides an adapter system to connect to external services. By default we provide the HTTP and SQL connection type but there are many other types available i.e. MongoDB, Amqp, Cassandra.

* __Action__  
  Fusio contains an action ecosystem which helps to build APIs based on different sources, i.e. the SQL-Table actions provides an API based on a database table.

* __Migration__  
  Fusio has a migration system which allows you to change the database schema on deployment.

* __Testing__  
  Fusio provides an api test case wherewith you can test every endpoint response without setting up a local web server.

## Backend

Fusio provides several apps which work with the internal backend API. These apps can be used to manage and work with the
API. This section gives a high level overview what the Fusio system provides and how the application is structured.

### API

If you install a Fusio system it setups the default API. Through the API it is possible to manage the complete system.
Because of that Fusio has some reserved paths which are needed by the system.

* `/backend`  
  Endpoints for the system configuration
* `/consumer`  
  Endpoints for the consumer i.e. register new accounts or create new apps
* `/system`  
  Endpoints for public system functions
* `/authorization`  
  Endpoints for the consumer to get i.e. information about the user itself and to revoke an obtained access token

There is also a complete documentation about all internal API endpoints.

## Architecture

The basic building block of Fusio is the concept of an action. An action is simply a PHP class which receives a request
and returns a response. Around this action Fusio handles all common logic like Authentication, Rate-Limiting, Schema
validation, Logging etc. The class has to implement the following signature:

```php
<?php

namespace App;

use Fusio\Engine\ActionAbstract;
use Fusio\Engine\ContextInterface;
use Fusio\Engine\ParametersInterface;
use Fusio\Engine\RequestInterface;

class HelloWorld extends ActionAbstract
{
    public function handle(RequestInterface $request, ParametersInterface $configuration, ContextInterface $context)
    {
        return $this->response->build(200, [], [
            'hello' => 'world',
        ]);
    }
}
```

## Generate a new site

Generate a new Docusaurus site using the **classic template**.

The classic template will automatically be added to your project after you run the command:

```bash
npm init docusaurus@latest my-website classic
```

You can type this command into Command Prompt, Powershell, Terminal, or any other integrated terminal of your code editor.

The command also installs all necessary dependencies you need to run Docusaurus.

## Start your site

Run the development server:

```bash
cd my-website
npm run start
```

The `cd` command changes the directory you're working with. In order to work with your newly created Docusaurus site, you'll need to navigate the terminal there.

The `npm run start` command builds your website locally and serves it through a development server, ready for you to view at http://localhost:3000/.

Open `docs/intro.md` (this page) and edit some lines: the site **reloads automatically** and displays your changes.
