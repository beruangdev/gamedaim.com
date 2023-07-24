import type { Config } from "tailwindcss"

import { stylePlugin } from "./plugin"
import { safelistDafundaBlocks } from "./safelist-dafunda-blocks"

export const stylePreset = {
  content: [],
  darkMode: ["class"],
  fontFamily: {
    sans: [
      "-apple-system",
      "BlinkMacSystemFont",
      "segoe ui",
      "helvetica neue",
      "Arial",
      "noto sans",
      "sans-serif",
      "apple color emoji",
      "segoe ui emoji",
      "segoe ui symbol",
      "noto color emoji",
    ],
  },
  safelist: [...safelistDafundaBlocks],
  plugins: [stylePlugin, require("tailwindcss-animate")],
} satisfies Config
