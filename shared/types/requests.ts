import type { RequestStatus } from "../constants/requestStatuses";
import type {
  CreatePurchaseRequestInput,
  PurchaseRequestSchema,
} from "../schemas/requests/request.schema";

export type PurchaseRequest = PurchaseRequestSchema;

export type NewPurchaseRequest = CreatePurchaseRequestInput;

export type PurchaseRequestListItem = Pick<
  PurchaseRequest,
  | "id"
  | "title"
  | "vendorName"
  | "amountCents"
  | "currency"
  | "status"
  | "createdAt"
>;

export type PurchaseRequestStatus = RequestStatus;
