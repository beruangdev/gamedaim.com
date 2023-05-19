import * as React from "react"
import NextLink from "next/link"

import { Image } from "@/components/Image"
import { ArticleDataProps } from "@/lib/data-types"

interface ArticleCardHorizontalProps {
  article: ArticleDataProps
}

export const ArticleCardHorizontal = React.forwardRef<
  HTMLDivElement,
  ArticleCardHorizontalProps
>((props, ref) => {
  const { article } = props
  const { featuredImage, slug, excerpt, title } = article

  return (
    <div
      className="mb-[30px] flex grow border-separate flex-row rounded-lg lg:flex-col"
      ref={ref}
    >
      <div className="relative flex w-full flex-row justify-between lg:justify-start">
        <NextLink
          href={`/article/${slug}`}
          className="order-2 md:order-1 md:mr-[30px]"
        >
          <div className="relative h-[90px] min-h-[90px] w-[125px] min-w-[125px] md:h-[193px] md:min-h-full md:w-[270px] md:min-w-[270px]">
            <Image
              className="rounded-lg object-cover"
              fill
              sizes="(max-width: 768px) 30vw,
              (max-width: 1200px) 20vw,
              33vw"
              src={featuredImage.url}
              alt={title}
            />
          </div>
        </NextLink>
        <div className="order-1 mr-3 flex flex-col md:order-2 md:mr-[unset]">
          <NextLink href={`/article/${slug}/`}>
            <h3 className="hover:text-primary/90 line-clamp-3 text-lg font-semibold md:text-2xl md:font-bold">
              {title}
            </h3>
            <div className="text-foreground/70 hidden text-sm md:my-2.5 md:line-clamp-4">
              {excerpt}
            </div>
          </NextLink>
        </div>
      </div>
    </div>
  )
})
