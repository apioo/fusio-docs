
# Integration Javascript

Fusio provides a [Javascript SDK](https://github.com/apioo/fusio-sdk-javascript) to easily integrate Fusio
into your existing Javascript application.

## Usage

The following example shows how you can get all registered routes at the backend.

```typescript
import Client from './../src/Client';

// @TODO set correct client credentials
let client = new Client(
    'https://demo.fusio-project.org',
    'test',
    'FRsNh1zKCXlB'
);

client.backend().getBackendRoutes().then(async (resource) => {
    let response = await resource.backendActionRouteGetAll();
    if (!response.data.entry) {
        return;
    }

    response.data.entry.map((entry) => {
        console.log(entry.path + "\n");
    });
})

```
