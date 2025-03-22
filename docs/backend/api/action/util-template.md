
# Util Template

Returns a response using Twig as template engine, this can be especially useful to build HTML
or XML responses.

## Configuration

### Context

Optional an action if you want to include dynamic data at your template. The action uses the
response of this action as content which you can use in your template.

### Content-Type

The Content-Type which should be used i.e. `text/html` or `application/xml`.

### Template

The [Twig](https://twig.symfony.com/) template.

## Execution

This action executes the configured "context" action if available and then renders the
provided template using Twig as template engine.
