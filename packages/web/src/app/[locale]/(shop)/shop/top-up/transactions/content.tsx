"use client"

import * as React from "react"
import { useForm, SubmitHandler } from "react-hook-form"

import { toast } from "@/components/UI/Toast"
import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
} from "@/components/UI/Form"
import { Button } from "@/components/UI/Button"
import { changePriceToIDR } from "@/utils/helper"

import { TransactionDataProps } from "@/lib/data-types"
import { getTransactionByInvoiceId } from "@/lib/api/server/payment"
import { Icon } from "@/components/UI/Icon"
interface FormData {
  queryInvoice: string
}
export function CheckTransactionContent() {
  const [transaction, setTransaction] =
    React.useState<TransactionDataProps | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>()

  const onSubmitInvoice: SubmitHandler<FormData> = async (values) => {
    const { data } = await getTransactionByInvoiceId(values.queryInvoice)
    if (!data) {
      toast({ variant: "danger", description: "Transaksi tidak ditemukkan" })
    } else {
      setTransaction(data)
    }
  }

  const copyToClipboard = React.useCallback(async (text: string | number) => {
    try {
      await navigator.clipboard.writeText(text as string)
      toast({ variant: "success", description: text + " copied to clipboard" })
    } catch (error) {
      toast({
        variant: "danger",
        description: "Failed to copy text to clipboard:",
      })
    }
  }, [])
  return (
    <div className="mx-auto flex w-full flex-col space-y-4 px-4 md:max-[991px]:max-w-[750px] min-[992px]:max-[1199px]:max-w-[970px] min-[1200px]:max-w-[1170px]">
      <div>
        <form
          onSubmit={(e) => e.preventDefault()}
          className="container relative z-20 py-2 text-left"
        >
          <h2 className="max-w-2xl text-3xl font-bold tracking-tight sm:text-4xl">
            Track your order by invoice number!
          </h2>

          <div className="mt-6 max-w-xl">
            <FormControl invalid={Boolean(errors.queryInvoice)}>
              <FormLabel>Invoice ID</FormLabel>
              <Input
                type="text"
                id="invoice"
                {...register("queryInvoice", {
                  required: "Invoice harus diisi",
                })}
              />
              {errors?.queryInvoice && (
                <FormErrorMessage>
                  {errors.queryInvoice.message}
                </FormErrorMessage>
              )}
            </FormControl>
          </div>
          <div className="mt-6 flex items-center justify-start gap-x-6">
            <Button
              onClick={handleSubmit(onSubmitInvoice)}
              className="bg-primary text-background inline-flex items-center justify-center space-x-2 rounded-md px-4 py-2 !pl-3 !pr-4 text-sm font-medium duration-300 disabled:cursor-not-allowed disabled:opacity-75"
              type="submit"
            >
              <Icon.Search />
              <span>Find Transactions</span>
            </Button>
          </div>
        </form>
      </div>

      {transaction && (
        <div className="container md:py-8">
          <div className="mt-10 border-t">
            <div className="flex flex-col gap-x-8 border-b py-12 md:flex-row">
              <div className="w-full flex-1 pt-8 print:pt-0 md:w-1/2 md:flex-auto md:pt-0">
                <dl className="gap-x-8 text-sm">
                  <div className="w-full sm:pt-0">
                    <div className="mt-2 grid w-full grid-cols-8 gap-4 pt-2 text-left md:gap-x-2">
                      <div className="col-span-3 md:col-span-4">
                        Account Data
                      </div>
                      <div className="col-span-5 md:col-span-4">
                        {transaction.account_id}
                      </div>
                      <div className="col-span-3 flex items-center md:col-span-4">
                        Invoice Number
                      </div>
                      <div className="col-span-5 md:col-span-4">
                        <button
                          onClick={() =>
                            copyToClipboard(transaction.invoice_id)
                          }
                          type="button"
                          className="flex items-center space-x-2 rounded-md border px-2.5 py-1 print:hidden"
                        >
                          <div className="max-w-[172px] truncate md:w-auto">
                            {transaction.invoice_id}
                          </div>
                          <Icon.Copy />
                        </button>
                        <span className="hidden print:block">
                          {transaction.invoice_id}
                        </span>
                      </div>
                      <div className="col-span-3 md:col-span-4">
                        Payment Status
                      </div>
                      <div className="col-span-5 md:col-span-4">
                        <span className="inline-flex rounded-sm px-2 text-xs font-semibold leading-5 print:p-0">
                          {transaction.status}
                        </span>
                      </div>

                      <div className="col-span-3 md:col-span-4">Message</div>
                      <div className="col-span-5 md:col-span-4">
                        {transaction.status !== "PAID"
                          ? "Menunggu pembayaran..."
                          : "Pembayaran berhasil"}
                      </div>
                    </div>
                  </div>
                </dl>
                <div className="mt-8 print:hidden">
                  {transaction.checkout_url && (
                    <a
                      aria-label="Lanjutkan Pembayaran"
                      href={transaction.checkout_url}
                      target="_blank"
                    >
                      <Button aria-label="Lanjutkan Pembayaran">
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
                      transaction.amount - transaction?.fee_amount,
                    )}
                  </dd>
                </div>
                <div className="flex justify-between">
                  <dt className="font-medium">Fee</dt>
                  <dd>{changePriceToIDR(transaction?.fee_amount)}</dd>
                </div>
                <div className="text-primary-500 flex items-center justify-between">
                  <dt className="text-xl font-bold print:text-sm md:text-2xl">
                    Total Payment
                  </dt>
                  <dd className="font-semibold">
                    <button
                      onClick={() => copyToClipboard(transaction.amount)}
                      type="button"
                      className="flex items-center space-x-2 rounded-md border px-2.5 py-1 text-xl print:hidden md:text-2xl"
                    >
                      <div className="max-w-[172px] truncate md:w-auto">
                        {changePriceToIDR(transaction.amount)}
                      </div>
                      <Icon.Copy />
                    </button>
                    <span className="hidden print:block">
                      {changePriceToIDR(transaction.amount)}
                    </span>
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
