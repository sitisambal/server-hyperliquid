import { z } from "zod";

export const candleSnapshotSchema = z
  .object({
    symbol: z.string({ required_error: "Symbol must be a string" }),
    interval: z.string({ required_error: "Interval must be a string" }),
    startTime: z.number({ required_error: "Start time must be a number" }),
    endTime: z.number().nullable().optional(),
  })
  .strict()
  .transform((data) => ({
    coin: data.symbol,
    interval: data.interval,
    startTime: data.startTime,
    endTime: data.endTime,
  }));

export const l2BookSchema = z
  .object({
    symbol: z.string(),
    nSigFigs: z
      .union([z.literal(2), z.literal(3), z.literal(4), z.literal(5), z.null()])
      .optional(),
    mantissa: z.union([z.literal(2), z.literal(5), z.null()]).optional(),
  })
  .strict()
  .transform((data) => ({
    coin: data.symbol,
    nSigFigs: data.nSigFigs,
    mantissa: data.mantissa,
  }));
