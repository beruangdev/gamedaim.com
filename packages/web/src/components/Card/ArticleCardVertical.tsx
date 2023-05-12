import * as React from "react"
import NextLink from "next/link"

import { Image } from "@/components/Image"
import { ArticleDataProps } from "@/lib/data-types"

interface ArticleCardVerticalProps {
  article: ArticleDataProps
}

export const ArticleCardVertical = React.forwardRef<
  HTMLDivElement,
  ArticleCardVerticalProps
>((props, ref) => {
  const { article } = props
  const { featuredImage, slug, title } = article

  return (
    <article className="max-w-sm" ref={ref}>
      <NextLink href={`/article/${slug}`}>
        <Image
          width={350}
          height={200}
          className="h-[200px] w-full overflow-hidden rounded-lg object-cover"
          sizes="(max-width: 768px) 30vw, (max-width: 1200px) 20vw, 33vw"
          src={featuredImage.url}
          alt={title}
        />
      </NextLink>
      <div className="px-2 py-3">
        <NextLink href={`/article/${slug}/`}>
          <h3 className="hover:text-primary/90 text-foreground mb-2 line-clamp-3 text-xl font-semibold md:line-clamp-4 md:font-bold">
            {title}
          </h3>
        </NextLink>
      </div>
    </article>
  )
})
