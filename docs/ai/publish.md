---
sidebar_position: 3
---

# Publish an agent

Besides helping you internally, you can provide your agents to your customers. This allows you to build AI products,
i.e. a support assistant which looks up the orders of a customer, or a domain specific assistant which uses your data.
Since your agent uses your operations as tools, you can build such a product on top of your existing API.

There are three ways to provide an agent to your customers:

| Option                                 | Description                                                                   |
|----------------------------------------|-------------------------------------------------------------------------------|
| [Developer portal](#developer-portal)  | Your customers chat with the agent at the developer portal, no code required  |
| [Consumer API](#consumer-api)          | You integrate the agent into your own app through the Consumer API           |
| [Agent-Call action](#agent-call-action) | You provide the agent as a regular operation of your API                     |

In all cases the customer must be authenticated, since every conversation is stored for a specific user.

## Make an agent public

To provide an agent through the developer portal or the Consumer API, enable the **Public** setting of the agent. Only
public agents are visible to your customers, the built-in agents are not public.

## Developer portal

The [developer portal](/docs/developer_portal) contains a chat for all public agents. After login, a customer can
select an agent at the account area and start a conversation. This is the fastest way to provide an agent, since you
don't need to build any frontend.

## Consumer API

If you want to integrate the agent into your own app, you can use the following endpoints of the
[Consumer API](https://www.fusio-project.org/api/consumer):

| Method | Path                                    | Description                                         |
|--------|-----------------------------------------|-----------------------------------------------------|
| `GET`  | `/consumer/agent`                       | Returns all public agents                           |
| `GET`  | `/consumer/agent/:agent_id`             | Returns the details of an agent                     |
| `GET`  | `/consumer/agent/:agent_id/message`     | Returns the messages of the user                    |
| `POST` | `/consumer/agent/:agent_id/message`     | Sends a new message to the agent                    |

To send a message, the client sends a `POST` request with an access token of the user:

```http request
POST /consumer/agent/1/message
Authorization: Bearer [token]
Content-Type: application/json

{
  "item": {
    "type": "text",
    "content": "how can I solve 8x + 7 = -23"
  }
}
```

The response contains the answer of the agent and the id of the conversation:

```json
{
  "id": "[conversation id]",
  "item": {
    "type": "text",
    "content": "Subtract 7 from both sides, then divide by 8: x = -15 / 4"
  }
}
```

To continue the conversation, pass the id of the conversation as `previousId` with the next message. The agent then
receives the previous messages as context:

```json
{
  "previousId": "[conversation id]",
  "item": {
    "type": "text",
    "content": "can you explain the second step?"
  }
}
```

## Agent-Call action

With the [Agent-Call](/docs/backend/api/action/agent-call) action you can provide an agent as a regular operation of
your API, i.e. `POST /assistant`. In contrast to the Consumer API, this gives you full control over the endpoint, i.e.
the path, the scopes and the documentation. If the agent has an [outgoing schema](./agent#outgoing), the operation
can directly return the structured output, so that your clients receive JSON in a defined format.

## Costs

Every message causes costs at your LLM provider. If you provide an agent to your customers, you can pass these costs on
through the [costs](./agent#costs) setting of the agent. Customers then pay points per token, which they can buy through
a plan, s. [Monetization](/docs/monetization).
