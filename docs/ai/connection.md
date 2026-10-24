---
sidebar_position: 1
---

# Connection

Before you can use an agent, you need a connection to an LLM provider. The connection contains the provider, the
model and the credentials. Internally, Fusio uses the [Symfony AI](https://github.com/symfony/ai) platform bridges to
communicate with the provider.

## Supported providers

| Provider      | Description                                                                       | Credentials           |
|---------------|-----------------------------------------------------------------------------------|-----------------------|
| **ChatGPT**   | The models of [OpenAI](https://platform.openai.com/)                              | API key               |
| **Anthropic** | The Claude models of [Anthropic](https://www.anthropic.com/api)                   | API key               |
| **Gemini**    | The models of [Google Gemini](https://ai.google.dev/)                             | API key               |
| **Ollama**    | Self-hosted open source models through [Ollama](https://ollama.com/)               | URL of your Ollama host |

With Ollama you can run an LLM on your own infrastructure, so that no data leaves your servers.

## Create a connection

Go to API / Connection, click on create and select the `Agent` connection class. Then fill in the following fields:

| Field       | Description                                                                                   |
|-------------|-----------------------------------------------------------------------------------------------|
| **Name**    | The name of the connection, i.e. `OpenAI`                                                     |
| **Type**    | The provider: ChatGPT, Anthropic, Gemini or Ollama                                            |
| **Model**   | The name of the model of the provider, please take a look at the documentation of your provider for available models |
| **API-Key** | The API key of your provider account                                                          |
| **Url**     | Only for Ollama, the URL of your Ollama host, i.e. `http://localhost:11434`                   |

When you save the connection, Fusio sends a short test message to the LLM to check whether the connection works.

:::tip
When you create your first agent connection, Fusio automatically assigns it to the built-in agents, so you can start
using them directly.
:::

## Choosing a model

The model has a big influence on the quality, speed and costs of your agents:

* For the built-in agents which generate code, schemas or database tables, use a capable model which supports tool
  calling, since these agents call many tools to inspect your Fusio instance
* For agents which return [structured output](./agent#outgoing), make sure the model supports structured output,
  otherwise the response might not match your schema
* For simple agents, i.e. a FAQ assistant, a smaller and faster model is often sufficient and reduces your costs

You can create multiple connections, i.e. one per model, and select the fitting connection at each agent.

## Usage in actions

An agent connection can also be used inside an action. In this case the connection returns a
`Symfony\AI\Agent\AgentInterface` instance, s. [Agent connection](/docs/backend/api/connection/agent).
