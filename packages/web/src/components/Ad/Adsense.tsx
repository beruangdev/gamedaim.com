"use client"

import * as React from "react"

interface AdsenseProps extends React.HTMLAttributes<HTMLDivElement> {
  content: string
}

export const Adsense = React.forwardRef<HTMLDivElement, AdsenseProps>(
  (props, ref) => {
    const { content } = props

    React.useEffect(() => {
      try {
        if (typeof window === "object") {
          window.adsbygoogle = window.adsbygoogle || []
          window.adsbygoogle.push({})
        }
      } catch (e) {
        console.log(e)
      }
    }, [])

    return (
      <div
        className="my-10"
        dangerouslySetInnerHTML={{ __html: content }}
        ref={ref}
      />
    )
  },
)
