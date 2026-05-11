import { defineConfig } from "tsup";

export default defineConfig({
  entry: {
    index:         "src/core/index.ts",
    "react/index": "src/react/index.ts",
    "vue/index":   "src/vue/index.ts",
  },
  format: ["esm", "cjs"],
  dts: true,
  splitting: false,
  sourcemap: true,
  clean: true,
  external: ["react", "react-dom", "vue"],
  tsconfig: "tsconfig.build.json",
});