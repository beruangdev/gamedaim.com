import * as React from "react"

import { cn } from "@/utils/classname"

export interface DropZoneProps extends React.HTMLAttributes<HTMLDivElement> {
  placeholder?: string
  description?: string
}

export const DropZone = React.forwardRef<HTMLDivElement, DropZoneProps>(
  (props, ref) => {
    const {
      className,
      placeholder = "Click to upload or drag and drop",
      description = "JPG, JPEG, PNG or WEBP (MAX. 1280x720px)",
      ...rest
    } = props

    return (
      <div
        ref={ref}
        className={cn("flex w-full items-center justify-center", className)}
      >
        <label
          htmlFor="file"
          className="border-border/30 bg-background/5 hover:bg-background/10 flex h-48 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed"
        >
          <div className="flex flex-col items-center justify-center pb-6 pt-5">
            <svg
              aria-hidden="true"
              className="text-foreground/40 mb-3 h-10 w-10"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
              ></path>
            </svg>
            <p className="text-foreground/50 mb-2 text-sm">
              <span className="font-semibold">{placeholder}</span>
            </p>
            <p className="text-foreground/50 text-xs">{description}</p>
          </div>
          <input
            id="file"
            type="file"
            className="hidden"
            multiple={true}
            {...rest}
          />
        </label>
      </div>
    )
  },
)
