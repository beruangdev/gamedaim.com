import * as React from "react"
import NextLink from "next/link"

import { Image } from "@/components/Image"
import { Icon } from "@/components/UI/Icon"

import { wpAuthorPathBySlug } from "@/utils/helper"
import { formatDate } from "@/utils/date"

interface MetadataPostProps extends React.HTMLAttributes<HTMLDivElement> {
  authorName: string
  authorAvatarUrl: string
  authorSlug: string
  date: string
}

export const MetadataPost = React.forwardRef<HTMLDivElement, MetadataPostProps>(
  (props, ref) => {
    const { authorName, authorAvatarUrl, authorSlug, date, ...rest } = props

    return (
      <div className="flex-column flex" ref={ref} {...rest}>
        <div className="my-2 flex flex-row items-center gap-2">
          <div className="flex flex-row items-center">
            {authorAvatarUrl && (
              <div className="relative h-[40px] w-[40px] ">
                <Image
                  src={authorAvatarUrl}
                  className="overflow-hidden rounded-full"
                  alt={authorName}
                  sizes="(max-width: 768px) 50px, 50px"
                />
              </div>
            )}
            <div className="ml-[5px] flex flex-col">
              <NextLink
                aria-label={authorName}
                href={wpAuthorPathBySlug(authorSlug)}
              >
                <h4 className="ml-2 !text-base">{authorName}</h4>
              </NextLink>
              {date && (
                <div>
                  <Icon.AccessTime
                    aria-label="Date"
                    className="text-theme-700 dark:text-theme-200 inline-block h-3 w-3"
                  />
                  <time
                    className="text-theme-700 dark:text-theme-200 ml-[6px] text-xs"
                    dateTime={date}
                  >
                    {formatDate(date, "LL")}
                  </time>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    )
  },
)
