import * as React from "react"

import NextLink from "next/link"
import { Icon } from "@/components/UI/Icon"

import { WpCategoriesDataProps } from "@/lib/wp-data-types"
import { wpCategoryPathBySlug, wpPrimaryCategorySlug } from "@/utils/helper"
import { formatDate } from "@/utils/date"

interface ArticleInfoFeaturedProps
  extends React.HTMLAttributes<HTMLDivElement> {
  categories: WpCategoriesDataProps[]
  date: string
}

export const ArticleInfoFeatured = React.forwardRef<
  HTMLDivElement,
  ArticleInfoFeaturedProps
>((props, ref) => {
  const { categories, date, ...rest } = props

  const { primary } = wpPrimaryCategorySlug(categories)
  let categoryIcon

  if (primary.slug == "games") {
    categoryIcon = <Icon.PlayStation aria-label="Games" className="h-3 w-3" />
  } else if (primary.slug == "comics") {
    categoryIcon = <Icon.Book aria-label="Comics" className="h-3 w-3" />
  } else if (primary.slug == "movies") {
    categoryIcon = <Icon.Movie aria-label="Movies" className="h-3 w-3" />
  } else if (primary.slug == "tv") {
    categoryIcon = <Icon.TV aria-label="TV" className="h-3 w-3" />
  }

  return (
    <div className="flex flex-row" {...rest} ref={ref}>
      <div className="text-foreground/50 my-1 flex flex-row items-center">
        {categories && (
          <>
            <div className="flex flex-row items-center">
              <NextLink
                aria-label={primary.name}
                className={`hover:text-primary-400 line-clamp-1 cursor-pointer`}
                href={wpCategoryPathBySlug(primary.slug)}
              >
                {categoryIcon && (
                  <span className="mr-1 inline-flex">{categoryIcon}</span>
                )}
                <span className="inline-flex text-sm">{primary.name}</span>
              </NextLink>
            </div>
          </>
        )}
        <span className="ml-1 text-sm">&bull;</span>
        {date && (
          <time className={`line-clamp-1 pl-1 text-sm`} dateTime={date}>
            {formatDate(date, "LL")}
          </time>
        )}
      </div>
    </div>
  )
})
