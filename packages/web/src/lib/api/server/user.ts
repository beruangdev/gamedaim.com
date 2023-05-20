import { AxiosError } from "axios"

import { toast } from "@/components/UI/Toast"
import { http } from "@/lib/http"
import { ErrorResponse, UserDataProps } from "@/lib/data-types"

interface LoginUserResponse {
  accessToken: string
  user: UserDataProps
  message?: string
}

export const signUpUserAction = async (values: unknown) => {
  const [res, err] = await http<UserDataProps>("POST", {
    url: "/user/signup",
    data: values,
  })

  if (err !== null) {
    toast({
      variant: "danger",
      description: (err as AxiosError<ErrorResponse>)?.response?.data
        ?.message as string,
    })
    console.log(err)
    return
  }

  return res
}

export const loginUserAction = async (values: unknown) => {
  const [res, err] = await http<LoginUserResponse>("POST", {
    url: "/user/login",
    data: values,
  })

  if (err !== null) {
    toast({
      variant: "danger",
      description: (err as AxiosError<ErrorResponse>)?.response?.data
        ?.message as string,
    })
    console.log(err)
    return
  }

  return res
}

export const putUserByAdminAction = async (userId: string, values: unknown) => {
  const [res, err] = await http<UserDataProps>("PUT", {
    url: `/user/update-by-admin/${userId}`,
    data: values,
  })

  if (err !== null) {
    toast({
      variant: "danger",
      description: (err as AxiosError<ErrorResponse>)?.response?.data
        ?.message as string,
    })
    console.log(err)
    return
  }

  return res
}

export const deleteUserAction = async (userId: unknown) => {
  const [res, err] = await http<UserDataProps>("DELETE", {
    url: `/user/${userId}`,
  })

  if (err !== null) {
    console.log(err)
    return {
      data: null,
      error: (err as AxiosError<ErrorResponse>)?.response?.data
        ?.message as string,
    }
  }

  return { data: res, error: null }
}

export const getUsersAction = async (userPage = 1) => {
  const [res, err] = await http<UserDataProps[]>("GET", {
    url: `/user/page/${userPage}`,
  })

  if (err !== null) {
    toast({
      variant: "danger",
      description: (err as AxiosError<ErrorResponse>)?.response?.data
        ?.message as string,
    })
    console.log(err)
    return
  }

  return res
}

export const getUsersCountAction = async () => {
  const [res, err] = await http<number>("GET", {
    url: "/user/count",
  })

  if (err !== null) {
    toast({
      variant: "danger",
      description: (err as AxiosError<ErrorResponse>)?.response?.data
        ?.message as string,
    })
    console.log(err)
    return
  }

  return res
}

export const getUserByIdAction = async (userId: string) => {
  const [res, err] = await http<UserDataProps>("GET", {
    url: `/user/${userId}`,
  })

  if (err !== null) {
    toast({
      variant: "danger",
      description: (err as AxiosError<ErrorResponse>)?.response?.data
        ?.message as string,
    })
    console.log(err)
    return
  }

  return res
}

export const getUserByUsernameAction = async (userUsername: string) => {
  const [res, err] = await http<UserDataProps>("GET", {
    url: `/user/username/${userUsername}`,
  })

  if (err !== null) {
    toast({
      variant: "danger",
      description: (err as AxiosError<ErrorResponse>)?.response?.data
        ?.message as string,
    })
    console.log(err)
    return
  }

  return res
}

export const getUserArticlesByUsernameAction = async (
  userUsername: string,
  userPage = 1,
) => {
  const [res, err] = await http<UserDataProps>("GET", {
    url: `/user/username/${userUsername}/articles/${userPage}`,
  })

  if (err !== null) {
    toast({
      variant: "danger",
      description: (err as AxiosError<ErrorResponse>)?.response?.data
        ?.message as string,
    })
    console.log(err)
    return
  }

  return res
}

export const putUserAction = async (userId: string, values: unknown) => {
  const [res, err] = await http<UserDataProps>("PUT", {
    url: `/user/${userId}`,
    data: values,
  })

  if (err !== null) {
    toast({
      variant: "danger",
      description: (err as AxiosError<ErrorResponse>)?.response?.data
        ?.message as string,
    })
    console.log(err)
    return
  }

  return res
}
