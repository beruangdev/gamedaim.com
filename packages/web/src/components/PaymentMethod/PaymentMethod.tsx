import * as React from "react"
import { MdOutlineCheck } from "react-icons/md"
import { FormLabel, Input } from "@/components/UI/Form"
import { NextPicture } from "@/components/Picture"

interface PaymentMethodProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string
  description: string
  image: string
  name: string
  onSelect: () => void
  active: string
  amount: string
}

export const PaymentMethod = React.forwardRef<
  HTMLDivElement,
  PaymentMethodProps
>((props, ref) => {
  const { active, title, image, onSelect, name, amount } = props

  return (
    <div
      className={`${
        active === title
          ? "bg-green-50/25 dark:bg-green-900/25"
          : "dark:bg-theme-900 bg-white"
      } flex h-full w-full items-center rounded-[8px] shadow-md`}
      onClick={onSelect}
      ref={ref}
    >
      <div className="relative h-full w-full cursor-pointer">
        <Input
          type="radio"
          name={name}
          className="absolute h-full w-full cursor-pointer opacity-0"
          id={name}
        />
        <FormLabel
          className={`${
            active === title ? "ring-2 ring-green-500" : ""
          } item-price relative flex h-full w-full cursor-pointer items-center justify-between gap-2 overflow-hidden rounded-md p-4 hover:shadow-lg`}
        >
          {active === title && (
            <div className="absolute right-0 top-0 rounded-bl-full bg-green-600 p-1 pb-2 pl-2 text-white opacity-50">
              <MdOutlineCheck aria-label="Checked" />
            </div>
          )}
          <div className="flex flex-wrap justify-between gap-2">
            <NextPicture
              url={image}
              className="relative h-[15px] w-full max-w-[50px]"
              title="Payment method icon"
            />

            <p className="text-theme-500 dark:text-theme-200">{title}</p>
          </div>
          <h3 className="dark:text-theme-100 text-sm font-medium">{amount}</h3>
        </FormLabel>
      </div>
      <div></div>
    </div>
  )
})
