import { defineConfig } from "tsup";
import vue from "unplugin-vue/esbuild";

export default defineConfig([
  // Core + React — full DTS generation
  {
    entry: {
      index:         "src/core/index.ts",
      "react/index": "src/react/index.ts",
    },
    format: ["esm", "cjs"],
    dts: true,
    splitting: false,
    sourcemap: true,
    clean: true,
    external: ["react", "react-dom", "vue"],
    tsconfig: "tsconfig.build.json",
  },

  // Vue — DTS disabled (we write types manually)
  {
    entry: {
      "vue/index": "src/vue/index.ts",
    },
    format: ["esm", "cjs"],
    dts: false,
    splitting: false,
    sourcemap: true,
    external: ["vue"],
    tsconfig: "tsconfig.build.json",
    esbuildPlugins: [vue()],
    async onSuccess() {
      const fs = await import("fs/promises");
      await fs.copyFile("src/vue/index.d.ts", "dist/vue/index.d.ts");
    },
  },
]);