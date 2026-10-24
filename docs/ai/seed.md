---
sidebar_position: 9
---

# Seed Agent

The seed agent fills your database tables with data. This is useful i.e. to create realistic test data for development
or a demo, or to populate a table with factual data from the knowledge of the LLM. In the message you describe which
data you need, for example:

> Create 10 demo todo entries

or

> Add all countries of the European Union to the country table

The agent first inspects your database to find the tables and columns, and then generates rows which match the
structure of your tables. Foreign keys are filled with valid references, auto increment columns are skipped.

For requests like "demo" or "test" data the agent generates realistic fictional data, for all other requests it tries
to provide factually correct data. Review the generated data before you insert it, especially if you use it in
production.

:::tip
Combine the seed agent with the [database agent](./database): first let the database agent create your tables and then
let the seed agent fill them with test data.
:::
