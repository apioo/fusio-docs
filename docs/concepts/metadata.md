
# Metadata

Fusio provides a general metadata system, that means every object at Fusio i.e. a User, Action or Operation has a
metadata property where you can insert arbitrary key/value data. This is i.e. useful if you create an action via the API
and you want to persist an identifier at the Fusio object. The following shows an example how to set some metadata:

```
{
  "metadata": {
    "my_key": "my_value"
  }
}
```

For a concrete example take a look at our backend [API documentation](https://www.fusio-project.org/api) for example
the [backend.user.create](https://www.fusio-project.org/api/backend#tag/user/operation/backend.user.create) or
[backend.app.update](https://www.fusio-project.org/api/backend#tag/app/operation/backend.app.update) endpoint where
you can set the `metadata` property.
