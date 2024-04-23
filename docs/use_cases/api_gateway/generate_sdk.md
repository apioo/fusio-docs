
# Generate SDK

Fusio includes a great SDK generator which you can use to automatically
build a client SDK for your API. To generate the SDK you can go to
the backend and generate the fitting SDK s.

![sdk_overview](/img/use_cases/api_gateway/sdk_overview.png)

## Examples

Fusio internally also uses the same SDK generator to build the Fusio SDK.
You can take a look at each SDK to see how the generated code looks.

* C#
    * [Example](https://github.com/apioo/fusio-sample-csharp-cli)
    * [Fusio-SDK](https://github.com/apioo/fusio-sdk-csharp)
* Go
    * [Example](https://github.com/apioo/fusio-sample-go-cli)
    * [Fusio-SDK](https://github.com/apioo/fusio-sdk-go)
* Java
    * [Example](https://github.com/apioo/fusio-sample-java-cli)
    * [Fusio-SDK](https://github.com/apioo/fusio-sdk-java)
* Javascript
    * [Fusio-SDK](https://github.com/apioo/fusio-sdk-javascript)
* PHP
    * [Example](https://github.com/apioo/fusio-sample-php-cli)
    * [Fusio-SDK](https://github.com/apioo/fusio-sdk-php)
* Python
    * [Example](https://github.com/apioo/fusio-sample-python-cli)
    * [Fusio-SDK](https://github.com/apioo/fusio-sdk-python)

## SDKgen

Fusio has integrated support for [SDKgen](https://sdkgen.app/) which provides
additional SDK generators to support different SDK programming languages like
Java or C#. To add support for those additional languages you can easily register
at SDKgen and enter your app credentials to the `SDKGEN_CLIENT_ID` and
`SDKGEN_CLIENT_SECRET` at the `.env` file, then you automatically see those
additional generator options at the backend.
