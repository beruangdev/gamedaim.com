"use client"
import * as React from "react"
import NextImage from "next/image"
import { MdDiamond } from "react-icons/md"

import { getSettingByKeyAction } from "@/lib/api/server/setting"

interface IconTopUpProps {
  url: string
  className: string
}
export const IconTopUp = (props: IconTopUpProps) => {
  const { url, className } = props
  const [iconTopUpUrl, setIconTopUpUrl] = React.useState("")
  const [loading, setLoading] = React.useState(true)
  const [imageError, setImageError] = React.useState(false)

  React.useEffect(() => {
    const getIconTopUp = async () => {
      const { data } = await getSettingByKeyAction(`icon-${url}`)
      if (data) {
        setIconTopUpUrl(data.value)
      }
      setLoading(false)
    }
    getIconTopUp()
  }, [url])
  return (
    <>
      <div className={className}>
        {loading ? (
          <div className="loading-image h-full w-full" />
        ) : !iconTopUpUrl || imageError ? (
          <MdDiamond className={className} />
        ) : (
          <NextImage
            src={iconTopUpUrl}
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
