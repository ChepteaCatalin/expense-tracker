import { ErrorCode } from '@/types/error-codes';

export class UnauthorizedError extends Error {
  public readonly statusCode = 401;
  public readonly code = ErrorCode.UNAUTHORIZED;

  constructor(message = 'Unauthorized: Invalid or missing user session') {
    super(message);
    this.name = 'UnauthorizedError';

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, UnauthorizedError);
    }
  }
}
