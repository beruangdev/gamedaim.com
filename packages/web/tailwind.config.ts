import { Config } from "tailwindcss"
import { stylePreset } from "./src/styles/preset"

const config = {
  presets: [stylePreset],
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./src/**/**/*.{js,ts,jsx,tsx}",
    "./src/**/**/**/*.{js,ts,jsx,tsx}",
    "./src/components/UI/**/*.{js,ts,jsx,tsx}",
  ],
} satisfies Config

export default config
