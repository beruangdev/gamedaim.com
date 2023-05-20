import { AxiosError, AxiosRequestConfig } from "axios"
import { wpUpdateUserAvatar } from "@/lib/api/server/wp-users"
import {
  QUERY_WP_ALL_POSTS,
  QUERY_WP_POSTS_BY_AUTHOR_SLUG,
  QUERY_WP_POSTS_BY_CATEGORY_SLUG,
  QUERY_WP_POSTS_BY_TAG_SLUG,
  QUERY_WP_ALL_POSTS_LOAD_MORE,
  QUERY_WP_ALL_SLUG,
  QUERY_WP_POST_BY_SLUG,
  QUERY_WP_SEARCH_POSTS,
  GET_INFINITE_SCROLL_POSTS,
} from "@/data/wp-posts"
import {
  WpAuthorsDataProps,
  WpFeaturedImageDataProps,
  WpSinglePostDataProps,
  WpCategoriesDataProps,
  WpTagsDataProps,
  WpMapPostDataProps,
  WpResAllPostsProps,
  WPPageInfoProps,
  WpResPostProps,
  WpResPostsByTagProps,
} from "@/lib/wp-data-types"
import { apiCallWP } from "@/lib/http"
import { toast } from "@/components/UI/Toast"
import { ErrorResponse } from "@/lib/data-types"

export function wpPostPathBySlug(slug: string) {
  return `/${slug}`
}

interface WpGetAllPostsProps {
  posts: WpSinglePostDataProps[] | null
  pageInfo?: WPPageInfoProps | null
}
export async function wpGetAllPosts(
  config?: AxiosRequestConfig,
): Promise<WpGetAllPostsProps> {
  const [res, err] = await apiCallWP<WpResAllPostsProps>(
    "GET",
    QUERY_WP_ALL_POSTS,
    config,
  )
  if (err !== null) {
    console.log(err)
    toast({
      variant: "danger",
      description: (err as AxiosError<ErrorResponse>)?.response?.data
        ?.message as string,
    })
    return {
      posts: null,
      pageInfo: null,
    }
  }
  const posts = res?.data.posts.edges.map(
    ({ node = {} }) => node,
  ) as WpMapPostDataProps[]

  return {
    posts: posts.map(wpMapPostData),
    pageInfo: res?.data.posts.pageInfo,
  }
}

export async function wpGetAllPostsLoadMore(
  after = "",
): Promise<WpGetAllPostsProps> {
  const [res, err] = await apiCallWP<WpResAllPostsProps>(
    "GET",
    QUERY_WP_ALL_POSTS_LOAD_MORE,
    {
      after,
    },
  )
  if (err !== null) {
    console.log(err)
    toast({
      variant: "danger",
      description: (err as AxiosError<ErrorResponse>)?.response?.data
        ?.message as string,
    })
    return {
      posts: null,
      pageInfo: null,
    }
  }
  const posts = res?.data.posts.edges.map(
    ({ node = {} }) => node,
  ) as WpMapPostDataProps[]

  return {
    posts: posts.map(wpMapPostData),
    pageInfo: res?.data.posts.pageInfo,
  }
}

interface WpGetAllSlugProps {
  posts: WpSinglePostDataProps[] | null
}
export async function wpGetAllSlug(): Promise<WpGetAllSlugProps> {
  const after = ""
  const [res, err] = await apiCallWP<WpResAllPostsProps>(
    "GET",
    QUERY_WP_ALL_SLUG,
    {
      after,
    },
  )
  if (err !== null) {
    console.log(err)
    toast({
      variant: "danger",
      description: (err as AxiosError<ErrorResponse>)?.response?.data
        ?.message as string,
    })
    return { posts: null }
  }
  const posts = res?.data.posts.edges.map(
    ({ node = {} }) => node,
  ) as WpMapPostDataProps[]

  return {
    posts: posts.map(wpMapPostData),
  }
}

export async function wpGetPostsBySearch(
  search: string | string[],
): Promise<WpGetAllPostsProps> {
  const [res, err] = await apiCallWP<WpResAllPostsProps>(
    "GET",
    QUERY_WP_SEARCH_POSTS,
    {
      search,
    },
  )
  if (err !== null) {
    console.log(err)
    toast({
      variant: "danger",
      description: (err as AxiosError<ErrorResponse>)?.response?.data
        ?.message as string,
    })
    return {
      posts: null,
    }
  }
  const posts = res?.data.posts.edges.map(
    ({ node = {} }) => node,
  ) as WpMapPostDataProps[]

  return {
    posts: posts.map(wpMapPostData),
  }
}

export async function wpGetPostBySlug(slug: string) {
  const [res, err] = await apiCallWP<WpResPostProps>(
    "GET",
    QUERY_WP_POST_BY_SLUG,
    { slug },
  )
  if (err !== null) {
    console.log(err)
    toast({
      variant: "danger",
      description: (err as AxiosError<ErrorResponse>)?.response?.data
        ?.message as string,
    })
    return {
      post: null,
    }
  }
  const post = wpMapPostData((res as WpResPostProps).data.post)

  return { post: post }
}

