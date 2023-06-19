import { defineConfig } from "tsup"

export default defineConfig({
  clean: true,
  dts: false,
  entry: ["src/app.ts"],
  splitting: true,
  format: ["cjs"],
  sourcemap: false,
  minify: false,
  outDir: "dist",
})
