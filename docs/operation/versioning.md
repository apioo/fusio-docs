---
sidebar_position: 3
---

# Versioning

Once clients use your API, every change can break their integration. Fusio helps you to evolve your API
without breaking existing clients through a **stability** lifecycle for every operation.

## Stability lifecycle

Every operation goes through the following states:

```
Experimental → Stable → Deprecated → Legacy
```

| Stability        | Can be changed | Description                                                                          |
|------------------|----------------|--------------------------------------------------------------------------------------|
| **Experimental** | Yes            | The operation is in development, all changes are directly visible to clients         |
| **Stable**       | No             | The operation is in production and is frozen, so clients can rely on it               |
| **Deprecated**   | No             | The operation is still available, but clients should migrate to a replacement        |
| **Legacy**       | No             | The operation is no longer supported and should not be used anymore                  |

The current stability is returned at the `X-Stability` header of every response, so clients can detect i.e.
deprecated operations.

### Experimental

The initial state of every operation. All changes to the operation, its action and its schemas are directly
visible at the endpoint. Use this state while you develop and test an operation.

### Stable

Once the operation is used in production, mark it as stable. At the transition from `Experimental` to `Stable`
Fusio pins the current version of the action and schemas to the operation. This means later changes to the action
or schema are not visible at this operation, so you can not accidentally break clients. A stable operation can not
be changed or deleted, only its stability can be changed.

If you really need to change a stable operation, you can move it back to `Experimental`. Fusio then removes the
pinned versions, so the operation uses again the latest version of the action and schemas. Please be careful,
since this could break existing clients.

### Deprecated

If you plan to remove an operation, mark it as deprecated. The operation still works, but the generated SDK marks
the method as deprecated, so developers get a warning in their editor and know that they should migrate.

### Legacy

After a deprecation period you can mark the operation as legacy. This means the operation is no longer supported
and clients should not use it anymore.

## Path versioning

To introduce a breaking change, i.e. a new required field, create a new operation with a version in the path,
instead of changing the existing one:

| Operation          | Path              | Stability    |
|--------------------|-------------------|--------------|
| `v1.contract.get`  | `/v1/contracts`   | Deprecated   |
| `v2.contract.get`  | `/v2/contracts`   | Stable       |

Through this existing clients keep using `/v1/contracts`, while new clients use `/v2/contracts`. Once all clients
have migrated, you can mark the old operation as legacy.

## Semantic versioning with TypeHub

Path versioning works well for large breaking changes, but most changes of an API are small, i.e. a new optional
field or a new operation. Through the [TypeHub](https://typehub.cloud/) integration Fusio provides automatic
[semantic versioning](https://semver.org/) for your complete API, without the need to maintain versions manually.

### How it works

1. Fusio publishes the specification of your API to TypeHub
2. When you create a tag at the backend, Fusio also creates the tag at TypeHub
3. TypeHub determines the version of the tag automatically by comparing the specification with the previous one:
   a breaking change increases the major version, a new feature the minor version and a fix the patch version
4. Fusio stores the current state of all actions and schemas under this version

Through this every version of your API is clean and correct, since it is based on the actual changes of your
specification and not on a manual decision.

### Configuration

To use the integration, register an account at [TypeHub](https://typehub.cloud/) and create a document for your API.
Then provide the following settings at the backend under System / [Config](/docs/backend/system/config):

| Setting                 | Description                                         |
|-------------------------|-----------------------------------------------------|
| `typehub_client_id`     | The client id of your TypeHub account               |
| `typehub_client_secret` | The client secret of your TypeHub account           |
| `typehub_document_name` | The name of the TypeHub document of your API        |

### Request a specific version

A client can request a specific version of your API by sending the `Api-Version` header with a semantic version:

```http request
GET /contracts
Api-Version: 1.2.0
```

Fusio then executes the operation with the action and schemas of this version. Through this a client can pin your
API to a version which it was tested against, while you keep developing your API. If the header is missing, Fusio
uses the current version.

:::note
Versions apply to actions and schemas which you have created at the backend. Actions and schemas which reference a
PHP class are part of your source code, so they are versioned through your code repository.
:::

## Best practices

* Keep operations `Experimental` while you develop them and mark them `Stable` before you publish your API
* Avoid breaking changes on stable operations, add a new versioned operation instead
* Deprecate operations before you remove them and give clients enough time to migrate
* Use the description of a deprecated operation to tell clients which operation replaces it
