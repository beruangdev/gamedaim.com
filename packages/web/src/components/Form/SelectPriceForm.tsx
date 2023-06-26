import * as React from "react"

import { FormLabel, Input } from "@/components/UI/Form"
import { Icon } from "@/components/UI/Icon"
import { IconTopUp } from "@/components/Image"

import { slugify } from "@/utils/helper"
interface InputProps extends React.HTMLAttributes<HTMLDivElement> {
  label: string
  name: string
  onSelect: () => void
  price: string
  brand: string
  active: string
}

export const SelectPriceForm = React.forwardRef<HTMLDivElement, InputProps>(
  (props, ref) => {
    const { active, name, label, onSelect, price, brand } = props

    return (
      <div
        ref={ref}
        onClick={onSelect}
        className={`${
          active === label ? "bg-success/25" : "bg-background"
        } list-price relative cursor-pointer rounded-[8px] shadow-md`}
      >
        <Input
          type="radio"
          name={name}
          className="price-radio absolute h-full w-full cursor-pointer px-1 opacity-0"
          id={name}
        />
        <FormLabel
          className={`${
            active === label ? "ring-success ring-2" : ""
          } item-price relative flex h-full w-full cursor-pointer items-center gap-2 overflow-hidden rounded-md p-4 hover:shadow-lg`}
        >
          {active === label && (
            <div className="text-background bg-success absolute right-0 top-0 rounded-bl-full p-1 pb-2 pl-2 opacity-50">
              <Icon.Check aria-label="Checked" />
            </div>
          )}
          <IconTopUp
            url={slugify(brand)}
            className="relative h-[25px] w-[25px]"
          />
          <div>
            <p className="font-bold">{label}</p>
            <p>{price}</p>
          </div>
        </FormLabel>
      </div>
    )
  },
)
