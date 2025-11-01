import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { analyzeWebsite } from "../analysis/accessibility";
import { HttpError } from "../analysis/errors";

const fetchMock = vi.fn();

describe("analyzeWebsite error handling", () => {
  beforeEach(() => {
    fetchMock.mockReset();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("aborts requests that exceed the timeout", async () => {
    vi.useFakeTimers();

    fetchMock.mockImplementation((_: unknown, options: { signal?: AbortSignal }) => {
      return new Promise((_resolve, reject) => {
        options?.signal?.addEventListener("abort", () => {
          const abortError = new DOMException("Request aborted", "AbortError");
          reject(abortError);
        });
      });
    });

    const analysisPromise = analyzeWebsite("https://example.com", {
      timeoutMs: 50,
      fetchImpl: fetchMock as unknown as typeof fetch,
    });

    await vi.advanceTimersByTimeAsync(50);

    await expect(analysisPromise).rejects.toMatchObject<HttpError>({
      code: "FETCH_TIMEOUT",
      status: 504,
    });
  });

  it("maps upstream failures to FETCH_FAILURE", async () => {
    fetchMock.mockRejectedValue(new TypeError("network error"));

    await expect(
      analyzeWebsite("https://example.com", {
        fetchImpl: fetchMock as unknown as typeof fetch,
      }),
    )
      .rejects.toMatchObject<HttpError>({
        code: "FETCH_FAILURE",
        status: 502,
      });
  });
});
