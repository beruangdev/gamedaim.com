import useSWR from "swr"
import toast from "react-hot-toast"
import { AxiosError } from "axios"

import { fetcher, http } from "@/lib/http"
import { ErrorResponse, UserDataProps } from "./data-types"

export const getUsersCount = async () => {
  const [res, err] = await http<number>("GET", {
    url: "/user/count",
  })

  if (err !== null) {
    console.log(err)
    toast.error(
      (err as AxiosError<ErrorResponse>)?.response?.data?.message as string,
    )
    return
  }

  return res
}

export const getUsers = async (userPage = 1) => {
  const [res, err] = await http<UserDataProps[]>("GET", {
    url: `/user/page/${userPage}`,
  })

  if (err !== null) {
    console.log(err)
    toast.error(
      (err as AxiosError<ErrorResponse>)?.response?.data?.message as string,
    )
    return
  }

  return res
}

export const getUserById = async (userId: string) => {
  const [res, err] = await http<UserDataProps>("GET", {
    url: `/user/${userId}`,
  })

  if (err !== null) {
    console.log(err)
    toast.error(
      (err as AxiosError<ErrorResponse>)?.response?.data?.message as string,
    )
    return
  }

  return res
}

export const getUserByUsername = async (userUsername: string) => {
  const [res, err] = await http<UserDataProps>("GET", {
    url: `/user/username/${userUsername}`,
  })

  if (err !== null) {
    console.log(err)
    toast.error(
      (err as AxiosError<ErrorResponse>)?.response?.data?.message as string,
    )
    return
  }

  return res
}

export const getUserArticlesByUsername = async (
  userUsername: string,
  userPage = 1,
) => {
  const [res, err] = await http<UserDataProps>("GET", {
    url: `/user/username/${userUsername}/articles/${userPage}`,
  })

  if (err !== null) {
    toast.error(
      (err as AxiosError<ErrorResponse>)?.response?.data?.message as string,
    )
    return
  }

  return res
}

interface LoginUserResponse {
  accessToken: string
  user: UserDataProps
  message?: string
}

export const putUser = async (userId: string, values: unknown) => {
  const [res, err] = await http<UserDataProps>("PUT", {
    url: `/user/${userId}`,
    data: values,
  })

  if (err !== null) {
    console.log(err)
    toast.error(
      (err as AxiosError<ErrorResponse>)?.response?.data?.message as string,
    )
    return
  }

  return res
}

export const putUserByAdmin = async (userId: string, values: unknown) => {
  const [res, err] = await http<UserDataProps>("PUT", {
    url: `/user/update-by-admin/${userId}`,
    data: values,
  })

  if (err !== null) {
    console.log(err)
    toast.error(
      (err as AxiosError<ErrorResponse>)?.response?.data?.message as string,
    )
    return
  }

  return res
}

export const signUpUser = async (values: unknown) => {
  const [res, err] = await http<UserDataProps>("POST", {
    url: "/user/signup",
    data: values,
  })

  if (err !== null) {
    console.log(err)
    toast.error(
      (err as AxiosError<ErrorResponse>)?.response?.data?.message as string,
    )
    return
  }

  return res
}

export const loginUser = async (values: unknown) => {
  const [res, err] = await http<LoginUserResponse>("POST", {
    url: "/user/login",
    data: values,
  })

  if (err !== null) {
    console.log(err)
    toast.error(
      (err as AxiosError<ErrorResponse>)?.response?.data?.message as string,
    )
    return
  }

  return res
}

export const deleteUser = async (userId: unknown) => {
  const [res, err] = await http<UserDataProps>("DELETE", {
    url: `/user/${userId}`,
  })

  if (err !== null) {
    console.log(err)
    toast.error(
      (err as AxiosError<ErrorResponse>)?.response?.data?.message as string,
    )
    return
  }

  return res
}

export const useGetUsersCount = () => {
  const { data } = useSWR("/user/count", fetcher)
  return { usersCount: data }
}
