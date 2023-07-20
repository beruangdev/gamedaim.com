import { Config } from "tailwindcss"
import { stylePreset } from "./src/styles/preset"
import dafundaSafelist from "./safelist-dafunda-blocks"
const config = {
  presets: [stylePreset],
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./src/**/**/*.{js,ts,jsx,tsx}",
    "./src/**/**/**/*.{js,ts,jsx,tsx}",
    "./src/components/UI/**/*.{js,ts,jsx,tsx}",
  ],
  safelist: [...dafundaSafelist],
} satisfies Config

export default config
