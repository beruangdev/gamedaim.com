import * as React from "react"

import NextLink from "next/link"
import { Image } from "@/components/Image"
import { Icon } from "@/components/UI/Icon"
import { formatDate } from "@/utils/date"

interface PostCardProps {
  src: string
  alt: string
  slug: string
  excerpt: string
  title: string
  authorName: string
  authorUri: string
  authorAvatarUrl: string
  date: string
}

export const PostCard = React.forwardRef<HTMLDivElement, PostCardProps>(
  (props, ref) => {
    const {
      src,
      alt,
      slug,
      excerpt,
      title,
      authorName,
      authorUri,
      authorAvatarUrl,
      date,

      ...rest
    } = props

    return (
      <article
        className="mb-[30px] flex grow border-separate flex-row rounded-lg lg:flex-col"
        ref={ref}
        {...rest}
      >
        <div className="relative flex w-full flex-row justify-between lg:justify-start">
          <NextLink
            href={slug}
            aria-label={title}
            className="order-2 md:order-1 md:mr-[30px]"
          >
            <div className="relative h-[50px] min-h-[50px] w-[70px] min-w-[70px] overflow-hidden rounded-lg sm:h-[90px] sm:min-h-[90px] sm:w-[125px] sm:min-w-[125px] md:h-[193px] md:min-h-full md:w-[270px] md:min-w-[270px]">
              <Image src={src} alt={alt} priority={true} />
            </div>
          </NextLink>
          <div className="order-1 mr-3 flex flex-col md:order-2 md:mr-[unset]">
            <NextLink aria-label={title} href={slug}>
              <h3 className="hover:text-primary line-clamp-2 text-base font-bold md:text-xl">
                {title}
              </h3>
              <div
                className="text-foreground/50 hidden text-sm md:my-2.5 md:line-clamp-4"
                dangerouslySetInnerHTML={{ __html: excerpt }}
              />
            </NextLink>
            <div className="flex-column flex">
              <div className="flex flex-row items-center">
                {authorName && (
                  <>
                    <div className="hidden flex-row items-center md:flex">
                      {authorAvatarUrl && (
                        <div className="relative h-[20px] w-[20px]">
                          <Image
                            src={authorAvatarUrl}
                            className="overflow-hidden rounded-full object-cover"
                            alt={authorName}
                            sizes="(max-width: 768px) 20px, 50px"
                          />
                        </div>
                      )}
                      <NextLink aria-label={authorName} href={authorUri}>
                        <h4 className="ml-2 text-[12px] ">{authorName}</h4>
                      </NextLink>
                    </div>
                  </>
                )}
                <Icon.AccessTime
                  aria-label="Date"
                  className="text-foreground/80 h-3 w-3 md:ml-2"
                />
                {date && (
                  <time
                    className="text-foreground/80 pl-0.5 text-xs"
                    dateTime={date}
                  >
                    {formatDate(date, "LL")}
                  </time>
                )}
              </div>
            </div>
          </div>
        </div>
      </article>
    )
  },
)
