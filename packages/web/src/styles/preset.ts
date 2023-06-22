import type { Config } from "tailwindcss"

import { stylePlugin } from "./plugin"

export const stylePreset = {
  content: [],
  darkMode: ["class"],
  plugins: [stylePlugin, require("tailwindcss-animate")],
} satisfies Config
