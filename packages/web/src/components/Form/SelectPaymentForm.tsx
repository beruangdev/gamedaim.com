import * as React from "react"
import { FormLabel, Input } from "@/components/UI/Form"
import { Icon } from "@/components/UI/Icon"
import { Image } from "@/components/Image"

interface SelectPaymentFormProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string
  description: string
  image: string
  name: string
  onSelect: () => void
  active: string
  amount: string
}

export const SelectPaymentForm = React.forwardRef<
  HTMLDivElement,
  SelectPaymentFormProps
>((props, ref) => {
  const { active, title, image, onSelect, name, amount, ...rest } = props

  return (
    <div
      {...rest}
      className={`${
        active === title ? "bg-success/25" : "bg-background"
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
            active === title ? "ring-success ring-2" : ""
          } item-price relative flex h-full w-full cursor-pointer items-center justify-between gap-2 overflow-hidden rounded-md p-4 hover:shadow-lg`}
        >
          {active === title && (
            <div className="text-background bg-success absolute right-0 top-0 rounded-bl-full p-1 pb-2 pl-2 opacity-50">
              <Icon.Check aria-label="Checked" />
            </div>
          )}
          <div className="flex flex-wrap justify-between gap-2">
            <div className="relative h-[15px] w-full max-w-[50px]">
              <Image src={image} alt={title} />
            </div>
            <p className="text-foreground/60">{title}</p>
          </div>
          <h3 className="text-sm font-medium">{amount}</h3>
        </FormLabel>
      </div>
      <div></div>
    </div>
  )
})
