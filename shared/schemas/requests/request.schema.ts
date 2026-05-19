import { z } from "zod";
import { REQUESTS_STATUSES } from "~~/shared/constants/requestStatuses";

export const requestStatusSchema = z.enum(REQUESTS_STATUSES);

export const purchaseRequestSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string().nullable(),
  vendorName: z.string().nullable(),
  amountCents: z.number().int().nonnegative(),
  currency: z.string().length(3),
  status: requestStatusSchema,
  createdAt: z.string(),
  updatedAt: z.string(),
});

export const createPurchaseRequestSchema = z.object({
  title: z.string().min(1),
  description: z.string().optional(),
  vendorName: z.string().optional(),
  amountCents: z.number().int().nonnegative(),
  currency: z.string().length(3).default("USD"),
});

export type PurchaseRequestSchema = z.infer<typeof purchaseRequestSchema>;

export type CreatePurchaseRequestInput = z.infer<
  typeof createPurchaseRequestSchema
>;
