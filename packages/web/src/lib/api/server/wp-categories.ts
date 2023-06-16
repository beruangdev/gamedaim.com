import { AxiosError } from "axios"
import {
  QUERY_WP_ALL_CATEGORIES,
  QUERY_WP_CATEGORY_BY_SLUG,
  QUERY_WP_ALL_CATEGORIES_SITEMAP,
} from "@/data/wp-categories"

import { wpHttp } from "@/lib/http"
import { ErrorResponse } from "@/lib/data-types"
import {
  WpCategoriesDataProps,
  WpCategoriesEdgesDataProps,
} from "@/lib/wp-data-types"

export function wpCategoryPathBySlug(slug: string) {
  return `/category/${slug}`
}

export async function wpGetAllCategories() {
  const [res, err] = await wpHttp<{
    data: { categories: WpCategoriesEdgesDataProps }
  }>("GET", QUERY_WP_ALL_CATEGORIES)

  if (err !== null) {
    console.log(err)

    return {
      categories: null,
    }
  }

  const categories = res?.data?.categories.edges.map(({ node = {} }) => node)
  return {
    categories: categories,
  }
}

export async function wpGetAllCategoriesSiteMap() {
  const [res, err] = await wpHttp<{
    data: { categories: WpCategoriesEdgesDataProps }
  }>("GET", QUERY_WP_ALL_CATEGORIES_SITEMAP)
  if (err !== null) {
    console.log(err)

    return {
      categories: null,
      error: (err as AxiosError<ErrorResponse>)?.response?.data
        ?.message as string,
    }
  }

  const categories = res?.data?.categories.edges.map(({ node = {} }) => node)
  return {
    categories: categories,
    error: null,
  }
}

export async function wpGetCategoryBySlug(slug: string) {
  const [res, err] = await wpHttp<{
    data: { category: WpCategoriesDataProps }
  }>("GET", QUERY_WP_CATEGORY_BY_SLUG, {
    slug,
  })
  if (err !== null) {
    console.log(err)

    return {
      category: null,
      error: (err as AxiosError<ErrorResponse>)?.response?.data
        ?.message as string,
    }
  }
  const category = res?.data.category
  return {
    category: category,
    error: null,
  }
}

export async function wpGetCategories({ count }: { count: number }) {
  const { categories } = await wpGetAllCategories()
  return {
    categories: (categories as WpCategoriesDataProps[]).slice(0, count),
  }
}

export function wpMapCategoryData(category: string[]) {
  const data = { ...category }
  return data
}
