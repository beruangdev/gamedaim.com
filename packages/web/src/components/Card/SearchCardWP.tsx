import * as React from "react"
import NextLink from "next/link"
import { Image } from "@/components/Image"

interface SearchResultProps {
  title: string
  url: string
  imgUrl: string
}
export const SearchCardWP = (props: SearchResultProps) => {
  const { title, url, imgUrl } = props
  return (
    <>
      <NextLink aria-label={title} href={url} className="mb-2 w-full">
        <div className="hover:bg-primary hover:text-background flex flex-row">
          <div className="relative aspect-[1/1] h-[50px] w-auto max-w-[unset] overflow-hidden rounded-md">
            <Image src={imgUrl} className="object-cover" alt={title} />
          </div>
          <div className="ml-2 w-3/4">
            <h3 className="mb-2 text-lg font-medium">{title}</h3>
          </div>
        </div>
      </NextLink>
    </>
  )
}
