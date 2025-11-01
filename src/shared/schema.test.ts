import { describe, expect, it } from "vitest";
import {
  AnalysisUrlValidationError,
  analysisRequestSchema,
  analysisUrlErrorMessages,
  normalizeAnalysisUrl,
} from "./schema";

describe("analysis URL validation", () => {
  it("rejects malformed hostnames with a helpful message", () => {
    const result = analysisRequestSchema.safeParse({ url: "not a real site" });
    expect(result.success).toBe(false);
    expect(result.success ? "" : result.error.issues[0]?.message).toBe(
      analysisUrlErrorMessages["invalid-format"],
    );
  });

  it("rejects unsupported protocols", () => {
    expect(() => normalizeAnalysisUrl("ftp://files.example.com")).toThrow(
      AnalysisUrlValidationError,
    );
  });

  it("normalizes bare domains by adding https", () => {
    const parsed = analysisRequestSchema.parse({ url: "example.com" });
    expect(parsed.url).toBe("https://example.com/");
  });
});
