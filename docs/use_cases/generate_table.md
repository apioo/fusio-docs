
# Generate Table

By default Fusio does not provide a build in ORM, instead we recommend to build
your API using plain SQL queries, which improves the performance and flexibility.

To still work type-safe models for your tables Fusio provides a table generator
which automatically reads all your defined tables and generates for each table
fitting models and classes. You can generate those tables with the following
command:

```
php bin/fusio generate:table
```

This writes all table classes at the `src/Table` folder. You can take a look
at our [sample repository](https://github.com/apioo/fusio-sample-cms/tree/master/src/Table)
to see the generated table classes.
