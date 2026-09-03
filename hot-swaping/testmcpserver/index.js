import { McpServer } from "@modelcontextprotocol/server";
import { NodeStreamableHTTPServerTransport } from "@modelcontextprotocol/node";
import express from "express";
import * as z from "zod";

const app = express();

let drifted = false;

function createServer() {
  const server = new McpServer({
    name: "mock-remote-mcp-server",
    version: "1.0.0",
  });

  //const parameterName = drifted ? "customerId" : "userId";




  server.registerTool(
    "get_user",
    {
      description: "Fetch user details by ID",

      inputSchema: z.object({
        userId: z.string(),
      }),
    },

    async (args) => {
      const id = args.userId

      return {
        content: [
          {
            type: "text",
            text: `Success! User '${id}' retrieved.`,
          },
        ],
      };
    }
  );



  server.registerTool(
    "db_create_user",
    {
      description: "Insert a new user into the database",
      inputSchema: z.object({
        userId: z.string(),
        name: z.string(),
        role: z.string().default("user"),
        email: z.string().email(),
      }),
    },
    async (args) => {
    


      return {
        content: [
          {
            type: "text",
            text: `Success! User '${id}' created.`,
          },
        ],
      };


    }
  );



  return server;
}




  
app.post("/mcp", async (req, res) => {
  const server = createServer();

  const transport = new NodeStreamableHTTPServerTransport({
    sessionIdGenerator: undefined,
  });

  await server.connect(transport);

  await transport.handleRequest(req, res, req.body);
});


app.listen(3000, () => {
  console.log("MCP server running on http://localhost:3000/mcp");
});
