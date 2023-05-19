import axios, { AxiosError, AxiosRequestConfig } from "axios"
import env from "env"

export const axiosInstance = axios.create({
  baseURL: env.API,
})

export const fetcher = (url: string) =>
  axiosInstance.get(url).then((res) => res.data)

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
