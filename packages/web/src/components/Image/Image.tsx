"use client"

import * as React from "react"
import NextImage from "next/image"
import { ImageProps } from "next/image"
import { Icon } from "@/components/UI/Icon"

const keyStr =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/="

const triplet = (e1: number, e2: number, e3: number) =>
  keyStr.charAt(e1 >> 2) +
  keyStr.charAt(((e1 & 3) << 4) | (e2 >> 4)) +
  keyStr.charAt(((e2 & 15) << 2) | (e3 >> 6)) +
  keyStr.charAt(e3 & 63)

const rgbDataURL = (r: number, g: number, b: number) =>
  `data:image/gif;base64,R0lGODlhAQABAPAA${
    triplet(0, r, g) + triplet(b, 255, 255)
  }/yH5BAAAAAAALAAAAAABAAEAAAICRAEAOw==`

export const Image = (props: ImageProps) => {
  const {
    src,
    sizes = `(max-width: 768px) 100px,
  (max-width: 1200px) 200px,
  300px`,
    placeholder = "blur",
    fill = true,
    ...rest
  } = props
  const [imageError, setImageError] = React.useState(false)

  return (
    <>
      {!imageError ? (
        <NextImage
          src={src}
          placeholder={placeholder}
          blurDataURL={rgbDataURL(218, 218, 218)}
          quality={60}
          onError={() => {
            setImageError(true)
          }}
          sizes={sizes}
          fill={fill}
          {...rest}
        />
      ) : (
        <div onClick={rest.onClick} className="h-full w-full">
          <Icon.BrokenImage className="h-full w-full" />
        </div>
      )}
    </>
  )
}
