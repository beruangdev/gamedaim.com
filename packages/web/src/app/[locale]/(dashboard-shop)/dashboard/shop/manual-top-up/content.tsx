"use client"

import * as React from "react"

import { useForm, Controller } from "react-hook-form"

import env from "env"
import { toast } from "@/components/UI/Toast"
import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  RequiredIndicator,
} from "@/components/UI/Form"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/UI/Popover"
import { Button } from "@/components/UI/Button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/UI/Command"
import { Icon } from "@/components/UI/Icon"
import { Textarea } from "@/components/UI/Textarea"

import { postTopUpTransactions } from "@/lib/api/server/top-up"

import {
  PriceListPostPaidProps,
  PriceListPrePaidProps,
  StatusPostPaidTopUpProps,
  StatusPrePaidTopUpProps,
} from "@/lib/data-types"
import { slugify, uniqueSlug } from "@/utils/helper"

interface FormValues {
  sku: string
  customerNo: number
}

interface ManualTopUpProps {
  prePaid?: PriceListPrePaidProps[] | null
  postPaid?: PriceListPostPaidProps[] | null
}

export function ManualTopUpsDashboardShopContent(props: ManualTopUpProps) {
  const { prePaid, postPaid } = props
  const allPrices = [
    ...(prePaid as PriceListPrePaidProps[]),
    ...(postPaid as PriceListPostPaidProps[]),
  ]
  const [loading, setLoading] = React.useState<boolean>(false)

  const [statusTopUp, setStatusTopUp] = React.useState<
    (StatusPostPaidTopUpProps & StatusPrePaidTopUpProps) | null
  >(null)
  const [queryMsg, setQueryMsg] = React.useState("")

  const {
    register,
    formState: { errors },
    control,
    setValue,
    handleSubmit,
  } = useForm<FormValues>()

  const onSubmit = async (values: FormValues) => {
    setLoading(true)
    const methods = {
      data:
        prePaid && prePaid.some((list) => list.buyer_sku_code === values.sku)
          ? {
              ...values,
              msg: queryMsg ? queryMsg : "topup",
              sku: values.sku,
              refId: slugify(values.sku + uniqueSlug()),
              testing: env.NODE_ENV === "development" ? true : false,
            }
          : {
              ...values,
              msg: queryMsg ? queryMsg : "topup",
              sku: values.sku,
              refId: slugify(values.sku + uniqueSlug()),
              testing: env.NODE_ENV === "development" ? true : false,
              cmd: "pay-pasca",
            },
    }
    const { data } = await postTopUpTransactions(methods.data)

    if (data) {
      setStatusTopUp(data.data)
      toast({
        variant: "success",
        description: "Manual Top Up Successfully created",
      })
    }
    setLoading(false)
  }

  return (
    <div className="mb-[100px] mt-4 flex flex-col items-end justify-end gap-3">
      <div className="w-full flex-1 space-y-4">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <FormControl invalid={Boolean(errors.sku)}>
            <FormLabel>
              Sku
              <RequiredIndicator />
            </FormLabel>
            <Controller
              control={control}
              name="sku"
              render={({ field }) => (
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        type="button"
                        role="combobox"
                        className={`
                          "w-[200px] justify-between",
                          ${!field.value && "text-muted-foreground"},
                        `}
                      >
                        {field.value
                          ? allPrices.find(
                              (price) => field.value === price.buyer_sku_code,
                            )?.buyer_sku_code
                          : "Select Sku"}
                        <Icon.Check className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-[200px] p-0">
                    <Command>
                      <CommandInput
                        placeholder="Search sku..."
                        className="h-9"
                      />
                      <CommandEmpty>No sku found.</CommandEmpty>
                      <CommandGroup>
                        {allPrices.map((price) => (
                          <CommandItem
                            value={price.buyer_sku_code}
                            key={price.brand}
                            onSelect={(value) => {
                              setValue("sku", value)
                            }}
                          >
                            {price.product_name}
                            <Icon.Check
                              className={`
                                "ml-auto w-4", ${
                                  price.buyer_sku_code === field.value
                                    ? "opacity-100"
                                    : "opacity-0"
                                } h-4
                              `}
                            />
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </Command>
                  </PopoverContent>
                </Popover>
              )}
            />
          </FormControl>
          <FormControl invalid={Boolean(errors.customerNo)}>
            <FormLabel>
              Customer No
              <RequiredIndicator />
            </FormLabel>

            <Input
              type="text"
              {...register("customerNo", {
                required: "Customer No is Required",
              })}
              className="max-w-xl"
              placeholder="Enter Customer No"
            />
            {errors?.customerNo && (
              <FormErrorMessage>{errors.customerNo.message}</FormErrorMessage>
            )}
          </FormControl>
          <FormControl>
            <FormLabel>Note</FormLabel>
            <Textarea
              className="max-w-xl"
              placeholder="Enter Note (Optional)"
              value={queryMsg}
              onChange={(e) => setQueryMsg(e.target.value)}
            />
          </FormControl>
          <Button aria-label="Submit" type="submit" loading={loading}>
            Submit
          </Button>
        </form>
      </div>
      {statusTopUp && (
        <div className="flex w-full flex-col gap-4">
          <div className="flex-grow rounded-md p-5 shadow-md">
            <h2 className="mb-3 text-xl font-bold">Info Transaksi</h2>
            <div className="flex flex-col gap-2">
              <div>
                <span className="font-bold">Status: </span>
                {statusTopUp.status}
              </div>
              <div>
                <span className="font-bold">Pesan: </span>
                {statusTopUp.message}
              </div>
              <div>
                <span className="font-bold">Sku: </span>
                {statusTopUp.buyer_sku_code}
              </div>
              <div>
                <span className="font-bold">Account Id: </span>
                {statusTopUp.customer_no}
              </div>
              <div>
                <span className="font-bold">Ref Id: </span>
                {statusTopUp.ref_id}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
