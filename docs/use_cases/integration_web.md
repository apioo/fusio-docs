
# Integration Web

To integrate the Fusio API into a web app or if you want to develop an app for our marketplace you can take a look at
our [fusio-sdk](https://www.npmjs.com/package/fusio-sdk) NPM package. To get i.e. all routes from your Fusio instance
you could use the following code:

```javascript
import Client from './../src/Client';

// @TODO set correct client credentials
let client = new Client(
    'http://api.fusio.cloud:8080',
    'test',
    'test1234'
);

client.backend().then(async (backend) => {
    let response = await backend.getBackendRoutes().backendActionRouteGetAll();
    if (!response.data.entry) {
        return;
    }

    response.data.entry.map((entry) => {
        console.log(entry.path + "\n");
    });
})
```


