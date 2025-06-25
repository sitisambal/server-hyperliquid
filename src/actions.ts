import { PublicClient } from "@nktkas/hyperliquid";

import {
  candleSnapshotSchema,
  l2BookSchema,
  openOrdersSchema,
  userFillsSchema,
  userFillsByTimeSchema,
  orderStatusSchema,
  clearinghouseStateSchema,
} from "./schemas.js";

export async function getL2Book(
  hyperliquidClient: PublicClient,
  args: unknown
) {
  const validatedArgs = l2BookSchema.parse(args);

  const l2Book = await hyperliquidClient.l2Book(validatedArgs);
  return {
    content: [{ type: "text", text: JSON.stringify(l2Book) }],
    isError: false,
  };
}

export async function getAllMids(hyperliquidClient: PublicClient) {
  const allMids = await hyperliquidClient.allMids();
  return {
    content: [{ type: "text", text: JSON.stringify(allMids) }],
    isError: false,
  };
}

export async function getCandleSnapshot(
  hyperliquidClient: PublicClient,
  args: unknown
) {
  const validatedArgs = candleSnapshotSchema.parse(args);
  const candleSnapshot = await hyperliquidClient.candleSnapshot(validatedArgs);
  return {
    content: [{ type: "text", text: JSON.stringify(candleSnapshot) }],
    isError: false,
  };
}

export async function getOpenOrders(
  hyperliquidClient: PublicClient,
  args: unknown
) {
  const validatedArgs = openOrdersSchema.parse(args);
  const openOrders = await hyperliquidClient.openOrders(validatedArgs);
  return {
    content: [{ type: "text", text: JSON.stringify(openOrders) }],
    isError: false,
  };
}

export async function getUserFills(
  hyperliquidClient: PublicClient,
  args: unknown
) {
  const validatedArgs = userFillsSchema.parse(args);
  const fills = await hyperliquidClient.userFills(validatedArgs);
  return {
    content: [{ type: "text", text: JSON.stringify(fills) }],
    isError: false,
  };
}

export async function getUserFillsByTime(
  hyperliquidClient: PublicClient,
  args: unknown
) {
  const validatedArgs = userFillsByTimeSchema.parse(args);
  const fills = await hyperliquidClient.userFillsByTime(validatedArgs);
  return {
    content: [{ type: "text", text: JSON.stringify(fills) }],
    isError: false,
  };
}

export async function getOrderStatus(
  hyperliquidClient: PublicClient,
  args: unknown
) {
  const validatedArgs = orderStatusSchema.parse(args);
  const status = await hyperliquidClient.orderStatus(validatedArgs);
  return {
    content: [{ type: "text", text: JSON.stringify(status) }],
    isError: false,
  };
}

export async function getClearinghouseState(
  hyperliquidClient: PublicClient,
  args: unknown
) {
  const validatedArgs = clearinghouseStateSchema.parse(args);
  const state = await hyperliquidClient.clearinghouseState(validatedArgs);
  return {
    content: [{ type: "text", text: JSON.stringify(state) }],
    isError: false,
  };
}
