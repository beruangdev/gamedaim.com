import { clsx, ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { cva, VariantProps } from "class-variance-authority"

export function cn(...props: ClassValue[]) {
  return twMerge(clsx(props))
}

export { cva }
export type { VariantProps }
