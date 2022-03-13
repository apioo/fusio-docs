
# Create API from MongoDB

Fusio provides a way to automatically create a REST API based on a MongoDB collection. It creates automatically the
fitting routes, actions and schemas. This can be useful if you want to quickly create a CRUD API.

## Provider

Go to the routes panel and click there on the top right briefcase button, then you should see the following dialog:

![routes_provider_sql_table](/img/use_cases/routes_provider_mongodb_collection.png)

For the `Connection` you need to select the MongoDB connection which you want to use for the API and the `Collection`
must contain a valid collection name. With a click on the Save Button you can start the import. Since MongoDB is by
default schemaless Fusio is not able to automatically generate a schema like for the database provider, but it is
recommended that you manually create a schema for your endpoint.

## Example

The provider will create two routes below your `Base-Path`. If your `Base-Path` is `/v1/product` for a collection called
`app_product`:

### /v1/product

#### `GET`

Returns a collection response of all products

```json
{
  "totalResults": 2,
  "itemsPerPage": 16,
  "startIndex": 0,
  "entry": [
    {
      "_id": "507f191e810c19729de860ea",
      "title": "foo bar",
      "description": "lorem ipsum",
      "details": {
        "price": 10
      }
    },
    {
      "_id": "507f1f77bcf86cd799439011",
      "title": "hello world",
      "description": "lorem ipsum",
      "details": {
        "price": 10
      }
    }
  ]
}
```

The endpoint supports the following query parameters:

##### Parameters

| Parameter     | Description                           |
|---------------|---------------------------------------|
| `startIndex`  | The start index of the collection     |
| `count`       | The count of results per page         |
| `sortBy`      | A field name to sort                  |
| `sortOrder`   | The sort order either `ASC` or `DESC` |
| `filterBy`    | A field name to filter                |
| `filterValue` | The filter value                      |

#### `POST`

Create a new product by sending the following JSON request to the endpoint:

##### Request

```json
{
  "title": "another entry",
  "description": "lorem ipsum",
  "details": {
    "price": 10
  }
}
```

##### Response

```json
{
  "success": true,
  "message": "Document successfully created",
  "id": "507f191e810c19729de860ea"
}
```

### /v1/product/:id

#### `GET`

Returns a single product entry

##### Response

```json
{
  "_id": "507f191e810c19729de860ea",
  "title": "hello world",
  "description": "lorem ipsum",
  "details": {
    "price": 10
  }
}
```

#### `PUT`

Updates a single product entity

##### Request

```json
{
  "title": "test world",
  "description": "lorem ipsum",
  "details": {
    "price": 19
  }
}
```

##### Response

```json
{
  "success": true,
  "message": "Document successfully updated"
}
```

#### `DELETE`

Deletes a single product entry

##### Response

```json
{
  "success": true,
  "message": "Document successfully deleted"
}
```

## Video

<iframe width="560" height="315" src="https://www.youtube.com/embed/G2Qge5OlJ24" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
