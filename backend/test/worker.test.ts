import { beforeEach, describe, expect, it, vi } from "vitest";
import type { AnalysisResponse } from "@shared";

const { analyzeWebsite } = vi.hoisted(() => ({
  analyzeWebsite: vi.fn(),
}));

vi.mock("@shared", async () => {
  const actual = await vi.importActual<typeof import("@shared")>("@shared");
  return {
    ...actual,
    analyzeWebsite,
  };
});

const workerModule = await import("../src/worker");
const worker = workerModule.default;
const { HttpError } = await import("@shared/analysis/errors");

type WorkerEnv = {
  ANALYSIS_FETCH_TIMEOUT_MS?: string;
  CORS_ALLOWED_ORIGIN?: string;
};

function createExecutionContext(): ExecutionContext {
  return {
    waitUntil: () => undefined,
    passThroughOnException: () => undefined,
  } as ExecutionContext;
}

function createEnv(overrides: Partial<WorkerEnv> = {}): WorkerEnv {
  return {
    ANALYSIS_FETCH_TIMEOUT_MS: "10000",
    ...overrides,
  };
}

async function invokeWorker(
  input: string,
  init: RequestInit,
  envOverrides: Partial<WorkerEnv> = {},
) {
  const request = new Request(input, init);
  const env = createEnv(envOverrides);
  const ctx = createExecutionContext();
  const response = await worker.fetch(request, env, ctx);
  return response;
}

beforeEach(() => {
  analyzeWebsite.mockReset();
});

describe("worker analyze endpoint", () => {
  const sampleResponse: AnalysisResponse = {
    url: "https://example.com",
    timestamp: new Date().toISOString(),
    overallScore: 90,
    passedCriteria: 24,
    totalCriteria: 27,
    summary: "Sample summary",
    tags: [
      { name: "Color Contrast", isPassed: true },
      { name: "Focus", isPassed: false },
    ],
    results: [],
  };

  it("returns analysis payload for valid POST", async () => {
    analyzeWebsite.mockResolvedValueOnce(sampleResponse);

    const response = await invokeWorker(
      "https://worker.test/api/analyze",
      {
        method: "POST",
        body: JSON.stringify({ url: "https://example.com" }),
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

    expect(response.status).toBe(200);
    const data = await response.json();
    expect(data).toEqual(sampleResponse);
  });

  it("returns 400 for invalid payload", async () => {
    const response = await invokeWorker(
      "https://worker.test/api/analyze",
      {
        method: "POST",
        body: JSON.stringify({ url: "not a real url" }),
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

    expect(response.status).toBe(400);
    const data = await response.json();
    expect(data.code).toBe("INVALID_URL");
  });

  it("handles HttpError from analyzer", async () => {
    analyzeWebsite.mockRejectedValueOnce(
      new HttpError(504, "FETCH_TIMEOUT", "Timed out"),
    );

    const response = await invokeWorker(
      "https://worker.test/api/analyze",
      {
        method: "POST",
        body: JSON.stringify({ url: "https://slow.example" }),
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

    expect(response.status).toBe(504);
    const data = await response.json();
    expect(data.code).toBe("FETCH_TIMEOUT");
  });

  it("normalises GET requests", async () => {
    analyzeWebsite.mockResolvedValueOnce(sampleResponse);

    const response = await invokeWorker(
      "https://worker.test/api/analyze?url=https%3A%2F%2Fexample.com",
      {
        method: "GET",
        headers: {
          Accept: "application/json",
        },
      },
    );

    expect(response.status).toBe(200);
    expect(await response.json()).toEqual(sampleResponse);
  });

  it("applies CORS headers when configured", async () => {
    analyzeWebsite.mockResolvedValueOnce(sampleResponse);

    const response = await invokeWorker(
      "https://worker.test/api/analyze",
      {
        method: "POST",
        body: JSON.stringify({ url: "https://example.com" }),
        headers: {
          "Content-Type": "application/json",
          Origin: "https://frontend.example",
        },
      },
      {
        CORS_ALLOWED_ORIGIN: "https://frontend.example",
      },
    );

    expect(response.headers.get("access-control-allow-origin")).toBe(
      "https://frontend.example",
    );
    expect(response.status).toBe(200);
  });
});
