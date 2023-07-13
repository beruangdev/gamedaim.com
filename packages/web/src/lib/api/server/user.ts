import { AxiosError } from "axios"

import { http } from "@/lib/http"
import { ErrorResponse, UserDataProps, UserDataRole } from "@/lib/data-types"

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
    console.error(err)
    return {
      data: null,
      error: (err as AxiosError<ErrorResponse>)?.response?.data
        ?.message as string,
    }
  }

  return { data: res, error: null }
}

export const loginUserAction = async (values: unknown) => {
  const [res, err] = await http<LoginUserResponse>("POST", {
    url: "/user/login",
    data: values,
  })

  if (err !== null) {
    console.error(err)
    return {
      data: null,
      error: (err as AxiosError<ErrorResponse>)?.response?.data
        ?.message as string,
    }
  }

  return { data: res, error: null }
}

export const sendResetPasswordAction = async (values: unknown) => {
  const [res, err] = await http<UserDataProps>("POST", {
    url: "/user/reset-password",
    data: values,
  })

  if (err !== null) {
    console.error(err)
    return {
      data: null,
      error: (err as AxiosError<ErrorResponse>)?.response?.data
        ?.message as string,
    }
  }

  return { data: res, error: null }
}

export const validityTokenAction = async (values: unknown) => {
  const [res, err] = await http("POST", {
    url: "/user/validity-token",
    data: values,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  })

  if (err !== null) {
    console.error(err)
    return {
      data: null,
      error: (err as AxiosError<ErrorResponse>)?.response?.data
        ?.message as string,
    }
  }

  return { data: res, error: null }
}

export const sendVerificationTokenAction = async (email: string) => {
  const [res, err] = await http<LoginUserResponse>("POST", {
    url: "/user/send-verification-token",
    data: {
      email,
      baseURL: window.location.origin,
    },
  })

  if (err !== null) {
    console.error(err)
    return {
      data: null,
      error: (err as AxiosError<ErrorResponse>)?.response?.data
        ?.message as string,
    }
  }

  return { data: res, error: null }
}

export const putUserByAdminAction = async (userId: string, values: unknown) => {
  const [res, err] = await http<UserDataProps>("PUT", {
    url: `/user/update-by-admin/${userId}`,
    data: values,
  })

  if (err !== null) {
    console.error(err)
    return {
      data: null,
      error: (err as AxiosError<ErrorResponse>)?.response?.data
        ?.message as string,
    }
  }

  return { data: res, error: null }
}

export const deleteUserAction = async (userId: unknown) => {
  const [res, err] = await http<UserDataProps>("DELETE", {
    url: `/user/${userId}`,
  })

  if (err !== null) {
    console.error(err)
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
    console.error(err)
    return {
      data: null,
      error: (err as AxiosError<ErrorResponse>)?.response?.data
        ?.message as string,
    }
  }

  return { data: res, error: null }
}

export const getUsersByRoleAction = async (
  userPage = 1,
  userRole: UserDataRole,
) => {
  const [res, err] = await http<UserDataProps[]>("GET", {
    url: `/user/${userRole}/page/${userPage}`,
  })

  if (err !== null) {
    console.error(err)
    return {
      data: null,
      error: (err as AxiosError<ErrorResponse>)?.response?.data
        ?.message as string,
    }
  }

  return { data: res, error: null }
}

export const getUsersCountAction = async () => {
  const [res, err] = await http<number>("GET", {
    url: "/user/count",
  })

  if (err !== null) {
    console.error(err)
    return {
      data: null,
      error: (err as AxiosError<ErrorResponse>)?.response?.data
        ?.message as string,
    }
  }

  return { data: res, error: null }
}

export const getUserByIdAction = async (userId: string) => {
  const [res, err] = await http<UserDataProps>("GET", {
    url: `/user/${userId}`,
  })

  if (err !== null) {
    console.error(err)
    return {
      data: null,
      error: (err as AxiosError<ErrorResponse>)?.response?.data
        ?.message as string,
    }
  }

  return { data: res, error: null }
}

export const getUserByUsernameAction = async (userUsername: string) => {
  const [res, err] = await http<UserDataProps>("GET", {
    url: `/user/username/${userUsername}`,
  })

  if (err !== null) {
    console.error(err)
    return {
      data: null,
      error: (err as AxiosError<ErrorResponse>)?.response?.data
        ?.message as string,
    }
  }

  return { data: res, error: null }
}

export const getUserArticlesByUsernameAction = async (
  userUsername: string,
  userPage = 1,
) => {
  const [res, err] = await http<UserDataProps>("GET", {
    url: `/user/username/${userUsername}/articles/${userPage}`,
  })

  if (err !== null) {
    console.error(err)
    return {
      data: null,
      error: (err as AxiosError<ErrorResponse>)?.response?.data
        ?.message as string,
    }
  }

  return { data: res, error: null }
}

export const getUserDownloadsByUsernameAction = async (
  userUsername: string,
  userPage = 1,
) => {
  const [res, err] = await http<UserDataProps>("GET", {
    url: `/user/username/${userUsername}/downloads/${userPage}`,
  })

  if (err !== null) {
    console.error(err)
    return {
      data: null,
      error: (err as AxiosError<ErrorResponse>)?.response?.data
        ?.message as string,
    }
  }

  return { data: res, error: null }
}

export const putUserAction = async (userId: string, values: unknown) => {
  const [res, err] = await http<UserDataProps>("PUT", {
    url: `/user/${userId}`,
    data: values,
  })

  if (err !== null) {
    console.error(err)
    return {
      data: null,
      error: (err as AxiosError<ErrorResponse>)?.response?.data
        ?.message as string,
    }
  }

  return { data: res, error: null }
}
export const searchUsersAction = async (query: string) => {
  const [res, err] = await http<UserDataProps[]>("GET", {
    url: `/user/search/${query}`,
  })

  if (err !== null) {
    console.error(err)
    return {
      data: null,
      error: (err as AxiosError<ErrorResponse>)?.response?.data
        ?.message as string,
    }
  }

  return { data: res, error: null }
}
