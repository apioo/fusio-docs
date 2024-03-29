
# CLI Processor

Executes the provided command on request, it passes the provided data JSON encoded to stdin. The environment variables
contain uri fragment, query parameters and headers. Returns the exit code and stdout output of the command.

## Response

```json
{
  "exitCode": 0,
  "output": "foobar"
}
```

## Dynamic variables

You can easily access dynamic variables from the environment variables. As example, you could create a CLI action using
the following command s.

```
echo $FOO
```

If you invoke this route with a `?foo=bar` parameter you should see as output:

```json
{
  "exitCode": 0,
  "output": "bar\n"
}
```

## Video

<iframe width="560" height="315" src="https://www.youtube.com/embed/eTYz5DKPuHU" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
