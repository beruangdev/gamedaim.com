"use client"

import * as React from "react"

import { FormControl, FormLabel, Input } from "@/components/UI/Form"
import { Button } from "@/components/UI/Button"
import { Icon } from "@/components/UI/Icon"
import { getVoucherByCode } from "@/lib/api/server/vouchers"
import { VoucherDataProps } from "@/lib/data-types"

interface AddVoucherTopUpProps extends React.HTMLAttributes<HTMLDivElement> {
  normalPrice: number
  AddDiscount: React.Dispatch<React.SetStateAction<number>>
  AddVoucherData: React.Dispatch<React.SetStateAction<VoucherDataProps | null>>
}

export const AddVoucherTopUp = React.forwardRef<
  HTMLDivElement,
  AddVoucherTopUpProps
>((props, ref) => {
  const { normalPrice, AddDiscount, AddVoucherData } = props

  const [voucherQuery, setVoucherQuery] = React.useState<string>("")
  const [voucherCode, setVoucherCode] = React.useState<VoucherDataProps | null>(
    null,
  )
  const [isSubmitted, setIsSubmitted] = React.useState(false)
  const currentTime = new Date().getTime()
  const discount =
    voucherCode &&
    Math.round((voucherCode?.discountPercentage / 100) * normalPrice)

  React.useEffect(() => {
    if (discount && discount < voucherCode?.discountMax) {
      AddDiscount(normalPrice - discount)
      AddVoucherData(voucherCode)
    }
  }, [
    AddDiscount,
    AddVoucherData,
    discount,
    normalPrice,
    voucherCode,
    voucherCode?.discountMax,
  ])

  const handleSubmit = React.useCallback(
    async (event: React.MouseEvent) => {
      event.preventDefault()

      const { data: voucher } = await getVoucherByCode(voucherQuery)

      if (
        voucher &&
        voucher.length > 0 &&
        currentTime < new Date(voucher[0].expiration).getTime() &&
        voucher[0].voucherAmount > 0
      ) {
        setVoucherCode(voucher[0])
      } else {
        setVoucherCode(null)
      }
      setIsSubmitted(true)
    },
    [currentTime, voucherQuery],
  )

  const handleClearQuery = React.useCallback(async () => {
    setVoucherQuery("")
    setVoucherCode(null)
    AddDiscount(0)
  }, [AddDiscount])

  const renderVoucherStatus = React.useMemo(() => {
    let status = ""
    if (isSubmitted && voucherQuery && !voucherCode) {
      status = "Voucher Tidak Ditemukan"
    } else if (
      isSubmitted &&
      voucherCode &&
      currentTime > new Date(voucherCode?.expiration).getTime()
    ) {
      status = "Voucher Sudah Kadaluarsa"
    } else if (isSubmitted && voucherCode && voucherCode?.voucherAmount === 0) {
      status = "Voucher telah habis"
    } else if (
      isSubmitted &&
      voucherCode &&
      currentTime < new Date(voucherCode?.expiration).getTime() &&
      discount &&
      discount < voucherCode?.discountMax
    ) {
      status = `Anda Mendapatkan Potongan ${voucherCode?.discountPercentage}%`
    } else if (discount && discount > voucherCode?.discountMax) {
      status = `Anda Tidak Memenuhi Syarat`
    }
    return status
  }, [isSubmitted, voucherQuery, voucherCode, currentTime, discount])

  return (
    <FormControl ref={ref}>
      <FormLabel>Voucher</FormLabel>
      <div className="flex gap-2">
        <Input.Group>
          <Input
            type="text"
            id="voucher-topup"
            placeholder="Enter Voucher (Optional)"
            value={voucherQuery}
            onChange={(event) => setVoucherQuery(event.target.value)}
          />
          {voucherQuery.length > 1 && (
            <Input.RightElement>
              <Button
                onClick={handleClearQuery}
                aria-label="Search"
                variant="ghost"
                type="button"
                className="p-1"
              >
                <Icon.Close aria-label="Search" />
              </Button>
            </Input.RightElement>
          )}
        </Input.Group>
        <Button type="button" onClick={handleSubmit}>
          Pakai
        </Button>
      </div>
      <span>
        <p>{renderVoucherStatus}</p>
      </span>
    </FormControl>
  )
})
