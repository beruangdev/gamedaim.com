"use client"
import * as React from "react"
import NextImage from "next/image"
import { MdOutlineBrokenImage } from "react-icons/md"

interface ImageProps {
  url: string
  className: string
  title: string
  onClick?: () => void
  priority?: boolean
  sizes?: string
}
export const NextPicture = (props: ImageProps) => {
  const {
    url,
    className,
    title,
    priority = false,
    onClick,
    sizes = `(max-width: 768px) 100px,
  (max-width: 1200px) 200px,
  300px`,
  } = props

  const [imageError, setImageError] = React.useState(false)

  return (
    <>
      <div className={className}>
        {!imageError ? (
          <NextImage
            src={url}
            alt={title}
            className="loading-image cursor-pointer object-cover"
            onError={() => {
              setImageError(true)
            }}
            onClick={onClick}
            onLoadingComplete={(e) => {
              e.classList.remove("loading-image")
            }}
            fill
            sizes={sizes}
            quality={60}
            priority={priority}
          />
        ) : (
          <MdOutlineBrokenImage className={"bg-background h-full w-full"} />
        )}
      </div>
    </>
  )
}
