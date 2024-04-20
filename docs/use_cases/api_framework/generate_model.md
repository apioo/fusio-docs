
# Generate Model

In case you use the [deployment system](./deployment_system) and you build custom
action classes you can use our integrated model generator to easily generate 
request and response models to build complete type-safe endpoints.

First you need to define your schema at the `resources/typeschema.json` file, the
schema is based on [TypeSchema](https://typeschema.org/). Please take a look at our
[sample repository](https://github.com/apioo/fusio-sample-cms/blob/master/resources/typeschema.json)
to see an example schema.

If you have defined your schema you can run the following command to generate the
fitting PHP model classes:

```
php bin/fusio generate:model
```

This command generates all classes and places them at `src/Model`. Now you can use the
models in your operations.

