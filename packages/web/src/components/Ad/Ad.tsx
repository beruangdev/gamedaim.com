"use client"

import * as React from "react"

import { AdDataProps } from "@/lib/data-types"

import { Adsense, PlainAd } from "."

interface AdProps extends React.HTMLAttributes<HTMLDivElement> {
  ad: AdDataProps
}

export const Ad = React.forwardRef<HTMLDivElement, AdProps>((props, ref) => {
  const { ad } = props

  return (
    <div ref={ref} key={ad.id}>
      {ad.type === "PLAIN_AD" ? (
        <PlainAd content={ad.content} />
      ) : (
        <Adsense content={ad.content} />
      )}
    </div>
  )
})
