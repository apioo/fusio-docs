---
sidebar_position: 3
---

# User

A user is either a `Consumer` of your API or an internal user which can
configure and develop your API. You can assign every user to a specific role,
which assigns specific scopes to the user. Those scopes give the user the rights
to access specific endpoints of your API. At the settings you can set the
default role which every user gets assigned if he registers i.e. at the
developer app.

## Configuration

![user_create](/img/backend/consumer/user_create.png)

### Status

The status of this user.

### Role

The role of the user. A user inherits all scopes of the configured role. A user which registers
through the consumer API automatically gets the configured `role_default` setting.

### Name

The name of the user.

### Email

The email of the user.

### Password

The password for this account.
