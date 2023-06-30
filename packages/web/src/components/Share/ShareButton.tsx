import * as React from "react"
import NextLink from "next/link"
import { IconButton } from "@/components/UI/Button"
import { cn } from "@/utils/classname"

export interface ShareButtonProps extends React.HTMLAttributes<HTMLDivElement> {
  url: string
  variant?:
    | "outline"
    | "ghost"
    | "link"
    | "default"
    | "success"
    | "info"
    | "warning"
    | "danger"
    | "secondary"
    | null
    | undefined
  onClick?: () => void
  text?: string
  icon?: string | React.ReactElement
  className?: string
  subject?: string | null
  message?: string | null
  sharetext?: string | null
  mediaSrc?: string | null
  baseUrl?: string | null
  caption?: string | null
  title?: string
}

export const ShareButton = React.forwardRef<HTMLDivElement, ShareButtonProps>(
  (props, ref) => {
    const { variant, onClick, text, icon, className, url, ...rest } = props
    return (
      <div ref={ref} {...rest}>
        <NextLink
          aria-label={text}
          target="_blank"
          rel="noopener noreferrer"
          onClick={onClick}
          title={text}
          href={url}
        >
          <IconButton
            aria-label={text}
            variant={variant}
            className={cn(className, "mb-0 h-10 w-12 text-white md:mb-1")}
          >
            {icon}
          </IconButton>
        </NextLink>
      </div>
    )
  },
)
