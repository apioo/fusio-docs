
# MongoDB

Creates a connection to a MongoDB server. The connection uses the MongoDB extension to connect to a database.

## URL

The url must have the following format:
`mongodb://[username:password@]host1[:port1][,host2[:port2:],...]/db`

## Options

It is possible to provide option parameters. The options must be url encoded i.e. `connect=1&fsync=1`

## Implementation

* Library: https://github.com/mongodb/mongo-php-library
* Returns: `MongoDB\Database`
