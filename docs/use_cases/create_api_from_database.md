
# Create API from Database

Fusio provides a way to automatically create a REST API based on a database table. It creates automatically the fitting
routes, actions and schemas. This can be useful if you want to quickly create a CRUD API. To do this you need to go to
the routes panel and click there on the top right briefcase button, then you should see the following dialog:

![routes_provider_sql_table](/img/use_cases/routes_provider_sql_table.png)

For the `Connection` you need to select the database connection which you want to use for the API and the `Table` must
contain a valid table name. If you click on the changelog button you should see the following output:

![routes_provider_sql_table_changelog](/img/use_cases/routes_provider_sql_table_changelog.png)

There you see the routes, actions and schemas which the import would create. With a click on the Save Button you can
start the import. Fusio analyzes the table schema and creates based on this information the fitting schema.

## Video

<iframe width="560" height="315" src="https://www.youtube.com/embed/3jHr_W9yjzM" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
