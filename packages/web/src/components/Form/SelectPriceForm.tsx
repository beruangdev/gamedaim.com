import * as React from "react"

import { slugify } from "@/utils/helper"
import { FormLabel, Input } from "../UI/Form"
import { Icon } from "../UI/Icon"
import { IconTopUp } from "../Image"

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
          active === label
            ? "bg-green-50/25 dark:bg-green-900/25"
            : "dark:bg-theme-900 bg-white"
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
            active === label ? "ring-2 ring-green-500" : ""
          } item-price relative flex h-full w-full cursor-pointer items-center gap-2 overflow-hidden rounded-md p-4 hover:shadow-lg`}
        >
          {active === label && (
            <div className="absolute right-0 top-0 rounded-bl-full bg-green-600 p-1 pb-2 pl-2 text-white opacity-50 dark:bg-green-700">
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
