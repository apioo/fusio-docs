---
sidebar_position: 6
---

# SDK

At the SDK page you can automatically generate an SDK or models for your API. To start the generator you can simply
login to the backend and go to the Consumer / SDK panel. There you can click on the generate button, this generates the
SDK and writes it to the `public/` folder, after this you can download the generated SDK.

![sdk_download](/img/backend/consumer/sdk_download.png)

## CLI

Besides the backend you can also generate the SDK through the following CLI command.

```
php bin/fusio generate:sdk --filter=frontend
```

### Filter

The filter argument specifies which operations are included at the SDK.


#### `app`

The app filter only includes the operations which you have created at the backend, it does not contain any
Fusio specific operations.

#### `frontend`

The frontend filter contains all operations which you have created at the backend and all consumer operations.
This is needed if you want to integrate the developer portal into your app.

#### `fusio`

The fusio filter contains all Fusio internal backend and consumer operations.

## TypeHub

If you like to create an infrastructure where you automatically update all your client
SDKs if your API changes you can use our [TypeHub](https://typehub.cloud/) platform. The
TypeHub platform is a central place to host your API specification which then can also trigger
other repos to generate SDKs

![typehub_overview](/img/backend/consumer/typehub_overview.png)

### Publish

The first step would be to create an GitHub action `typehub.yml` at your Fusio repository to
automatically publish the specification of your Fusio instance to TypeHub s.

```yaml
name: TypeHub
on:
  push:
    branches:
      - master
jobs:
  typehub:
    name: TypeHub
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v2
      - name: Install PHP
        uses: shivammathur/setup-php@v2
        with:
          php-version: 8.2
          coverage: none
      - name: Setup MySQL
        run: |
          sudo /etc/init.d/mysql start
          mysql -e "CREATE DATABASE fusio;" -uroot -proot
          mysql -e "ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'test1234';" -uroot -proot
      - name: Composer install
        run: composer install --no-interaction --no-ansi --no-progress
      - name: Setup Fusio
        env:
          APP_CONNECTION: 'pdo-mysql://root:test1234@localhost/fusio'
        run: |
          php bin/fusio migrate --no-interaction
          php bin/fusio api:push sdk --client_id="${{ secrets.TYPEHUB_CLIENT_ID }}" --client_secret="${{ secrets.TYPEHUB_CLIENT_SECRET }}" --filter=app
```

You can also take a look at our [GitHub workflow](https://github.com/apioo/fusio-impl/blob/master/.github/workflows/typehub.yml)
which we use internally to publish the [Fusio SDK](https://app.typehub.cloud/d/fusio/sdk).

### Trigger

The next step is to configure a trigger at your TypeHub document to call a specific
GitHub action at your concrete SDK repository. I.e. for the Fusio SDK we have configured
the following trigger for each supported language.

![typehub_trigger](/img/backend/consumer/typehub_trigger.png)

### Generate

The last step is to create an SDK repository for the language which you like to support
and add a fitting `sdkgen.yml` workflow. For a javascript SDK the workflow would look like:

```
name: SDKgen
on:
  workflow_dispatch:
    inputs:
      typehub_message:
        description: "The TypeHub commit message on commit"
        required: false
      typehub_version:
        description: "The TypeHub version on tag"
        required: false
      typehub_changelog:
        description: "The TypeHub changelog on tag"
        required: false
permissions:
  contents: 'write'
jobs:
  generate:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: apioo/sdkgen-generator-action@v0.2.1
        with:
          client_id: '${{ secrets.SDKGEN_CLIENT_ID }}'
          client_secret: '${{ secrets.SDKGEN_CLIENT_SECRET }}'
          typehub_message: '${{ inputs.typehub_message }}'
          typehub_version: '${{ inputs.typehub_version }}'
          typehub_changelog: '${{ inputs.typehub_changelog }}'
  publish:
    if: "${{ inputs.typehub_version != '' }}"
    needs: generate
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '16.x'
          registry-url: 'https://registry.npmjs.org'
      - run: npm version ${{ inputs.typehub_version }} --no-git-tag-version
      - run: npm install
      - run: npm run build
      - run: npm publish --access public
        env:
          NODE_AUTH_TOKEN: ${{ secrets.NPM_TOKEN }}
```

Every Fusio SDK contains such a workflow and if we create a tag on the TypeHub platform
we automatically update and tag every SDK, which makes the handling of multiple SDKs
really easy.

## SDKgen

Fusio has integrated support for [SDKgen](https://sdkgen.app/) which provides
additional SDK generators to support different SDK programming languages like
Java or C#. To add support for those additional languages you can easily register
at SDKgen and enter your app credentials to the `SDKGEN_CLIENT_ID` and
`SDKGEN_CLIENT_SECRET` at the `.env` file, then you automatically see those
additional generator options at the backend.
