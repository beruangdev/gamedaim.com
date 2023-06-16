import * as React from "react"
import { notFound } from "next/navigation"

import { getAdsByPositionAction } from "@/lib/api/server/ad"
import { wpGetPostsByCategorySlug } from "@/lib/api/server/wp-posts"
import { wpGetCategoryBySlug } from "@/lib/api/server/wp-categories"
import { WpCategoriesDataProps } from "@/lib/wp-data-types"
import { CategoryContent } from "./content"

export const revalidate = 60

export default async function ArticlePage({
  params,
}: {
  params: { categorySlug: string }
}) {
  const { categorySlug } = params
  const { category } = await wpGetCategoryBySlug(categorySlug as string)
  if (!category) {
    notFound()
  }
  const { posts, pageInfo } = await wpGetPostsByCategorySlug(
    (category as WpCategoriesDataProps).slug,
  )

  const { data: adsBelowHeader } = await getAdsByPositionAction(
    "TOPIC_BELOW_HEADER",
  )
  return (
    <CategoryContent
      category={category}
      posts={posts}
      pageInfo={pageInfo}
      adsBelowHeader={adsBelowHeader}
    />
  )
}
