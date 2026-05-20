export type ApiErrorCode =
  | 'BAD_REQUEST'
  | 'UNAUTHORIZED'
  | 'FORBIDDEN'
  | 'NOT_FOUND'
  | 'INTERNAL_ERROR';

export function createApiError(
  statusCode: number,
  statusMessage: string,
  code: ApiErrorCode = 'INTERNAL_ERROR',
) {
  return createError({
    statusCode,
    statusMessage,
    data: {
      code,
    },
  });
}
