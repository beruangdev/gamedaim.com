import * as React from "react"
import NextLink from "next/link"
import { Image } from "@/components/Image"
interface DownloadCardSlideProps {
  title: string
  slug: string
  src: string
}

export const DownloadCardSide = React.forwardRef<
  HTMLDivElement,
  DownloadCardSlideProps
>((props, ref) => {
  const { src, slug, title, ...rest } = props

  return (
    <NextLink aria-label={title} href={slug} {...rest}>
      <article
        className="mb-4 flex w-full border-separate flex-col rounded-lg"
        ref={ref}
      >
        <div className="relative flex max-w-xs flex-col space-y-3 md:max-w-3xl md:flex-row md:space-x-4 md:space-y-0">
          <div className="relative aspect-[1/1] h-[75px] w-auto max-w-[unset] overflow-hidden rounded-md">
            <Image
              src={src}
              alt={title}
              sizes="(max-width: 768px) 50px, 100px"
              priority={true}
            />
          </div>
          <div className="flex w-full flex-col space-y-2 md:w-2/3">
            <h3 className="hover:text-primary/40 line-clamp-3 text-sm leading-5">
              {title}
            </h3>
          </div>
        </div>
      </article>
    </NextLink>
  )
})
