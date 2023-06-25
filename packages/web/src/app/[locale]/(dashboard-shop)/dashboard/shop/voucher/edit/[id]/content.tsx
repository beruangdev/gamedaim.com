"use client"

import * as React from "react"

import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"

import { toast } from "@/components/UI/Toast"
import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  RequiredIndicator,
} from "@/components/UI/Form"
import { Textarea } from "@/components/UI/Textarea"
import { Button } from "@/components/UI/Button"
import { Checkbox } from "@/components/UI/Checkbox"
import { getVoucherById, putVoucher } from "@/lib/api/server/vouchers"

interface FormValues {
  name: string
  voucherCode: string
  discountPercentage: number
  discountMax: number
  voucherAmount: number
  description: string
  expiration: string
  active: boolean
}

export function EditVoucherDashboardShopContent(props: { voucherId: string }) {
  const { voucherId } = props
  const [loading, setLoading] = React.useState<boolean>(false)

  const [voucher, setVoucher] = React.useState<FormValues & { id: string }>({
    id: "",
    name: "",
    discountPercentage: 0,
    discountMax: 0,
    voucherAmount: 0,
    description: "",
    expiration: "",
    active: true,
    voucherCode: "",
  })

  const router = useRouter()

  const loadVoucher = async () => {
    const { data } = await getVoucherById(voucherId as string)
    if (data) {
      setVoucher({
        name: data.name,
        discountPercentage: data.discountPercentage,
        discountMax: data.discountMax,
        voucherAmount: data.VoucherAmount,
        description: data.description,
        expiration: data.expiration.substring(0, 10),
        active: data.active,
        id: data.id,
        voucherCode: data.voucherCode,
      })
    }
  }

  const {
    register,
    formState: { errors },
    reset,
    handleSubmit,
  } = useForm<FormValues>()

  React.useEffect(() => {
    loadVoucher()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [voucherId])

  React.useEffect(() => {
    reset(voucher)
  }, [reset, voucher])

  const onSubmit = async (values: FormValues) => {
    setLoading(true)

    const isoDate = new Date(values.expiration).toISOString()
    const mergedValues = {
      ...values,
      expiration: isoDate,
    }
    const { data } = await putVoucher(voucher.id, mergedValues)
    if (data) {
      toast({ variant: "success", description: "Voucher updated successfully" })
      router.push(`/dashboard/shop/voucher`)
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
            <FormLabel>Voucher Code</FormLabel>
            <Input
              type="text"
              {...register("voucherCode")}
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
            <Checkbox checked={voucher.active} {...register("active")} />
          </FormControl>
          <Button aria-label="Submit" type="submit" loading={loading}>
            Submit
          </Button>
        </form>
      </div>
    </div>
  )
}
