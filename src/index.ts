#!/usr/bin/env node

import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequest,
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";
import * as hl from "@nktkas/hyperliquid";

import {
  ALL_MIDS_TOOL,
  CANDLE_SNAPSHOT_TOOL,
  L2_BOOK_TOOL,
  OPEN_ORDERS_TOOL,
  USER_FILLS_TOOL,
  USER_FILLS_BY_TIME_TOOL,
  ORDER_STATUS_TOOL,
  CLEARINGHOUSE_STATE_TOOL,
} from "./tools.js";
import {
  getAllMids,
  getCandleSnapshot,
  getL2Book,
  getOpenOrders,
  getUserFills,
  getUserFillsByTime,
  getOrderStatus,
  getClearinghouseState,
} from "./actions.js";

async function main() {
  console.error("Starting Hyperliquid MCP server...");
  const server = new Server(
    {
      name: "hyperliquid",
      version: "0.0.1",
    },
    { capabilities: { tools: {} } }
  );

  console.error("Starting Hyperliquid client");
  const hyperliquidTransport = new hl.HttpTransport();
  const hyperliquidClient = new hl.PublicClient({ transport: hyperliquidTransport });

  server.setRequestHandler(
    CallToolRequestSchema,
    async (request: CallToolRequest) => {
      console.error("Received CallToolRequest:", request);
      try {
        const { name, arguments: args } = request.params;
        if (!args) {
          throw new Error("No arguments provided");
        }
        switch (name) {
          case "get_l2_book": {
            return await getL2Book(hyperliquidClient, args);
          }
          case "get_all_mids": {
            return await getAllMids(hyperliquidClient);
          }
          case "get_candle_snapshot": {
            return await getCandleSnapshot(hyperliquidClient, args);
          }
          case "get_open_orders": {
            return await getOpenOrders(hyperliquidClient, args);
          }
          case "get_user_fills": {
            return await getUserFills(hyperliquidClient, args);
          }
          case "get_user_fills_by_time": {
            return await getUserFillsByTime(hyperliquidClient, args);
          }
          case "get_order_status": {
            return await getOrderStatus(hyperliquidClient, args);
          }
          case "get_clearinghouse_state": {
            return await getClearinghouseState(hyperliquidClient, args);
          }
          default:
            return {
              content: [{ type: "text", text: `Unknown tool: ${name}` }],
              isError: true,
            };
        }
      } catch (error) {
        return {
          content: [
            {
              type: "text",
              text: `Error: ${error instanceof Error ? error.message : String(error)}`,
            },
          ],
          isError: true,
        };
      }
    }
  );

  server.setRequestHandler(ListToolsRequestSchema, async () => {
    console.error("Received ListToolsRequest");
    return {
      tools: [
        ALL_MIDS_TOOL,
        CANDLE_SNAPSHOT_TOOL,
        L2_BOOK_TOOL,
        OPEN_ORDERS_TOOL,
        USER_FILLS_TOOL,
        USER_FILLS_BY_TIME_TOOL,
        ORDER_STATUS_TOOL,
        CLEARINGHOUSE_STATE_TOOL,
      ],
    };
  });

  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("Hyperliquid MCP Server running on stdio");
}

main().catch((error) => {
  console.error("Fatal error in main():", error);
  process.exit(1);
});
