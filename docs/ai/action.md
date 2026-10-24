---
sidebar_position: 6
---

# Action Agent

The action agent develops the business logic of an [action](/docs/action). You describe what the action should do and
the agent generates the code. For example:

> Create an action which returns popular composers of the 19th century

For the action agent, Fusio provides a special view which shows the generated code in an editor on the right:

![action_agent](/img/ai/action_agent.png)

You can send further messages to improve or fix the generated code. When you click on "Execute", Fusio creates or
updates the action, executes it and directly shows the response of the action:

![action_agent_execute](/img/ai/action_agent_execute.png)

This gives you a fast feedback loop: describe, generate, execute and refine until the action does what you need.

## How it works

The agent has access to tools to inspect your connections, so it can i.e. discover the tables of your database and
write fitting SQL queries. Mention the connection and table in your message to get better results, i.e.:

> Create an action which returns all todo entries of the `app_todo` table of the `App` connection, ordered by the insert date