export async function wpGetPostsByAuthorSlug(
  slug: string | string[],
  after = "",
) {
  const [res, err] = await apiCallWP<WpResAllPostsProps>(
    "GET",
    QUERY_WP_POSTS_BY_AUTHOR_SLUG,
    {
      slug,
      after,
    },
  )
  if (err !== null) {
    console.log(err)
    toast({
      variant: "danger",
      description: (err as AxiosError<ErrorResponse>)?.response?.data
        ?.message as string,
    })
    return {
      posts: null,
      pageInfo: null,
    }
  }
  const posts = res?.data.posts.edges.map(
    ({ node = {} }) => node,
  ) as WpMapPostDataProps[]

  return {
    posts: Array.isArray(posts) && posts.map(wpMapPostData),
    pageInfo: res?.data.posts.pageInfo,
  }
}

export async function wpGetPostsByCategorySlug(categoryId: string, after = "") {
  const [res, err] = await apiCallWP<WpResAllPostsProps>(
    "GET",
    QUERY_WP_POSTS_BY_CATEGORY_SLUG,
    {
      categoryId,
      after,
    },
  )
  if (err !== null) {
    console.log(err)
    toast({
      variant: "danger",
      description: (err as AxiosError<ErrorResponse>)?.response?.data
        ?.message as string,
    })
    return {
      posts: null,
      pageInfo: null,
    }
  }
  const posts = res?.data.posts.edges.map(
    ({ node = {} }) => node,
  ) as WpMapPostDataProps[]

  return {
    posts: Array.isArray(posts) && posts.map(wpMapPostData),
    pageInfo: res?.data.posts.pageInfo,
  }
}

export async function wpGetPostsByTagSlug(id: string, after = "") {
  const [res, err] = await apiCallWP<WpResPostsByTagProps>(
    "GET",
    QUERY_WP_POSTS_BY_TAG_SLUG,
    { id, after },
  )
  if (err !== null) {
    console.log(err)
    toast({
      variant: "danger",
      description: (err as AxiosError<ErrorResponse>)?.response?.data
        ?.message as string,
    })
    return {
      posts: null,
      pageInfo: null,
    }
  }
  const posts = res?.data.tag.posts.edges.map(
    ({ node = {} }) => node,
  ) as WpMapPostDataProps[]

  return {
    posts: Array.isArray(posts) && posts.map(wpMapPostData),
    pageInfo: res?.data.tag.posts.pageInfo,
  }
}

export function wpSanitizeExcerpt(excerpt: string) {
  let sanitized = excerpt

  sanitized = sanitized.replace(/\s?\[&hellip;\]/, "&hellip;")
  sanitized = sanitized.replace("....", ".")
  sanitized = sanitized.replace(".&hellip;", ".")
  sanitized = sanitized.replace(/<p>/gi, "")
  sanitized = sanitized.replace(/<\/p>/gi, "")
  sanitized = sanitized.replace(/\w*<a class="more-link".*<\/a>/, "")

  return sanitized
}

export async function wpGetInfiniteScollArticles(
  categoryIn: string,
  after: string,
) {
  const [res, err] = await apiCallWP<WpResAllPostsProps>(
    "GET",
    GET_INFINITE_SCROLL_POSTS,
    {
      categoryIn,
      after,
    },
  )
  if (err !== null) {
    console.log(err)
    toast({
      variant: "danger",
      description: (err as AxiosError<ErrorResponse>)?.response?.data
        ?.message as string,
    })
    return {
      posts: null,
      pageInfo: null,
    }
  }
  const posts = res?.data.posts.edges.map(
    ({ node = {} }) => node,
  ) as WpMapPostDataProps[]

  return {
    posts: Array.isArray(posts) && posts.map(wpMapPostData),
    pageInfo: res?.data.posts.pageInfo,
  }
}

export function wpMapPostData(post: WpMapPostDataProps) {
  let authorNode
  let categoriesNode
  let featuredImageNode
  let tagsNode
  let contentNode
  if (post.author) {
    authorNode = {
      ...post.author.node,
    }
  }

  if (post.author?.avatar && authorNode) {
    authorNode.avatar = wpUpdateUserAvatar(post.author.avatar)
  }

  if (post.categories) {
    categoriesNode = post.categories.edges?.map(({ node }) => {
      return {
        ...node,
      }
    })
  }

  if (post.tags) {
    tagsNode = post.tags.edges?.map(({ node }) => {
      return {
        ...node,
      }
    })
  }

  if (post.content) {
    if (post.content.includes(`https://gamedaim.com`)) {
      contentNode = post.content
      contentNode = contentNode.replace(
        /href="https:\/\/gamedaim/gm,
        'href="https://beta.gamedaim',
      )
      // content = content.replace(
      //   /https:\/\/media.wowkia.com\/wp-content/gm,
      //   "https://cdn.wowkia.com/wp-content",
      // )
    }
    contentNode = post.content
  }

  if (post.featuredImage) {
    featuredImageNode = post.featuredImage.node as WpFeaturedImageDataProps
    let imageUrl
    imageUrl = featuredImageNode?.sourceUrl
    if (imageUrl.includes("media") === true) {
      imageUrl = imageUrl.replace("media", "cdn")
      featuredImageNode.sourceUrl = imageUrl
    }
  }
  const data: WpSinglePostDataProps = {
    ...post,
    author: (authorNode as WpAuthorsDataProps) || {},
    categories: categoriesNode as WpCategoriesDataProps[],
    tags: (tagsNode as WpTagsDataProps[]) || [],
    featuredImage: (featuredImageNode as WpFeaturedImageDataProps) || {},
    content: (contentNode as string) || "",
  }
  return data
}
