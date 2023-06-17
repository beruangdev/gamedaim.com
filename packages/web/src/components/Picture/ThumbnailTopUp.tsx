"use client"
import React from "react"
import NextImage from "next/image"
import { MdOutlineBrokenImage } from "react-icons/md"
import { getSettingByKeyAction } from "@/lib/api/server/setting"

interface ThumbnailTopUpProps {
  url: string
  className: string
}
export const ThumbnailTopUp = (props: ThumbnailTopUpProps) => {
  const { url, className } = props
  const [thumbnailTopUpUrl, setThumbnailTopUpUrl] = React.useState("")
  const [loading, setLoading] = React.useState(true)
  const [imageError, setImageError] = React.useState(false)

  React.useEffect(() => {
    const getThumbnailTopUp = async () => {
      const { data } = await getSettingByKeyAction(`thumbnail-${url}`)
      if (data) {
        setThumbnailTopUpUrl(data.value)
      }
      setLoading(false)
    }
    getThumbnailTopUp()
  }, [url])
  return (
    <>
      <div className={className}>
        {loading ? (
          <div className="loading-image h-full w-full" />
        ) : !thumbnailTopUpUrl || imageError ? (
          <MdOutlineBrokenImage className={className} />
        ) : (
          <NextImage
            src={thumbnailTopUpUrl}
            alt={url}
            className="loading-image cursor-pointer rounded-sm object-cover"
            onLoadingComplete={(e) => {
              e.classList.remove("loading-image")
            }}
            onError={() => setImageError(true)}
            fill
            sizes="(max-width: 768px) 30vw,
  (max-width: 1200px) 20vw,
  33vw"
            quality={60}
          />
        )}
      </div>
    </>
  )
}
