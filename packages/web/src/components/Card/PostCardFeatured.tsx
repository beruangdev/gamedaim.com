import * as React from "react"
import NextLink from "next/link"

import { Image } from "@/components/Image"
import { WpSinglePostDataProps } from "@/lib/wp-data-types"

export interface PostCardFeaturedProps
  extends React.HTMLAttributes<HTMLDivElement> {
  index?: number
  post: WpSinglePostDataProps
}

export const PostCardFeatured = React.forwardRef<
  HTMLDivElement,
  PostCardFeaturedProps
>((props, ref) => {
  const { post } = props
  const { title, featuredImage, uri } = post

  return (
    <>
      <article
        className="whitspace-normal relative h-full overflow-hidden rounded-xl"
        ref={ref}
      >
        <div className="h-full">
          <NextLink
            aria-label={title}
            className="after:absolute after:left-0 after:top-0 after:h-full after:w-full after:rounded-xl after:bg-gradient-to-t after:from-[#282828] after:to-transparent after:transition-all"
            href={uri}
          >
            <div className="relative box-border aspect-[8/16] h-[300px] md:aspect-[9/16]">
              <Image
                src={featuredImage?.sourceUrl}
                className="overflow-hidden object-cover"
                alt={featuredImage?.altText || title}
                priority={true}
              />
            </div>
          </NextLink>
        </div>
        <div className="absolute bottom-0 left-0 z-[7] w-full p-[20px] md:px-4 md:py-5 min-[992px]:p-[25px]">
          <NextLink aria-label={title} href={uri}>
            <h3
              className={`hover:text-primary text-background line-clamp-4 text-xl font-bold leading-[1.3]`}
            >
              {title}
            </h3>
          </NextLink>
        </div>
      </article>
    </>
  )
})
