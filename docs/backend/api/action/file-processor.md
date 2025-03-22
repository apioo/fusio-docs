
# File Processor

The file processor simply reads a specific static file and returns the content of
the file. This can be useful if you want to expose specific files or you want to
create a dummy api.

## Configuration

### File

Path to a file.

## Execution

Simples reads the content of the configured file and returns the response. The action
also sets the fitting `Last-Modified` and `ETag` headers.
