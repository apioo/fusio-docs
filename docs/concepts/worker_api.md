
# Worker API

Fusio provides support to implement actions in multiple different programming languages. To support these
different languages Fusio uses a worker system. This means that the action code is not directly executed but instead
the request gets forwarded to a worker which then executes the action and returns a response. The worker is then
implemented in the target programming language which we want to support i.e. Javascript, Python or Java. Through
this your action code can use all features of the language. You can find a list of worker implementations at our
[overview page](https://www.fusio-project.org/worker). To support a specific language you only need to implement
a worker which provides a simple RPC interface.

## Configuration

To use a worker at your Fusio instance, you need to add the fitting worker urls at the configuration.php file. After 
this Fusio will automatically invoke the fitting methods in case an connection or action is created or changed. Then it
is also possible to use one of the worker actions.

```php
'fusio_worker'            => [
    'java'                => 'my_java_worker:9090',
    'javascript'          => 'my_javascript_worker:9091',
    'php'                 => 'my_php_worker:9092',
    'python'              => 'my_python_worker:9093',
],
```

## Methods

The RPC system is based on [Thrift](https://thrift.apache.org/). The following documentation shows the rendered thrift
file. If you want to implement a worker in a specific language you can check out our [thrift file](https://github.com/apioo/fusio-impl/blob/master/src/Worker/worker.thrift).

<iframe src="https://www.fusio-project.org/static/worker/worker.html" width="100%" height="600"></iframe>

## Types

This section contains a list of supported connection types. A connection type basically represents a connection to a
popular service which is available in most programming languages i.e. like mysql or http. At an action the user obtains
such a connection through the connection manager so that a user does not need to configure such services at an action.
The worker decides which implementation should be used for a specific type but it is recommended to use either a native
or popular solution so that most developers know how to work with this service. I.e. our nodejs worker uses the `mysql2`
npm package to provide a mysql connection and `axios` as http client.

### Fusio.Adapter.Sql.Connection.Sql

A simple connection to a database. The type defines which database we try to connect. Your worker does not need to
support all types but you should at least implement mysql support.

```json
{
  "type": "pdo_mysql",
  "host": "db host",
  "username": "db user",
  "password": "db password",
  "database": "db name"
}
```

| Type	       | Description                                    |
|-------------|------------------------------------------------|
| pdo_mysql   | Connection to a MySQL or MariaDB server        |
| pdo_pgsql   | Connection to a PostgreSQL server              |
| sqlsrv	   | Connection to a MSSQL server                   |
| oci8	       | Connection to a Oracle server                  |
| sqlanywhere | Connection to a SAP Sybase SQL Anywhere server |

### Fusio.Adapter.Sql.Connection.SqlAdvanced

Basically this is the same connection as sql but we use a connection string to connect to a database. Through this it is
possible to pass additional arguments to the connection.

```json
{
  "url": "mysql://user:secret@localhost/mydb"
}
```

### Fusio.Adapter.Http.Connection.Http

A HTTP client to make requests. The url parameter indicates the base url. The username, password and proxy settings are
optional.

```json
{
  "url": "https://api.acme.com",
  "username": "foo",
  "password": "bar",
  "proxy": "proxy ip"
}
```

### Fusio.Adapter.Mongodb.Connection.MongoDB

A connection to a MongoDB server.

```json
{
  "url": "mongodb://localhost:27017",
  "database": "my_db"
}
```

### Fusio.Adapter.Elasticsearch.Connection.Elasticsearch

A connection to a Elasticsearch server.

```json
{
  "host": "192.168.1.1:9200,192.168.1.2"
}
```
