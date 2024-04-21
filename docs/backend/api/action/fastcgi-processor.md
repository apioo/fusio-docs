
# FCGI Processor

Invokes the configured script of a FastCGI server.

## Configuration

![fastcgi_processor](/img/backend/api/action/fastcgi_processor.png)

### Host

The FastCGI host.

### Port

The FastCGI port.

### Script

The FastCGI script filename.

## Execution

Invokes the configured FastCGI script. Passes the payload JSON encoded to the script
and returns the response, the server should respond with an `application/json` body.
