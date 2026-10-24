---
sidebar_position: 8
---

# Database Agent

The database agent designs tables for a relational database like PostgreSQL or MySQL. In the message you describe
which data you want to store, for example:

> Create a table to store todo entries

The agent generates the fitting tables, columns and foreign key relations and shows a preview on the right:

![database_agent](/img/ai/database_agent.png)

If the tables look good, click on "Execute" to create them at the selected connection.

## Example prompts

* "Create tables for a blog with posts, comments and tags"
* "Add a `due_date` column to the todo table"

:::tip
Use the [seed agent](./seed) afterwards to fill your new tables with test data.
:::
