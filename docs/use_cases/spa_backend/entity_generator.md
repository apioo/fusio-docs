
# Entity Generator

Fusio provides an SQL entity generator which generates complete APIs based
on an entity definition. To use the generator you need to go to the Generator
panel and select the SQL-Entity class s.

![generator_sql_entity](/img/use_cases/spa_backend/generator_sql_entity.png)

The __Base-Path__ is the path under which every entity is created in this example
we use `/domain` but it could be also simply `/` or a different path.

The __Scopes__ is a list of scopes which are automatically assigned to each
operation. This is optional and you can also assign those scopes later on.

Through the __Public__ field you indicate whether each endpoint is private or
public. By default every operation is private which means you need an access token
to call such an endpoint. If you like to test your endpoints without authorization
you could make those endpoints also public.

The __Connection__ specifies the connection which is used by the generator.

The __Schema__ field contains the entity specification.

## Database

If you click the execute button the generator reads the specification and creates
a table for each defined entity at the selected connection. In this example
our specification contains only a single "Product" entity which results in the
following table:

![generator_sql_entity_table](/img/use_cases/spa_backend/generator_sql_entity_table.png)

Note the `_0` in the table name is simply the version of your table. If you execute the
generator again it would create a `app_product_1` table since the generator is not able
to delete a table. To fix this you can of course also manually delete legacy tables with
a database tool of your choice.

## Model

Besides the database the generator produces the fitting Operation, Action and Schema
classes to CRUD those entities.

![generator_sql_entity_actions](/img/use_cases/spa_backend/generator_sql_entity_actions.png)

