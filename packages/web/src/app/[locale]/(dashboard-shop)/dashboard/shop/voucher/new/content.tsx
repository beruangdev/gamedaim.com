"use client"

import * as React from "react"

import { useForm } from "react-hook-form"
import { Button } from "@/components/UI/Button"
import { Checkbox } from "@/components/UI/Checkbox"
import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  RequiredIndicator,
} from "@/components/UI/Form"
import { Textarea } from "@/components/UI/Textarea"
import { toast } from "@/components/UI/Toast"

import { postVoucher } from "@/lib/api/server/vouchers"

interface FormValues {
  name: string
  voucherCode: string
  discountPercentage: number
  discountMax: number
  voucherAmount: number
  description: string
  expiration: string
  active: string
}
export function CreateVouchersDashboardShopContent() {
  const [loading, setLoading] = React.useState<boolean>(false)

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<FormValues>()

  const onSubmit = async (values: FormValues) => {
    setLoading(true)
    const isoDate = new Date(values.expiration).toISOString()
    const { data } = await postVoucher({
      ...values,
      expiration: isoDate,
      active: values.active === "on" ? true : false,
    })
    if (data) {
      reset()
      toast({ variant: "success", description: "Voucher Successfully created" })
    }

    setLoading(false)
  }

  return (
    <div className="mb-[100px] mt-4 flex items-end justify-end">
      <div className="flex-1 space-y-4">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <FormControl invalid={Boolean(errors.name)}>
            <FormLabel>
              Title
              <RequiredIndicator />
            </FormLabel>
            <Input
              id="voucher-title"
              type="text"
              {...register("name", {
                required: "Title is Required",
              })}
              className="max-w-xl"
              placeholder="Enter Title"
            />
            {errors?.name && (
              <FormErrorMessage>{errors.name.message}</FormErrorMessage>
            )}
          </FormControl>
          <FormControl invalid={Boolean(errors.voucherCode)}>
            <FormLabel>
              Voucher Code
              <RequiredIndicator />
            </FormLabel>
            <Input
              type="text"
              id="voucher-code"
              {...register("voucherCode", {
                required: "Voucher Code is Required",
              })}
              className="max-w-xl"
              placeholder="Enter Voucher Code"
            />
            {errors?.voucherCode && (
              <FormErrorMessage>{errors.voucherCode.message}</FormErrorMessage>
            )}
          </FormControl>
          <FormControl invalid={Boolean(errors.description)}>
            <FormLabel>Description</FormLabel>
            <Textarea
              {...register("description")}
              className="max-w-xl"
              placeholder="Enter Description"
            />
            {errors?.description && (
              <FormErrorMessage>{errors.description.message}</FormErrorMessage>
            )}
          </FormControl>

          <FormControl invalid={Boolean(errors.discountPercentage)}>
            <FormLabel>Discount Percentage</FormLabel>
            <Input
              id="voucher-discount-percentage"
              type="number"
              {...register("discountPercentage")}
              className="max-w-xl"
              placeholder="Enter Discount Percentage"
            />
            {errors?.discountPercentage && (
              <FormErrorMessage>
                {errors.discountPercentage.message}
              </FormErrorMessage>
            )}
          </FormControl>
          <FormControl invalid={Boolean(errors.discountMax)}>
            <FormLabel>Discount Max</FormLabel>
            <Input
              type="number"
              id="voucher-discount-max"
              {...register("discountMax")}
              className="max-w-xl"
              placeholder="Enter Discount Max"
            />
            {errors?.discountMax && (
              <FormErrorMessage>{errors.discountMax.message}</FormErrorMessage>
            )}
          </FormControl>
          <FormControl invalid={Boolean(errors.voucherAmount)}>
            <FormLabel>Voucher Amount</FormLabel>
            <Input
              type="number"
              id="voucher-discount-amount"
              {...register("voucherAmount")}
              className="max-w-xl"
              placeholder="Enter Voucher Amount"
            />
            {errors?.voucherAmount && (
              <FormErrorMessage>
                {errors.voucherAmount.message}
              </FormErrorMessage>
            )}
          </FormControl>
          <FormControl invalid={Boolean(errors.expiration)}>
            <FormLabel>Expiration</FormLabel>
            <Input
              type="date"
              id="voucher-expiration"
              {...register("expiration")}
              className="max-w-xl"
              placeholder="Enter Expiration"
            />
            {errors?.expiration && (
              <FormErrorMessage>{errors.expiration.message}</FormErrorMessage>
            )}
          </FormControl>
          <FormControl invalid={Boolean(errors.active)}>
            <FormLabel>Active</FormLabel>
            <Checkbox {...register("active")} />
          </FormControl>
          <Button aria-label="Submit" type="submit" loading={loading}>
            Submit
          </Button>
        </form>
      </div>
    </div>
  )
}
