import { AxiosError } from "axios"

import { http } from "@/lib/http"
import { ErrorResponse, VoucherDataProps } from "@/lib/data-types"

export const getVouchersCount = async () => {
  const [res, err] = await http<number>("GET", {
    url: "/voucher/count",
  })

  if (err !== null) {
    console.log(err)
    return { data: null, error: err.message }
  }

  return { data: res, error: null }
}

export const getVouchers = async (voucherPage = 1) => {
  const [res, err] = await http<VoucherDataProps[]>("GET", {
    url: `/voucher/page/${voucherPage}`,
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

export const getVoucherById = async (voucherId: string) => {
  const [res, err] = await http<VoucherDataProps>("GET", {
    url: `/voucher/${voucherId}`,
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
export const getVoucherByCode = async (code: string) => {
  const [res, err] = await http<VoucherDataProps[]>("GET", {
    url: `/voucher/code/${code}`,
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

export const postVoucher = async (value: unknown) => {
  const [res, err] = await http<VoucherDataProps>("POST", {
    url: "/voucher",
    data: value,
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

export const putVoucher = async (voucherId: string, value: unknown) => {
  const [res, err] = await http<VoucherDataProps>("PUT", {
    url: `/voucher/${voucherId}`,
    data: value,
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

export const deleteVoucher = async (voucherId: unknown) => {
  const [res, err] = await http<VoucherDataProps>("DELETE", {
    url: `/voucher/${voucherId}`,
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

export const searchVoucher = async (voucherQuery: string) => {
  const [res, err] = await http<VoucherDataProps[]>("GET", {
    url: `/voucher/search/${voucherQuery}`,
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
