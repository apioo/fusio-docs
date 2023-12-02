
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
