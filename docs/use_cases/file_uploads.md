
# File Uploads

This chapter explains how to handle file uploads at an action. To handle file uploads your route must have as request
schema "Passthru" selected, this means that Fusio does not try to validate your request via a schema and simply passes
the data to your action.

![routes_file_upload](/img/use_cases/routes_file_upload.png)

If you upload a file PHP always moves the upload to a temp file, then you need to move this temp file to your target
directory. In the following a simple example which shows how to handle a file upload.

```php
<?php

$body = $request->getBody();

if (!$body instanceof \Fusio\Engine\Record\PassthruRecord) {
    // this means we have not set the body to Passthru
    throw new \PSX\Http\Exception\BadRequestException('Provided an invalid body');
}

$payload = $body->getPayload();
if (!$payload instanceof \PSX\Data\Multipart\Body) {
    // this means our request is not a multipart request
    throw new \PSX\Http\Exception\BadRequestException('Provided no multipart body');
}

// we can now move the file to our target location, in this case we use simply the Fusio cache folder
$payload->getFile('my_file')->moveTo(PSX_PATH_CACHE . '/my_file.tmp');

// we can also access other values from the request
$bar = $payload->getPart('foo');

return $response->build(200, [], [
    'success' => true,
    'foo' => $bar,
]);

```

If we add a route for this action and use a rest client to send a `multipart/form-data` request to the endpoint.

![upload_file_request.png](/img/use_cases/upload_file_request.png.png)

Then we would get the following response.

```json
{
  "success": true,
  "foo": "bar"
}
```

Now we should see the file `my_file.tmp` at the `cache/` directory of Fusio with the content which you have send to
the endpoint.
