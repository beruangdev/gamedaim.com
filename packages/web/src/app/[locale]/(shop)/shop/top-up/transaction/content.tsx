"use client"

import * as React from "react"
import NextLink from "next/link"
import useSWR from "swr"
import { useSearchParams } from "next/navigation"
import env from "env"

import { ThumbnailTopUp } from "@/components/Image"
import { Button } from "@/components/UI/Button"
import { toast } from "@/components/UI/Toast"
import { Icon } from "@/components/UI/Icon"
import { Badge } from "@/components/UI/Badge"
import useCart from "@/hooks/use-cart"
import {
  postTopUpTransactionsDigiflazz,
  updateStatusTopUpByMerchantRef,
} from "@/lib/api/server/top-up"
import { putVoucher } from "@/lib/api/server/vouchers"
import { TopupProductProps } from "@/lib/data-types"
import { fetcher } from "@/lib/http"
import { changePriceToIDR, copyToClipboard, slugify } from "@/utils/helper"

export function DetailTransactionContent() {
  const [cartItems] = useCart()
  const params = useSearchParams()
  const tripay_reference = params.get("tripay_reference")

  const [isPaid, setIsPaid] = React.useState<boolean>(false)
  const [statusTransaction, setStatusTransaction] = React.useState("Pending")
  const datasTopUp: TopupProductProps = cartItems.find(
    (item) => item.merchantRef === tripay_reference,
  ) as TopupProductProps

  const { data: transaction } = useSWR(
    tripay_reference
      ? `/payment/tripay/transaction/closed/detail/${tripay_reference}`
      : null,
    fetcher,
    {
      onSuccess: (data) => {
        if (data.data.status === "PAID") {
          setIsPaid(true)
        }
      },
      refreshInterval: 1000,
    },
  )

  React.useEffect(() => {
    if (statusTransaction === "Success") {
      postTopUpTransactionsDigiflazz(datasTopUp?.brands)
    }
  }, [datasTopUp?.brands, statusTransaction])

  React.useEffect(() => {
    const statusData = {
      status: "SUCCESS",
      paymentStatus: transaction?.data.status,
    }

    const topupTransactions = async () => {
      const methods = {
        data: {
          sku: datasTopUp?.sku,
          testing: env.NODE_ENV === "development" ? true : false,
          customerNo: `${datasTopUp?.accountId}`,
          refId: datasTopUp?.merchantRef,
          msg: "TopUp",
        },
      }
      const { data } = await postTopUpTransactionsDigiflazz(methods.data)

      if (data?.data.status === "Sukses") {
        setStatusTransaction("Success")
        toast({ variant: "success", description: data.data.status })
      } else if (data?.data.status === "Pending") {
        setStatusTransaction("Pending")
        toast({ variant: "danger", description: data.data.status })
      } else if (data?.data.status === "Gagal") {
        setStatusTransaction("Fail")
        toast({ variant: "danger", description: data.data.status })
      }
    }
    if (
      isPaid &&
      statusTransaction !== "Success" &&
      datasTopUp?.invoiceId === tripay_reference
    ) {
      updateStatusTopUpByMerchantRef(datasTopUp?.invoiceId, statusData)
      const interval = setInterval(() => {
        topupTransactions()
      }, 2000)
      return () => clearInterval(interval)
    }
  }, [
    transaction?.data,
    isPaid,
    datasTopUp?.sku,
    tripay_reference,
    datasTopUp?.brands,
    statusTransaction,
    datasTopUp?.accountId,
    datasTopUp?.feeAmount,
    datasTopUp?.totalAmount,
    datasTopUp?.invoiceId,
    datasTopUp?.merchantRef,
  ])

  React.useEffect(() => {
    if (datasTopUp?.voucher && isPaid) {
      const UpdateVoucher = async () => {
        await putVoucher(datasTopUp?.voucher?.id as string, {
          ...datasTopUp?.voucher,
          voucher_amount: (datasTopUp?.voucher?.voucherAmount as number) - 1,
        })
      }
      UpdateVoucher()
    }
  }, [datasTopUp?.voucher, isPaid])

  React.useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      event.preventDefault()
      event.returnValue = ""
    }

    window.addEventListener("beforeunload", handleBeforeUnload)

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload)
    }
  }, [])

  return (
    <div className="mx-auto flex w-full flex-col space-y-4 px-4 md:max-[991px]:max-w-[750px] min-[992px]:max-[1199px]:max-w-[970px] min-[1200px]:max-w-[1170px]">
      {!tripay_reference ? (
        <div className="mt-[60px]">
          <p>Belum ada transaksi</p>
        </div>
      ) : (
        datasTopUp !== undefined ||
        (null && (
          <div className="mt-[60px]">
            <p>Belum ada transaksi</p>
          </div>
        ))
      )}
      {transaction?.data && (
        <div className="container py-12 print:py-8 md:py-8">
          <div className="flex flex-col-reverse items-end justify-between gap-8 print:mt-0 print:flex-row print:items-start print:gap-0 md:mt-0 md:flex-row md:items-start md:gap-0">
            <div className="max-w-3xl">
              <h1 className="text-base font-medium">Thank you!</h1>
              <p className="mt-2 text-4xl font-bold tracking-tight">
                {transaction.data.status !== "PAID"
                  ? "Please complete the payment."
                  : "Payment has been successful"}
              </p>
              <p className="mt-2 text-base">
                Your order
                <span className="font-semibold">
                  {` ${transaction.data.merchant_ref} `}
                </span>
                {transaction.data.status !== "PAID"
                  ? "is waiting for payment before it is sent."
                  : "is being sent."}
              </p>
            </div>
          </div>

          <div className="mt-10 border-t">
            <div className="flex flex-col gap-x-8 border-b py-12 md:flex-row">
              <div className="-mt-2 flex gap-8 md:mt-0">
                <div className="relative mt-2 flex-none overflow-hidden print:hidden sm:h-56 md:mt-0 md:block">
                  <ThumbnailTopUp
                    className="relative aspect-[4/6] h-32 w-auto sm:h-56"
                    url={slugify(datasTopUp?.brands)}
                  />
                </div>
                <div className="flex flex-auto flex-col">
                  <div className="">
                    <h4 className="text-lg font-medium">
                      <NextLink
                        href={`/shop/top-up/${slugify(datasTopUp?.brands)}`}
                      >
                        {datasTopUp?.brands}
                      </NextLink>
                    </h4>
                    <div className="text-sm">
                      {transaction.data.order_items[0].name}
                    </div>
                    <div className="mt-8 text-sm font-medium">
                      <div className="grid grid-cols-3 gap-4 pb-2">
                        <div>Account Data</div>
                        <div className="col-span-2">
                          <p className="break-words">{datasTopUp?.accountId}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="mt-6 flex flex-1 items-start print:mt-2">
                    <dl className="flex space-x-4 divide-x text-sm sm:space-x-8">
                      <div className="flex">
                        <dt className="font-medium">Price</dt>
                        <dd className="ml-2 font-semibold">
                          {changePriceToIDR(transaction.data.amount)}
                        </dd>
                      </div>
                    </dl>
                  </div>
                </div>
              </div>
              <div className="w-full flex-1 pt-8 print:pt-0 md:w-1/2 md:flex-auto md:pt-0">
                <h4 className="sr-only">Payment</h4>
                <dl className="gap-x-8 text-sm">
                  <div className="w-full pt-12 sm:pt-0">
                    <dt className="text-lg font-medium">Payment Method</dt>
                    <dd>
                      <div className="flex items-start space-x-4">
                        <div className="text-sm">
                          {transaction.data.payment_name}
                        </div>
                      </div>
                    </dd>
                    <div className="mt-8 grid w-full grid-cols-8 gap-4 border-t pt-8 text-left md:gap-x-2">
                      <div className="col-span-3 flex items-center md:col-span-4">
                        Invoice Number
                      </div>
                      <div className="col-span-5 md:col-span-4">
                        <Button
                          onClick={() => copyToClipboard(datasTopUp.invoiceId)}
                          type="button"
                          className="border-border flex items-center space-x-2 rounded-md border px-2.5 py-1 print:hidden"
                        >
                          <div className="max-w-[172px] truncate md:w-auto">
                            {datasTopUp.invoiceId}
                          </div>
                          <Icon.Copy />
                        </Button>
                        <span className="hidden print:block">
                          {datasTopUp.invoiceId}
                        </span>
                      </div>
                      <div className="col-span-3 md:col-span-4">
                        Transaction Status
                      </div>
                      <div className="col-span-5 md:col-span-4">
                        <span className="inline-flex rounded-sm px-2 text-xs font-semibold leading-5 print:p-0">
                          <Badge
                            variant={
                              statusTransaction === "SUCCESS"
                                ? "success"
                                : statusTransaction === ("FAILED" || "ERROR")
                                ? "danger"
                                : "warning"
                            }
                          >
                            {statusTransaction}
                          </Badge>
                        </span>
                      </div>
                      <div className="col-span-3 md:col-span-4">
                        Payment Status
                      </div>
                      <div className="col-span-5 md:col-span-4">
                        <span className="inline-flex rounded-sm px-2 text-xs font-semibold leading-5 print:p-0">
                          <Badge
                            variant={
                              transaction.data.status === "PAID"
                                ? "success"
                                : transaction.data.status === "UNPAID"
                                ? "danger"
                                : "warning"
                            }
                          >
                            {transaction.data.status}
                          </Badge>
                        </span>
                      </div>
                      {transaction.data.pay_code && (
                        <>
                          <div className="col-span-3 md:col-span-4">
                            Payment Code
                          </div>
                          <div className="col-span-5 md:col-span-4">
                            <Button
                              onClick={() =>
                                copyToClipboard(transaction.data.pay_code)
                              }
                              type="button"
                              className="flex items-center space-x-2 rounded-md border px-2.5 py-1 print:hidden"
                            >
                              <div className="max-w-[172px] truncate md:w-auto">
                                {transaction.data.pay_code}
                              </div>
                              <Icon.Copy />
                            </Button>
                          </div>
                        </>
                      )}
                      <div className="col-span-3 md:col-span-4">Message</div>
                      <div className="col-span-5 md:col-span-4">
                        {transaction.data.status !== "PAID"
                          ? "Menunggu pembayaran..."
                          : "Pembayaran berhasil"}
                      </div>
                    </div>
                  </div>
                </dl>
                <div className="mt-8 print:hidden">
                  {transaction.data.checkout_url && (
                    <a
                      aria-label="Lanjutkan Pembayaran"
                      href={transaction.data.checkout_url}
                      target="_blank"
                    >
                      <Button type="button" aria-label="Lanjutkan Pembayaran">
                        Lanjutkan Pembayaran
                      </Button>
                    </a>
                  )}
                </div>
              </div>
            </div>
            <div>
              <dl className="space-y-6 py-6 text-sm">
                <div className="flex justify-between">
                  <dt className="font-medium">Subtotal</dt>
                  <dd>
                    {changePriceToIDR(
                      transaction.data.amount - datasTopUp?.feeAmount,
                    )}
                  </dd>
                </div>
                <div className="flex justify-between">
                  <dt className="font-medium">Fee</dt>
                  <dd>{changePriceToIDR(datasTopUp?.feeAmount)}</dd>
                </div>
                <div className="flex items-center justify-between">
                  <dt className="text-xl font-bold print:text-sm md:text-2xl">
                    Total Payment
                  </dt>
                  <dd className="font-semibold">
                    <Button
                      onClick={() => copyToClipboard(transaction.data.amount)}
                      type="button"
                      className="!flex items-center space-x-2 rounded-md border px-2.5 py-1 text-xl print:hidden md:text-2xl"
                    >
                      <div className="max-w-[172px] truncate md:w-auto">
                        {changePriceToIDR(transaction.data.amount)}
                      </div>
                      <Icon.Copy />
                    </Button>
                    <span className="hidden print:block">
                      {changePriceToIDR(transaction.data.amount)}
                    </span>
                  </dd>
                </div>
              </dl>
            </div>
            <div className="flex-grow rounded-md p-5 shadow-md">
              <h2 className="mb-3 text-xl font-bold">Cara Membayar</h2>
              <div className="space-y-4">
                {transaction.data.instructions.map(
                  (instructions: { title: string; steps: string[] }) => {
                    return (
                      <details key={instructions.title}>
                        <summary className="cursor-pointer">
                          {instructions.title}
                        </summary>
                        {instructions.steps.map((step: string) => {
                          return (
                            <div dangerouslySetInnerHTML={{ __html: step }} />
                          )
                        })}
                      </details>
                    )
                  },
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
