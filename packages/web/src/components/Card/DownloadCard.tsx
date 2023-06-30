import * as React from "react"
import NextLink from "next/link"

import { Button } from "@/components/UI/Button"
import { Icon } from "@/components/UI/Icon"
import { Image } from "@/components/Image"

import { DownloadFileDataProps, MediaDataProps } from "@/lib/data-types"

interface DownloadCardProps extends React.HTMLAttributes<HTMLDivElement> {
  operatingSystem: string
  slug: string
  title: string
  type: string
  featuredImage?: MediaDataProps
  downloadFiles: DownloadFileDataProps[]
}

export const DownloadCard = React.forwardRef<HTMLDivElement, DownloadCardProps>(
  (props, ref) => {
    const {
      operatingSystem,
      slug,
      title,
      type,
      featuredImage,
      downloadFiles,
      ...rest
    } = props
    const icon = getIconOperatingSystem(operatingSystem)
    return (
      <>
        <div
          key={slug}
          className="inline-block min-h-[350px] w-[200px] flex-col overflow-hidden rounded-lg shadow-lg"
          ref={ref}
          {...rest}
        >
          <div className="relative">
            <NextLink
              aria-label={title}
              href={`/download/${type.toLowerCase()}/${slug}`}
            >
              <div className="relative h-[185px] w-[200px]">
                <Image
                  src={featuredImage?.url as string}
                  className="object-cover"
                  alt={title}
                />
              </div>
            </NextLink>
            <Button
              size={null}
              variant="outline"
              aria-label="Operating System"
              className="absolute right-[5px] top-[5px] h-10 w-10 rounded-full p-[1px]"
            >
              {icon}
            </Button>
          </div>
          <NextLink
            aria-label={title}
            href={`/download/${type.toLowerCase()}/${slug}`}
          >
            <h3 className="mt-3 whitespace-normal px-3 text-base">{title}</h3>
          </NextLink>
          <div className="mb-3 mt-6 flex justify-between px-3">
            <p className="inline-block whitespace-normal">
              {downloadFiles && downloadFiles[0]?.price}
            </p>
            <p className="text-[14px]">
              {downloadFiles && downloadFiles[0]?.fileSize}
            </p>
          </div>
        </div>
      </>
    )
  },
)

function getIconOperatingSystem(operatingSystem: string) {
  switch (operatingSystem) {
    case "Windows":
      return <Icon.Windows aria-label="Windows" />
    case "macOS":
      return <Icon.Apple aria-label="macOS" />
    case "Linux":
      return <Icon.Linux aria-label="Linux" />
    case "Android":
      return <Icon.Android aria-label="Android" />
    case "iOS":
      return <Icon.AppleAlt aria-label="iOS" />
    case "Xbox One":
      return <Icon.Xbox aria-label="Xbox One" />
    case "PlayStation 4":
      return <Icon.PlayStation aria-label="PlayStation 4" />
    case "Nintendo Switch":
      return <Icon.NintendoSwitch aria-label="Nintendo Switch" />
    default:
      return <Icon.Windows aria-label="Windows" />
  }
}
