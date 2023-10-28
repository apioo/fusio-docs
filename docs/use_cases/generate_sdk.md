
# Generate SDK

Fusio contains an advanced SDK generator. You can automatically generate an SDK
at the backend s.

![sdk_download](/img/backend/consumer/sdk_download.png)

Besides this it is also possible to generate the SDK through the following
command:

```
php bin/fusio generate:sdk
```

The command writes the SDK to the `output/` folder.

## SDKgen

Fusio has integrated support for [SDKgen](https://sdkgen.app/) which provides 
additional SDK generators to support different SDK programming languages like
Java or C#. To add support for those additional languages you can easily register
at SDKgen and enter your app credentials to the `SDKGEN_CLIENT_ID` and
`SDKGEN_CLIENT_SECRET` at the `.env` file, then you automatically see those
additional generator options at the backend.
