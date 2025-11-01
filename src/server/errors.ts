export type AnalysisErrorCode =
  | "INVALID_URL"
  | "FETCH_TIMEOUT"
  | "FETCH_FAILURE"
  | "UNKNOWN_ERROR";

export const UNKNOWN_ERROR_MESSAGE =
  "An unexpected error occurred. Please try again later.";

export class HttpError extends Error {
  constructor(
    public readonly status: number,
    public readonly code: AnalysisErrorCode,
    message: string,
    options?: ErrorOptions,
  ) {
    super(message, options);
    this.name = "HttpError";
  }
}

export function invalidUrlError(message: string, options?: ErrorOptions) {
  return new HttpError(400, "INVALID_URL", message, options);
}

export function fetchTimeoutError(timeoutMs: number, options?: ErrorOptions) {
  const seconds = timeoutMs / 1000;
  const displaySeconds = Number.isInteger(seconds)
    ? seconds.toString()
    : seconds.toFixed(1);

  return new HttpError(
    504,
    "FETCH_TIMEOUT",
    `The target site did not respond within ${displaySeconds} seconds. Please try again later.`,
    options,
  );
}

export function fetchFailureError(options?: ErrorOptions) {
  return new HttpError(
    502,
    "FETCH_FAILURE",
    "We could not reach the target site. Check the URL and try again.",
    options,
  );
}

export function toErrorResponse(error: unknown) {
  if (error instanceof HttpError) {
    return {
      status: error.status,
      body: {
        code: error.code,
        message: error.message,
      },
    };
  }

  return {
    status: 500,
    body: {
      code: "UNKNOWN_ERROR" as const,
      message: UNKNOWN_ERROR_MESSAGE,
    },
  };
}
