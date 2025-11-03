import path from "node:path";
import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "node",
    globals: true,
    coverage: {
      provider: "v8",
      reporter: ["text", "lcov"],
      lines: 70,
      functions: 70,
      statements: 70,
      branches: 50,
    },
  },
  resolve: {
    alias: {
      "@shared": path.resolve(__dirname, "../packages/shared/src"),
    },
  },
});
