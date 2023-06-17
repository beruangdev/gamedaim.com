import axios, { AxiosError, AxiosRequestConfig } from "axios"
import env from "env"
import Cookies from "js-cookie"

export const axiosInstance = axios.create({
  baseURL: env.API,
})

export const axiosInstanceWP = axios.create({
  baseURL: env.WP_API_URL,
})

type Method = "GET" | "POST" | "PUT" | "PATCH" | "DELETE"

export const http = async <T, E = unknown>(
  method: Method,
  config?: AxiosRequestConfig,
): Promise<[T | null, null | AxiosError<E>]> => {
  try {
    const res = await axiosInstance.request<T>({ ...config, method })
    return [res.data, null]
  } catch (err) {
    if (axios.isAxiosError(err)) {
      return [null, err as AxiosError<E>]
    }
    throw err
  }
}

export const fetcher = async (url: string) => {
  const currentUser = Cookies.get("currentUser")
  const userData = currentUser && JSON.parse(currentUser)
  const config = {
    headers: {
      Authorization: `Bearer ${userData?.accessToken}`,
    },
  }

  return axiosInstance.get(url, config).then((res) => res.data)
}

export const wpHttp = async <T, E = unknown>(
  method: Method,
  query: string,
  variables?: string | number | object | undefined,
  config?: AxiosRequestConfig,
): Promise<[T | null, null | AxiosError<E>]> => {
  const defaultConfig: AxiosRequestConfig = {
    params: { query: query, variables: variables },
    data: method !== "GET" && { query: query, variables: variables },
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    responseType: "json",
  }

  try {
    const res = await axiosInstanceWP.request<T>({
      ...defaultConfig,
      ...config,
      method,
    })
    return [res.data, null]
  } catch (err) {
    if (axios.isAxiosError(err)) {
      return [null, err as AxiosError<E>]
    }
    throw err
  }
}
