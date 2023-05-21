import { AxiosError } from "axios"
import { toast } from "@/components/UI/Toast"

import {
  QUERY_WP_ALL_USERS,
  QUERY_WP_USERS_BY_ID,
  QUERY_WP_USERS_BY_SLUG,
} from "@/data/wp-users"
import { apiCallWP } from "@/lib/http"
import { WpAuthorsDataProps } from "@/lib/wp-data-types"
import { ErrorResponse } from "@/lib/data-types"

export function wpAuthorPathBySlug(slug: string) {
  return `/author/${slug}`
}

export async function wpGetUserBySlug(slug: string) {
  const [res, err] = await apiCallWP<{ data: { user: WpAuthorsDataProps } }>(
    "GET",
    QUERY_WP_USERS_BY_SLUG,
    {
      slug,
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
      user: null,
    }
  }

  const user = res?.data?.user
  return {
    user: user,
  }
}

export function wpAuthorPathByName(slug: string) {
  return `/author/${slug}`
}

export async function wpGetUserByNameSlug(slug: string) {
  const { users } = await wpGetAllUsers()

  const user = users?.find((user: { slug: string }) => user.slug === slug)
  if (!user) {
    let user: { error: string } = {
      error: "",
    }
    user.error = "Ada yang salah"
    return { user }
  }
  return {
    user,
  }
}

export function wpUserSlugByName(slug: string) {
  return slug
}

export async function wpGetUserbyId(id: string) {
  const [res, err] = await apiCallWP<{ data: { user: WpAuthorsDataProps } }>(
    "GET",
    QUERY_WP_USERS_BY_ID,
    {
      id,
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
      user: null,
    }
  }

  return {
    user: res?.data.user,
  }
}

export interface WpResAuthorProps {
  users: { edges: { node: WpAuthorsDataProps }[] }
}

export async function wpGetAllUsers() {
  const [res, err] = await apiCallWP<{ data: WpResAuthorProps }>(
    "GET",
    QUERY_WP_ALL_USERS,
  )
  if (err !== null) {
    console.log(err)
    toast({
      variant: "danger",
      description: (err as AxiosError<ErrorResponse>)?.response?.data
        ?.message as string,
    })
    return {
      users: null,
    }
  }
  const usersNode = res?.data.users.edges.map(
    ({ node = {} }) => node,
  ) as WpAuthorsDataProps[]
  const users = usersNode?.map(wpMapUserData)
  return {
    users: users,
  }
}

export async function wpGetAllAuthors() {
  const { users } = await wpGetAllUsers()

  return {
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
