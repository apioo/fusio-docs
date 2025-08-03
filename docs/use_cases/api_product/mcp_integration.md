
# MCP Integration

Fusio provides a [Model-Context-Protocol](https://modelcontextprotocol.io/) server
which helps to interact with Fusio through an LLM. This can be used to develop
and configure your API through the internal Fusio API, and it is also possible
to expose your API, which you have built with Fusio through MCP.

## Transport

### STDIO

To use the STDIO transport, you can run the following command:

```
php bin/fusio mcp
```

By default, every operation is exposed, you can provide a user id as an argument 
to expose only specific tools.

```
php bin/fusio mcp [user_id]
```

### HTTP

The HTTP transport is by default disabled. To activate it you need to set
the `fusio_mcp` configuration to `true`. Note the HTTP transport is currently
experimental, use it with caution.

## VSCode

In the following, we show how you can integrate the MCP server with VSCode.
To start, you need to add a new MCP server through the `MCP: Add Server command` command,
you can run the command with `CTRL + SHIFT + P`. Then select `Command (stdio)` and
enter as command `php [path_to_fusio]/bin/fusio mcp` you need to replace the
`path_to_fusio` with the actual path on your filesystem.

Then you can start the chat window and change your chat mode to "Agent" mode s.

![mcp_agent_mode](/img/use_cases/api_product/mcp_agent_mode.png)

Then you need to deselect some tools since VSCode can currently handle only 128 tools
and the Fusio MCP server provides all operations of Fusio s.

![mcp_tools](/img/use_cases/api_product/mcp_tools.png)

Now you are ready to use the Fusio MCP server, you can start to chat i.e.
you can ask to show all available operations that should trigger the `backend-operation-getAll`
tool.

![mcp_chat](/img/use_cases/api_product/mcp_chat.png)

Through this you are now able to interact with your Fusio instance through
natural language.

## Conclusion

The VSCode MCP integration is only an example, and you should be able to use the
MCP server also with other tools. 

The LLM space is currently fast moving, and we will continue to look for elegant ways
how Fusio can interact with LLMs. This has the potential to open up Fusio to a complete
new audience which can interact with Fusio through natural language.
