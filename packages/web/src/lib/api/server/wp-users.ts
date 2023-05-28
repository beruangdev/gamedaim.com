import { AxiosError } from "axios"

import {
  QUERY_WP_ALL_USERS,
  QUERY_WP_USERS_BY_ID,
  QUERY_WP_USERS_BY_SLUG,
} from "@/data/wp-users"
import { wpHttp } from "@/lib/http"
import { WpAuthorsDataProps } from "@/lib/wp-data-types"
import { ErrorResponse } from "@/lib/data-types"

export function wpAuthorPathBySlug(slug: string) {
  return `/author/${slug}`
}

export async function wpGetUserBySlug(slug: string) {
  const [res, err] = await wpHttp<{ data: { user: WpAuthorsDataProps } }>(
    "GET",
    QUERY_WP_USERS_BY_SLUG,
    {
      slug,
    },
  )

  if (err !== null) {
    console.log(err)
    return {
      error: (err as AxiosError<ErrorResponse>)?.response?.data
        ?.message as string,
      user: null,
    }
  }

  const user = res?.data?.user
  return {
    error: null,
    user: user,
  }
}

export function wpAuthorPathByName(slug: string) {
  return `/author/${slug}`
}

export async function wpGetUserByNameSlug(slug: string) {
  const { users, error } = await wpGetAllUsers()

  const user = users?.find((user: { slug: string }) => user.slug === slug)

  if (error) {
    console.log(error)
    return {
      error,
      posts: null,
      pageInfo: null,
    }
  }

  return {
    error: null,
    user,
  }
}

export function wpUserSlugByName(slug: string) {
  return slug
}

export async function wpGetUserbyId(id: string) {
  const [res, err] = await wpHttp<{ data: { user: WpAuthorsDataProps } }>(
    "GET",
    QUERY_WP_USERS_BY_ID,
    {
      id,
    },
  )

  if (err !== null) {
    console.log(err)
    return {
      error: (err as AxiosError<ErrorResponse>)?.response?.data
        ?.message as string,
      user: null,
    }
  }

  return {
    error: null,
    user: res?.data.user,
  }
}

export interface WpResAuthorProps {
  users: { edges: { node: WpAuthorsDataProps }[] }
}

export async function wpGetAllUsers() {
  const [res, err] = await wpHttp<{ data: WpResAuthorProps }>(
    "GET",
    QUERY_WP_ALL_USERS,
  )

  if (err !== null) {
    console.log(err)
    return {
      error: (err as AxiosError<ErrorResponse>)?.response?.data
        ?.message as string,
      users: null,
    }
  }

  const usersNode = res?.data.users.edges.map(
    ({ node = {} }) => node,
  ) as WpAuthorsDataProps[]

  const users = usersNode?.map(wpMapUserData)

  return {
    error: null,
    users: users,
  }
}

export async function wpGetAllAuthors() {
  const { users, error } = await wpGetAllUsers()

  if (error) {
    return {
      error,
      users: null,
    }
  }

  return {
    error: null,
    user: users,
  }
}

export function wpMapUserData(user: WpAuthorsDataProps) {
  const data = {
    ...user,
    avatar: user.avatar && wpUpdateUserAvatar(user.avatar),
  }

  return {
    ...data,
  }
}

export function wpUpdateUserAvatar(avatar: { url: string }) {
  return {
    ...avatar,
    url: avatar.url?.replace("http://", "https://"),
  }
}
