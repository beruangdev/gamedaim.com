"use client"

import * as React from "react"
import NextLink from "next/link"
import useSWR from "swr"
import { useSearchParams } from "next/navigation"
import env from "env"

import { ThumbnailTopUp } from "@/components/Image"
import { Button } from "@/components/UI/Button"
import { toast } from "@/components/UI/Toast"

import useCart from "@/hooks/use-cart"
import {
  postTopUpTransactions,
  updateStatusTopUpByMerchantRef,
} from "@/lib/api/server/top-up"
import { putVoucher } from "@/lib/api/server/vouchers"
import { TopupProductProps } from "@/lib/data-types"
import { fetcher } from "@/lib/http"
import { changePriceToIDR, copyToClipboard, slugify } from "@/utils/helper"
import { Icon } from "@/components/UI/Icon"

export function DetailTransactionContent() {
  const [cartItems] = useCart()
  const params = useSearchParams()
  const tripay_reference = params.get("tripay_reference")

  const [isPaid, setIsPaid] = React.useState<boolean>(false)
  const [statusTransaction, setStatusTransaction] = React.useState("Pending")
  const datasTopUp: TopupProductProps = cartItems.find(
    (item) => item.refId === tripay_reference,
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
      postTopUpTransactions(datasTopUp?.brands)
    }
  }, [datasTopUp?.brands, statusTransaction])

  React.useEffect(() => {
    const statusData = {
      account_id: datasTopUp?.account_id,
      method: transaction?.data.payment_method,
      merchant_ref: transaction?.data.merchant_ref,
      amount: transaction?.data.amount,
      payment_provider: "tripay",
      payment_method: transaction?.data.payment_method,
      customer_name: transaction?.data.customer_name,
      customer_email: transaction?.data.customer_email,
      customer_phone: transaction?.data.customer_phone,
      customer_no: datasTopUp?.account_id,
      fee_amount: datasTopUp?.fee_amount,
      sku: datasTopUp?.sku,
      total_amount: datasTopUp?.total_amount,
      order_items: [
        {
          sku: datasTopUp?.sku,
          name: transaction?.data.order_items[0].name,
          customerNo: datasTopUp?.account_id,
          price: transaction?.data.order_items[0].price,
          quantity: transaction?.data.order_items[0].quantity,
          subtotal: transaction?.data.order_items[0].subtotal,
          product_url: transaction?.data.order_items[0].product_url,
          image_url: transaction?.data.order_items[0].image_url,
        },
      ],
      callback_url: env.API,
      return_url: `https://${env.DOMAIN}/shop/top-up/transactions}`,
      expired_time: transaction?.data.expired_time,
      note: "TopUp",
      status: transaction?.data.status,
    }

    const topupTransactions = async () => {
      const methods = {
        data: {
          sku: datasTopUp?.sku,
          testing: env.NODE_ENV === "development" ? true : false,
          customerNo: `${datasTopUp?.account_id}`,
          refId: datasTopUp?.merchant_ref,
          msg: "TopUp",
        },
      }
      const { data } = await postTopUpTransactions(methods.data)

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
      datasTopUp?.refId === tripay_reference
    ) {
      updateStatusTopUpByMerchantRef(datasTopUp?.merchant_ref, statusData)
      const interval = setInterval(() => {
        topupTransactions()
      }, 2000)
      return () => clearInterval(interval)
    }
  }, [
    transaction?.data,
    isPaid,
    datasTopUp?.sku,
    datasTopUp?.id,
    datasTopUp?.server,
    datasTopUp?.refId,
    datasTopUp?.merchant_ref,
    tripay_reference,
    datasTopUp?.account_id,
    datasTopUp?.note,
    datasTopUp?.brands,
    datasTopUp?.fee_amount,
    datasTopUp?.total_amount,
    statusTransaction,
  ])

  React.useEffect(() => {
    if (datasTopUp?.voucher && isPaid) {
      const UpdateVoucher = async () => {
        await putVoucher(datasTopUp?.voucher?.id as string, {
          ...datasTopUp?.voucher,
          voucher_amount: (datasTopUp?.voucher?.VoucherAmount as number) - 1,
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
          {/* <div className="mt-8 flex flex-col items-end justify-between gap-8 print:flex-row md:flex-row">
      <dl className="w-full text-left text-sm font-medium md:w-auto">
        <dt className=">
          This order will expire on
        </dt>
        <dd className="mt-2">
          <div className="rounded-md bg-rose-500 px-4 py-2 text-center print:p-0 print:text-left">
            2 hours, 9 minutes, 17 seconds left
          </div>
        </dd>
      </dl>
    </div> */}
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
                          <p className="break-words">
                            {datasTopUp?.account_id}
                          </p>
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
                        <button
                          onClick={() =>
                            copyToClipboard(transaction.data.merchant_ref)
                          }
                          type="button"
                          className="border-border flex items-center space-x-2 rounded-md border px-2.5 py-1 print:hidden"
                        >
                          <div className="max-w-[172px] truncate md:w-auto">
                            {transaction.data.merchant_ref}
                          </div>
                          <Icon.Copy />
                        </button>
                        <span className="hidden print:block">
                          {transaction?.data.merchant_ref}
                        </span>
                      </div>
                      <div className="col-span-3 md:col-span-4">
                        Transaction Status
                      </div>
                      <div className="col-span-5 md:col-span-4">
                        <span className="inline-flex rounded-sm px-2 text-xs font-semibold leading-5 print:p-0">
                          {statusTransaction}
                        </span>
                      </div>
                      <div className="col-span-3 md:col-span-4">
                        Payment Status
                      </div>
                      <div className="col-span-5 md:col-span-4">
                        <span className="inline-flex rounded-sm px-2 text-xs font-semibold leading-5 print:p-0">
                          {transaction.data.status}
                        </span>
                      </div>
                      {transaction.data.pay_code && (
                        <>
                          <div className="col-span-3 md:col-span-4">
                            Payment Code
                          </div>
                          <div className="col-span-5 md:col-span-4">
                            <button
                              onClick={() =>
                                copyToClipboard(transaction.data.pay_code)
                              }
                              type="button"
                              className="border-murky-400 hover:bg-murky-700 flex items-center space-x-2 rounded-md border px-2.5 py-1 print:hidden"
                            >
                              <div className="max-w-[172px] truncate md:w-auto">
                                {transaction.data.pay_code}
                              </div>
                              <Icon.Copy />
                            </button>
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
                      transaction.data.amount - datasTopUp?.fee_amount,
                    )}
                  </dd>
                </div>
                <div className="flex justify-between">
                  <dt className="font-medium">Fee</dt>
                  <dd>{changePriceToIDR(datasTopUp?.fee_amount)}</dd>
                </div>
                <div className="flex items-center justify-between">
                  <dt className="text-xl font-bold print:text-sm md:text-2xl">
                    Total Payment
                  </dt>
                  <dd className="font-semibold">
                    <button
                      onClick={() => copyToClipboard(transaction.data.amount)}
                      type="button"
                      className="border-murky-400 hover:bg-murky-700 !flex items-center space-x-2 rounded-md border px-2.5 py-1 text-xl print:hidden md:text-2xl"
                    >
                      <div className="max-w-[172px] truncate md:w-auto">
                        {changePriceToIDR(transaction.data.amount)}
                      </div>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        aria-hidden="true"
                        className="h-5 w-4"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M15.666 3.888A2.25 2.25 0 0013.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 01-.75.75H9a.75.75 0 01-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 01-2.25 2.25H6.75A2.25 2.25 0 014.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 011.927-.184"
                        ></path>
                      </svg>
                    </button>
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
