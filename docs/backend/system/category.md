---
sidebar_position: 1
---

# Category

Fusio has the concept of a category. A category is basically only a string which allows you to split your API into
different categories. If we take a look at a default installation we see the following categories:

![category_list](/img/backend/system/category_list.png)

Every user role at the system is also assigned to such a category. At the backend a user then only sees the resources
which are assigned to this category. This means you could i.e. create a category "shop" and developers assigned to this
category basically have its own workspace and don't see other resources. Through this you can basically create different
areas where multiple developers can build different parts of an API.

The internal API of Fusio is also build with Fusio. If you login with a user which is assigned to the backend category
you can see and manage all internal endpoints also through the backend app.
