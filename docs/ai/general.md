---
sidebar_position: 4
---

# General Agent

The general agent answers questions about your Fusio instance. It has access to tools which read your operations,
actions, schemas, connections, events, cronjobs, triggers and logs, so it can explain your setup or help you to debug
a problem. For example you could ask:

> show me all available operations

The agent then calls the fitting internal tool to get all operations and summarizes the result:

![general_agent](/img/ai/general_agent.png)

## Example prompts

* "Which operations use the action `Contract-Create`?"
* "Show me the latest errors of the log and explain what went wrong"
* "Which cronjobs are configured and when are they executed?"
