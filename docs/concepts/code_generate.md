
# Generate

Fusio contains several commands to automatically generate specific classes. At this page we explain
the most important commands.

## Model

```
php bin/fusio generate:model
```

This command reads a [TypeSchema](https://typeschema.org/) file from `resources/typeschema.json` and automatically
generates all model classes at the `src/Model` folder. You can then use those models on your route yaml
definitions as request and response schema.

## SDK

```
php bin/fusio generate:sdk
```

This command generates a client SDK for your API.

## Table

```
php bin/fusio generate:table
```

This command generates for every table a Table and Row class at the `src/Table` folder. So you can use this
command after you have defined your table structure at the migration.
