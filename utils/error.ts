import { ErrorCode, PostgresErrorCode } from "@/types/error-codes";

export class UnauthorizedError extends Error {
  public readonly statusCode = 401;
  public readonly code = ErrorCode.UNAUTHORIZED;

  constructor(message = "Unauthorized: Invalid or missing user session") {
    super(message);
    this.name = "UnauthorizedError";

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, UnauthorizedError);
    }
  }
}

export function isUniqueViolationError(error: unknown): boolean {
  return (
    typeof error === "object" &&
    error !== null &&
    "code" in error &&
    error.code === PostgresErrorCode.UniqueViolation
  );
}

/** A business rule was broken; the message is safe to show to the user. */
export class RuleViolationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "RuleViolationError";
  }
}
