import path from "path";
import { mergeConfig, defineConfig } from "vitest/config";
import viteConfig from "./vite.config";

export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      environment: "jsdom",
      globals: true,
      setupFiles: path.resolve(__dirname, "src/test/setup.ts"),
      css: true,
    },
  }),
);
