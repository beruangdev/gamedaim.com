import { AxiosError } from "axios"
import {
  QUERY_WP_ALL_TAGS,
  QUERY_WP_ALL_TAGS_SITEMAP,
  QUERY_WP_TAG_BY_SLUG,
} from "@/data/wp-tags"
import { ErrorResponse } from "@/lib/data-types"
import { wpHttp } from "@/lib/http"
import { WpResGetAllTagsProps, WpTagsDataProps } from "@/lib/wp-data-types"
export function wpTagPathBySlug(slug: string) {
  return `/tag/${slug}`
}

export async function wpGetAllTags() {
  const [res, err] = await wpHttp<{ data: WpResGetAllTagsProps }>(
    "GET",
    QUERY_WP_ALL_TAGS,
  )
  if (err !== null) {
    console.log(err)

    return {
      tags: null,
      error: (err as AxiosError<ErrorResponse>)?.response?.data
        ?.message as string,
    }
  }
  const tags = res?.data.tags.edges.map(({ node = {} }) => node)
  return {
    tags: tags,
    error: null,
  }
}

export async function wpGetAllTagsSiteMap() {
  const [res, err] = await wpHttp<{ data: WpResGetAllTagsProps }>(
    "GET",
    QUERY_WP_ALL_TAGS_SITEMAP,
  )
  if (err !== null) {
    console.log(err)

    return {
      tags: null,
      error: (err as AxiosError<ErrorResponse>)?.response?.data
        ?.message as string,
    }
  }
  const tags = res?.data.tags.edges.map(({ node = {} }) => node)
  return {
    tags: tags,
    error: null,
  }
}

export async function wpGetTagBySlug(slug: string | undefined) {
  const [res, err] = await wpHttp<{ data: { tag: WpTagsDataProps } }>(
    "GET",
    QUERY_WP_TAG_BY_SLUG,
    {
      slug,
    },
  )

  if (err !== null) {
    console.log(err)

    return {
      tag: null,
      error: (err as AxiosError<ErrorResponse>)?.response?.data
        ?.message as string,
    }
  }
  const tag = res?.data.tag
  return {
    tag: tag,
    error: null,
  }
}

export function wpMapTagData(tag = {}) {
  const data = { ...tag }
  return data
}
