import { Tool } from "@modelcontextprotocol/sdk/types.js";

export const ALL_MIDS_TOOL: Tool = {
  name: "get_all_mids",
  description: "Get mid prices for all coins on Hyperliquid",
  inputSchema: {
    type: "object",
    properties: {},
    required: [],
  },
};

export const CANDLE_SNAPSHOT_TOOL: Tool = {
  name: "get_candle_snapshot",
  description: "Get candlestick data for a token on Hyperliquid",
  inputSchema: {
    type: "object",
    properties: {
      symbol: {
        type: "string",
        description: "The symbol of the token to get candlestick data for",
      },
      interval: {
        type: "string",
        description: "Time interval (e.g., '15m', '1h')",
      },
      startTime: {
        type: "number",
        description: "Start time in milliseconds since epoch",
      },
      endTime: {
        type: "number",
        description: "End time in milliseconds since epoch (optional)",
      },
    },
    required: ["symbol", "interval", "startTime"],
  },
};

export const L2_BOOK_TOOL: Tool = {
  name: "get_l2_book",
  description: "Get the L2 order book (depth) of a token on Hyperliquid",
  inputSchema: {
    type: "object",
    properties: {
      symbol: {
        type: "string",
        description: "The symbol of the token to get the order book for",
      },
      nSigFigs: {
        type: "number",
        description:
          "Optional: aggregate price levels to this number of significant figures (2-5)",
      },
      mantissa: {
        type: "number",
        description:
          "Optional: mantissa (2 or 5) for price levels if nSigFigs = 5",
      },
    },
    required: ["symbol"],
  },
};

export const OPEN_ORDERS_TOOL: Tool = {
  name: "get_open_orders",
  description: "Get all open orders for a given user on Hyperliquid",
  inputSchema: {
    type: "object",
    properties: {
      user: {
        type: "string",
        description: "The user's address (0x... hex) whose open orders to retrieve",
      },
    },
    required: ["user"],
  },
};

export const USER_FILLS_TOOL: Tool = {
  name: "get_user_fills",
  description: "Get recent trade fills (executed orders) for a given user on Hyperliquid",
  inputSchema: {
    type: "object",
    properties: {
      user: {
        type: "string",
        description: "The user's address (0x... hex) to fetch fills for",
      },
      aggregateByTime: {
        type: "boolean",
        description:
          "Optional: true to aggregate partial fills that occurred at the same time",
      },
    },
    required: ["user"],
  },
};

export const USER_FILLS_BY_TIME_TOOL: Tool = {
  name: "get_user_fills_by_time",
  description: "Get trade fills for a user within a time range on Hyperliquid",
  inputSchema: {
    type: "object",
    properties: {
      user: {
        type: "string",
        description: "The user's address (0x... hex) to fetch fills for",
      },
      startTime: {
        type: "number",
        description: "Start time (ms since epoch) for the query range (inclusive)",
      },
      endTime: {
        type: "number",
        description:
          "End time (ms since epoch) for the query range (optional, defaults to now)",
      },
      aggregateByTime: {
        type: "boolean",
        description:
          "Optional: true to aggregate partial fills that occurred at the same time",
      },
    },
    required: ["user", "startTime"],
  },
};

export const ORDER_STATUS_TOOL: Tool = {
  name: "get_order_status",
  description: "Check the status of an order by its ID on Hyperliquid",
  inputSchema: {
    type: "object",
    properties: {
      user: {
        type: "string",
        description: "The user's address (0x... hex) who placed the order",
      },
      oid: {
        type: ["string", "number"],
        description:
          "The order ID (as a number) or client order ID (as a 16-byte hex string)",
      },
    },
    required: ["user", "oid"],
  },
};

export const CLEARINGHOUSE_STATE_TOOL: Tool = {
  name: "get_clearinghouse_state",
  description:
    "Get the perpetual account state (margin and positions) for a given user on Hyperliquid",
  inputSchema: {
    type: "object",
    properties: {
      user: {
        type: "string",
        description: "The user's address (0x... hex) whose account state to retrieve",
      },
    },
    required: ["user"],
  },
};
