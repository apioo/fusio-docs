---
sidebar_position: 2
---

# Invoke a private operation

By default every operation is private, unless you explicitly mark it as public. To call a private operation a client
needs an access token which contains a scope of the operation. This page explains the complete flow, from assigning
scopes to calling the operation.

## How access works

Access to private operations is controlled through three entities:

* **Operation**: Each operation has a list of [scopes](/docs/backend/consumer/scope), i.e. `contract`
* **Role**: Each user has a [role](/docs/backend/system/role) which defines the scopes the user can obtain
* **Access token**: When a user obtains an access token, it contains the scopes of the user

When a client calls a private operation, Fusio checks whether the access token is valid and whether it contains one
of the scopes of the operation. Otherwise, Fusio returns `401 Unauthorized`.

## Step 1: Assign scopes to the user

First make sure that the user has the scopes which are needed to call the operation. The scopes of a user depend on
the role of the user. When you create or edit a role at the backend under System / Role, you can select the scopes
of the role:

![role_create](/img/use_cases/spa_backend/role_create.png)

At the system settings you can also configure a default role through the `role_default` setting. This role is assigned
to every new user which registers i.e. through the developer portal, by default this is the `Consumer` role.

## Step 2: Obtain an access token

There are several ways for a client to obtain an access token.

### Login

The simplest way is to send the username and password of the user to the `/consumer/login` endpoint:

```http request
POST /consumer/login
Content-Type: application/json

{
  "username": "[username]",
  "password": "[password]"
}
```

The response contains the access token:

```json
{
  "token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9..."
}
```

### OAuth2

For apps and server-to-server integrations we recommend to use the [OAuth2](https://datatracker.ietf.org/doc/html/rfc6749)
endpoint at `/authorization/token`, i.e. with the `client_credentials` flow and the key and secret of an
[app](/docs/backend/consumer/app). Take a look at the [Authorization](/docs/security/authorization) page for all
supported flows.

### Personal access token

For testing or small scripts, a user can also create a [personal access token](/docs/security/personal_access_token)
at the backend or developer portal.

## Step 3: Call the operation

Now the client can call the private operation. It only needs to add the access token as `Bearer` token to the
`Authorization` header of the request:

```http request
POST /contracts
Authorization: Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9...
Content-Type: application/json

{
  "title": "lorem ipsum"
}
```

Or through `curl`:

```
curl -X POST https://api.acme.com/contracts \
  -H "Authorization: Bearer [token]" \
  -H "Content-Type: application/json" \
  -d '{"title": "lorem ipsum"}'
```

## Troubleshooting

If you receive a `401 Unauthorized` response, please check the following points:

* The `Authorization` header has the format `Bearer [token]`
* The access token is not expired, otherwise obtain a new one, i.e. through the refresh token
* The role of the user contains a scope of the operation
* If you use Apache, the `Authorization` header is passed to PHP, s. [Apache](/docs/installation/apache)

## Video

<iframe width="560" height="315" src="https://www.youtube.com/embed/DkZAB9FHack" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
