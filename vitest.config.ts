import path from "node:path";
import { mergeConfig, defineConfig } from "vitest/config";
import viteConfig from "./vite.config";

export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      environment: "jsdom",
      globals: true,
      setupFiles: path.resolve(__dirname, "frontend/test/setup.ts"),
      css: true,
      coverage: {
        provider: "v8",
        reporter: ["text", "lcov"],
        lines: 70,
        functions: 70,
        statements: 70,
        branches: 50,
      },
    },
  }),
);
