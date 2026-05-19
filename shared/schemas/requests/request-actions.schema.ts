import { z } from "zod";

export const requestActionCommentSchema = z.object({
  comment: z.string().trim().min(1).max(2000),
});

export const approveRequestSchema = requestActionCommentSchema.partial();

export const rejectRequestSchema = requestActionCommentSchema;

export const requestChangesSchema = requestActionCommentSchema;

export type ApproveRequestInput = z.infer<typeof approveRequestSchema>;

export type RejectRequestInput = z.infer<typeof rejectRequestSchema>;

export type RequestChangeInput = z.infer<typeof requestChangesSchema>;
