---
sidebar_position: 7
---

# Schema Agent

The schema agent designs a [schema](/docs/backend/api/schema) to describe a JSON payload, i.e. the request or response
of an operation. This is useful for a schema-first development, where you use the knowledge of the LLM to design the
data structures of your API. For example:

> Create a product schema with common properties

The agent generates a fitting schema and shows a preview on the right:

![schema_agent](/img/ai/schema_agent.png)

With the "Save" button you persist the schema, so that you can use it at any operation.

## Example prompts

* "Create a schema for an invoice with line items, a customer address and a total amount"
* "Add an optional `tags` property to the product schema"
* "Create a schema for a paginated collection of products"
