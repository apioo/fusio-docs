
# Migration

Fusio uses the Doctrine Migrations system. Fusio has basically two components which are using the migration system. At
first Fusio itself uses it to install the internal schema and execute updates on a new release, and it is also
possible for the API developer to use the migration system.

## Usage

For example to install Fusio you execute the following command:

```
php /bin/fusio migration:migrate
```

which then executes all migrations on the database which was configured at the `.env` file, then it will execute all
migrations which are not already executed.

## Commands

Fusio supports the following migration commands:

```
migrations:diff                   [diff] Generate a migration by comparing your current database to your mapping information.
migrations:dump-schema            [dump-schema] Dump the schema for your database to a migration.
migrations:execute                [execute] Execute one or more migration versions up or down manually.
migrations:generate               [generate] Generate a blank migration class.
migrations:latest                 [latest] Outputs the latest version
migrations:list                   [list-migrations] Display a list of all available migrations and their status.
migrations:migrate                [migrate] Execute a migration to a specified version or the latest available version.
migrations:rollup                 [rollup] Rollup migrations by deleting all tracked versions and insert the one version that exists.
migrations:status                 [status] View the status of a set of migrations.
migrations:sync-metadata-storage  [sync-metadata-storage] Ensures that the metadata storage is at the latest version.
migrations:up-to-date             [up-to-date] Tells you if your schema is up-to-date.
migrations:version                [version] Manually add and delete migration versions from the version table.
```
