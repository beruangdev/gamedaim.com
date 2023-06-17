"use client"
import * as React from "react"
import NextImage from "next/image"
import { MdOutlineBrokenImage } from "react-icons/md"
import { getSettingByKeyAction } from "@/lib/api/server/setting"

interface CoverTopUpProps {
  url: string
  className: string
}
export const CoverTopUp = (props: CoverTopUpProps) => {
  const { url, className } = props
  const [coverTopUpUrl, setCoverTopUpUrl] = React.useState("")
  const [loading, setLoading] = React.useState(true)
  const [imageError, setImageError] = React.useState(false)

  React.useEffect(() => {
    const getCoverTopUp = async () => {
      const { data } = await getSettingByKeyAction(`cover-${url}`)
      if (data) {
        setCoverTopUpUrl(data.value)
      }
      setLoading(false)
    }
    getCoverTopUp()
  }, [url])
  return (
    <>
      <div className={className}>
        {loading ? (
          <div className="loading-image h-full w-full" />
        ) : !coverTopUpUrl || imageError ? (
          <MdOutlineBrokenImage className={className} />
        ) : (
          <NextImage
            src={coverTopUpUrl}
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
