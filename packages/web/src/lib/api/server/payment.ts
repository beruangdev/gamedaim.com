import { http } from "@/lib/http"
import { getSettingByKeyAction } from "./setting"
import { PaymentMethodsProps, TransactionDataProps } from "@/lib/data-types"

export const getPaymentChannel = async () => {
  const [res, err] = await http<{ data: PaymentMethodsProps[] }>("GET", {
    url: `/payment/tripay/channel`,
    headers: {
      "Content-Type": "application/json",
    },
  })

  if (err !== null) {
    console.log(err)
    return { channel: null }
  }

  const eWallet =
    res?.data.filter((data: { group: string }) =>
      data.group.includes("E-Wallet"),
    ) ?? []

  const virtualAccount =
    res?.data.filter((data: { group: string }) =>
      data.group.includes("Virtual Account"),
    ) ?? []

  const convenienceShop =
    res?.data.filter((data: { group: string }) =>
      data.group.includes("Convenience Store"),
    ) ?? []

  return { channel: { eWallet, virtualAccount, convenienceShop } }
}

export const getTransactionByInvoiceId = async (invoiceId: string) => {
  const [res, err] = await http<TransactionDataProps>("GET", {
    url: `/top-up-transaction/${invoiceId}`,
    headers: {
      "Content-Type": "application/json",
    },
  })

  if (err !== null) {
    console.log(err)
    return { data: null }
  }

  return { data: res }
}

export const getMargin = async (): Promise<{
  margin: { value: string } | null
}> => {
  const { data } = await getSettingByKeyAction("margin")
  if (!data) {
    return {
      margin: { value: "15" },
    }
  }
  return {
    margin: data || null,
  }
}
