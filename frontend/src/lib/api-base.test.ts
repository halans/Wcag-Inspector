import { afterEach, describe, expect, it, vi } from "vitest";

async function importModule() {
  return import("./api-base");
}

afterEach(async () => {
  vi.unstubAllEnvs();
  vi.resetModules();
});

describe("withApiBase", () => {
  it("returns path unchanged when base is empty", async () => {
    vi.stubEnv("VITE_API_BASE_URL", "");
    const mod = await importModule();
    expect(mod.withApiBase("/api/analyze")).toBe("/api/analyze");
  });

  it("joins relative paths with configured base", async () => {
    vi.stubEnv("VITE_API_BASE_URL", "https://worker.example");
    const mod = await importModule();
    expect(mod.withApiBase("/api/analyze")).toBe(
      "https://worker.example/api/analyze",
    );
  });

  it("auto prefixes https when protocol missing", async () => {
    vi.stubEnv("VITE_API_BASE_URL", "worker.example");
    const mod = await importModule();
    expect(mod.getApiBase()).toBe("https://worker.example");
  });

  it("ignores base for absolute URLs", async () => {
    vi.stubEnv("VITE_API_BASE_URL", "https://worker.example");
    const mod = await importModule();
    const absolute = mod.withApiBase("https://other/api");
    expect(absolute).toBe("https://other/api");
  });
});
