
# Create API from Database

Fusio provides a way to automatically create a REST API based on a database table. It creates automatically the fitting
routes, actions and schemas. This can be useful if you want to quickly create a CRUD API.

## Provider

Go to the routes panel and click there on the top right briefcase button, then you should see the following dialog:

![routes_provider_sql_table](/img/use_cases/routes_provider_sql_table.png)

For the `Connection` you need to select the database connection which you want to use for the API and the `Table` must
contain a valid table name. If you click on the changelog button you should see the following output:

![routes_provider_sql_table_changelog](/img/use_cases/routes_provider_sql_table_changelog.png)

There you see the routes, actions and schemas which the import would create. With a click on the Save Button you can
start the import. Fusio analyzes the table schema and creates based on this information the fitting schema.

## Example

The provider will create two routes below your `Base-Path`. If your `Base-Path` is `/v1/product` for a table called
`app_product` with the following schema:

### Schema

```sql
CREATE TABLE `app_product` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(128) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `insert_date` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB;
```

This would create the following API endpoints:

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
      "id": 2,
      "title": "foo bar",
      "description": "lorem ipsum",
      "insert_date": "2022-03-13T22:08:20+00:00"
    },
    {
      "id": 1,
      "title": "hello world",
      "description": "lorem ipsum",
      "insert_date": "2022-03-13T22:07:53+00:00"
    }
  ]
}
```

The endpoint supports the following query parameters:

##### Parameters

| Parameter     | Description                                                                |
|---------------|----------------------------------------------------------------------------|
| `startIndex`  | The start index of the collection                                          |
| `count`       | The count of results per page                                              |
| `sortBy`      | A column name to sort                                                      |
| `sortOrder`   | The sort order either `ASC` or `DESC`                                      |
| `filterBy`    | A column name to filter                                                    |
| `filterOp`    | The filter operator either `contains`, `equals`, `startsWith` or `present` |
| `filterValue` | The filter value                                                           |

#### `POST`

Create a new product by sending the following JSON request to the endpoint:

##### Request

```json
{
  "title": "another entry",
  "description": "lorem ipsum",
  "insert_date": "2022-03-13T22:08:20+00:00"
}
```

##### Response

```json
{
  "success": true,
  "message": "Entry successfully created",
  "id": "4"
}
```

### /v1/product/:id

#### `GET`

Returns a single product entry

##### Response

```json
{
  "id": 1,
  "title": "hello world",
  "description": "lorem ipsum",
  "insert_date": "2022-03-13T22:07:53+00:00"
}
```

#### `PUT`

Updates a single product entity

##### Request

```json
{
  "title": "test world",
  "description": "lorem ipsum",
  "insert_date": "2022-03-13T22:07:53+00:00"
}
```

##### Response

```json
{
  "success": true,
  "message": "Entry successfully updated"
}
```

#### `DELETE`

Deletes a single product entry

##### Response

```json
{
  "success": true,
  "message": "Entry successfully deleted"
}
```

## Video

<iframe width="560" height="315" src="https://www.youtube.com/embed/3jHr_W9yjzM" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
