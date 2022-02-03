
# SDK Generation

You can help your users to build great apps based on your API by providing an SDK. Building such SDKs is always a time
consuming task and they can get easily out dated if your write them by hand. Fuiso can help you to build a great SDK for
your API by automatically generating code for your API based on the provided schema definitions. This chapter explains
how you can generate such code. You can also take a look at the Fusio javascript SDK which also uses the same approach.

## Generation

```
php bin/fusio api:generate -f typescript output
```

This command generates for every route a typescript file inside the output folder which contains a class to call the
endpoint.

If you are not happy with the generated code, you can take a look at the `psx-api` and `psx-schema` libraries which are
responsible for the code generation. There you can build your own custom generator or provide suggestions to existing
code generators.
