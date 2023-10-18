
# TypeSchema integration

Fusio comes built-in with support for [TypeSchema](https://typeschema.org/) a JSON format to describe data models in a
language neutral format. Through TypeSchema you can define your data schema in a simple JSON files and then
automatically generate PHP classes. THis has many advantages since it makes your actions complete type-safe.

To generate the classes from your `resources/typeschema.json` file you can either use the following command s.

```
php bin/fusio generate:model
```

This automatically generates all classes to the `src/Model` location.

## GitHub Action

As alternative to the manual command you can also include the [TypeSchema GitHub Action](https://github.com/marketplace/actions/typeschema-code-generator)
which automatically generates and commits the models to your repo if you commit changes to the TypeSchema file.
As example
https://github.com/apioo/fusio-model/blob/main/.github/workflows/ci.yml
