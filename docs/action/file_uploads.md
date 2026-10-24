---
sidebar_position: 7
---

# File uploads

This page explains how to build an endpoint which accepts file uploads, i.e. to upload an image or a document.

## Step 1: Configure the operation

By default, Fusio expects a JSON request body and validates it against the incoming schema of the operation. For a
file upload, the client sends a `multipart/form-data` request instead. At the [operation](/docs/operation/configuration#incoming)
select as incoming the source **Content-Type** with the value `multipart/form-data`.

Fusio then does not validate the body against a schema, but passes the uploaded files and form fields to your action.

## Step 2: Handle the upload at the action

The uploaded file is stored by PHP in a temporary file, your action needs to move this file to the target location.
The following example uses the [PHP-Sandbox](/docs/backend/api/action/php-sandbox) action, the same code also works in
a [custom action](/docs/development/custom_action) class:

```php
<?php

$payload = $request->getPayload();
if (!$payload instanceof \PSX\Data\Multipart\Body) {
    return $response->badRequest('Provided no multipart body');
}

if (!$payload->isFile('my_file')) {
    return $response->badRequest('Provided no file');
}

$file = $payload->getFile('my_file');

// move the uploaded file to the target location
$file->moveTo('/var/www/uploads/' . basename($file->getName()));

// other form fields are also available
$description = $payload->getPart('description');

return $response->created([
    'success' => true,
    'name' => $file->getName(),
    'size' => $file->getSize(),
    'description' => $description,
]);
```

The uploaded file provides the following methods:

| Method           | Description                                      |
|------------------|--------------------------------------------------|
| `getName()`      | The original file name of the client             |
| `getType()`      | The content type which the client has provided   |
| `getSize()`      | The size of the file in bytes                    |
| `moveTo($path)`  | Moves the uploaded file to the target location   |

:::warning
Never trust the file name and content type of the client. Validate the file, i.e. the size and type, and generate
your own file name before you store a file on your server.
:::

## Step 3: Upload a file

Now a client can upload a file through a `multipart/form-data` request, i.e. through `curl`:

```
curl -X POST https://api.acme.com/upload \
  -H "Authorization: Bearer [token]" \
  -F "my_file=@./document.pdf" \
  -F "description=My document"
```

![upload_file_request.png](/img/use_cases/api_framework/upload_file_request.png)
