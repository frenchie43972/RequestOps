export const REQUESTS_STATUSES = [
  "draft",
  "submitted",
  "changes_requested",
  "approved",
  "rejected",
] as const;

export const REQUEST_STATUS_LABELS: Record<RequestStatus, string> = {
  draft: "Draft",
  submitted: "Submitted",
  changes_requested: "Changes Requested",
  approved: "Approved",
  rejected: "Rejected",
};

export type RequestStatus = (typeof REQUESTS_STATUSES)[number];
