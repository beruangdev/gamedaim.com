import * as React from "react"
import NextLink from "next/link"

import { Image } from "@/components/Image"
import { ArticleDataProps } from "@/lib/data-types"

interface ArticleCardSlideProps {
  article: ArticleDataProps
}

export const ArticleCardSide = React.forwardRef<
  HTMLDivElement,
  ArticleCardSlideProps
>((props, ref) => {
  const { article, ...rest } = props
  const { featuredImage, slug, title } = article

  return (
    <NextLink aria-label={title} href={`/article/${slug}`} {...rest}>
      <article
        className="mb-4 flex w-full border-separate flex-col rounded-lg"
        ref={ref}
      >
        <div className="relative flex max-w-xs flex-col space-y-3 md:max-w-3xl md:flex-row md:space-x-4 md:space-y-0">
          <div className="relative aspect-[1/1] h-[75px] w-auto">
            <Image
              className="max-w-[unset] overflow-hidden rounded-md"
              src={featuredImage.url}
              alt={title}
              sizes="(max-width: 768px) 50px, 100px"
            />
          </div>

          <div className="flex w-full flex-col space-y-2 md:w-2/3">
            <h3 className="hover:text-primary line-clamp-3 text-sm leading-5">
              {title}
            </h3>
          </div>
        </div>
      </article>
    </NextLink>
  )
})
