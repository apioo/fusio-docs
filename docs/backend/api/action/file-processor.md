
# File Processor

The file processor simply reads a specific static file and returns the content of
the file. This can be useful if you want to expose specific files or you want to
create a dummy api.

## Configuration

![file_processor](/img/backend/api/action/file_processor.png)

### File

Path to a file.

## Execution

Simples reads the content of the configured file and returns the response. The action
also sets the fitting `Last-Modified` and `ETag` headers.

## Video

<iframe width="560" height="315" src="https://www.youtube.com/embed/q1iJPeuVRUk" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
