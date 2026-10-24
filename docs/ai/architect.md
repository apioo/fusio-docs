---
sidebar_position: 5
---

# Architect Agent

The architect agent builds complete API operations from a description of your use case. It only creates a high-level
blueprint of the operations and delegates the actual implementation of the actions, schemas and database tables to
the [action](./action), [schema](./schema) and [database](./database) agents. This increases the quality of the
result, since every agent can focus on a single task. For example, we could describe the following:

> Create a Twitter like app where users can publish messages, a user can follow other users and each user has a timeline where the messages of each followed user is shown

The agent then generates all operations which are needed to implement the use case and shows them as preview on the
right:

![architect_agent](/img/ai/architect_agent.png)

For every operation, the action, schema and database fields contain the prompts which are passed to the sub-agents.
You can adjust these prompts before you continue, and you can also select a different sub-agent, i.e. in case you have
created your own agent for one of these tasks.

When you click on "Execute", the agents create all database tables, schemas, actions and operations:

![architect_agent_execute](/img/ai/architect_agent_execute.png)

:::note
An LLM can make mistakes, see the result as a starting point to quickly build a first prototype of your API. Review
and test the generated operations before you use them in production.
:::
