"use client"

import * as React from "react"

import { Icon } from "@/components/UI/Icon"
import { Image } from "@/components/Image"
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
      const { data } = await getSettingByKeyAction(`${url}-image`)
      if (data) {
        const parsedData = JSON.parse(data.value)
        setIconTopUpUrl(parsedData.iconImage)
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
          <Icon.Diamond className={className} />
        ) : (
          <Image
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
