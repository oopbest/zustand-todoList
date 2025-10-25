import { defineConfig } from "vitest/config";
import { fileURLToPath } from "node:url";
import { resolve } from "node:path";

const srcPath = fileURLToPath(new URL("./src", import.meta.url));

export default defineConfig({
  test: {
    environment: "jsdom",
    setupFiles: "./src/test/setup.ts",
    css: true,
    coverage: {
      reporter: ["text", "lcov"],
      include: ["src/**/*.{ts,tsx}"],
      exclude: ["src/app/**/*", "src/test/**/*", "src/__tests__/**/*"],
    },
  },
  resolve: {
    alias: {
      "@": srcPath,
    },
  },
  esbuild: {
    jsx: "automatic",
    target: "esnext",
  },
});
