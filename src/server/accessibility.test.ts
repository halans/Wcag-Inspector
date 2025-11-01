import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { analyzeWebsite } from "./accessibility";
import { HttpError } from "./errors";
import { FetchError } from "node-fetch";

const fetchMock = vi.fn();

vi.mock("node-fetch", () => {
  const fetchFn = (...args: unknown[]) => fetchMock(...args);

  class MockFetchError extends Error {
    constructor(message: string, public readonly type?: string) {
      super(message);
      this.name = "FetchError";
    }
  }

  return {
    default: fetchFn,
    FetchError: MockFetchError,
  };
});

describe("analyzeWebsite error handling", () => {
  beforeEach(() => {
    fetchMock.mockReset();
  });

  afterEach(() => {
    vi.useRealTimers();
    delete process.env.ANALYSIS_FETCH_TIMEOUT_MS;
  });

  it("aborts requests that exceed the timeout", async () => {
    process.env.ANALYSIS_FETCH_TIMEOUT_MS = "50";
    vi.useFakeTimers();

    fetchMock.mockImplementation((_: unknown, options: { signal?: AbortSignal }) => {
      return new Promise((_resolve, reject) => {
        options?.signal?.addEventListener("abort", () => {
          const abortError = new Error("Request aborted");
          abortError.name = "AbortError";
          reject(abortError);
        });
      });
    });

    const analysisPromise = analyzeWebsite("https://example.com");

    await vi.advanceTimersByTimeAsync(50);

    await expect(analysisPromise).rejects.toMatchObject<HttpError>({
      code: "FETCH_TIMEOUT",
      status: 504,
    });
  });

  it("maps upstream failures to FETCH_FAILURE", async () => {
    fetchMock.mockRejectedValue(new FetchError("network error", "system"));

    await expect(analyzeWebsite("https://example.com"))
      .rejects.toMatchObject<HttpError>({
        code: "FETCH_FAILURE",
        status: 502,
      });
  });
});
