---
sidebar_position: 6
---

# SDK

At the SDK page you can automatically generate an SDK or models for your API. To start the generator you can simply
click on the generate button this generates the SDK and writes it to the `public/` folder, after this you can download
the generated SDK.

![sdk_download](/img/backend/consumer/sdk_download.png)

## SDKgen

Fusio has integrated support for [SDKgen](https://sdkgen.app/) which provides
additional SDK generators to support different SDK programming languages like
Java or C#. To add support for those additional languages you can easily register
at SDKgen and enter your app credentials to the `SDKGEN_CLIENT_ID` and
`SDKGEN_CLIENT_SECRET` at the `.env` file, then you automatically see those
additional generator options at the backend.
