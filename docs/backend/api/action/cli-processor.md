
# CLI Processor

The CLI processor executes a configured CLI command and returns the response.

Note in general you should try to avoid this action since it has a bad performance, but it can be useful i.e. for
legacy applications. Instead of invoking the CLI command a better option would be to expose a simple HTTP or FCGI API
which is then called by Fusio.

## Configuration

### Command

The command which gets executed. The complete payload is passed as stdin to the command.
Note also all uri fragments and query parameters are passed as environment variable to the command,
you can then use those env variables in your script but be aware that those values contain untrusted
user input.

### Content-Type

The Content-Type which is produced by your CLI command. Most times this is `text/plain` but
it can be also `application/json` or `application/octet-stream` for binary responses.
Binary responses are returned as base64 encoded string.

### Env

Contains additional environment variables which are passed to the command.

### Cwd

Optional a specific working directory.

### Timeout

Optional a timeout how long this command runs.

## Execution

On execution this action executes the configured command, it passes the provided data JSON encoded to stdin. The
environment variables contain uri fragment, query parameters and headers. Returns the exit code and stdout output of the
command.

### Dynamic variables

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

Keep in mind that inside your script you can not trust those env variables since they are untrusted
input provided by the user.

## Response

```json
{
  "exitCode": 0,
  "output": "foobar"
}
```
