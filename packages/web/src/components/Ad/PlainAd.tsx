"use client"

import * as React from "react"

interface PlainAdProps extends React.HTMLAttributes<HTMLDivElement> {
  content: string
}

export const PlainAd = React.forwardRef<HTMLDivElement, PlainAdProps>(
  (props, ref) => {
    const { content } = props

    return (
      <div
        className="my-10"
        dangerouslySetInnerHTML={{ __html: content }}
        ref={ref}
      />
    )
  },
)
