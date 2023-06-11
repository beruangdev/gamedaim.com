import * as React from "react"

interface SpecBoxProps extends React.HTMLAttributes<HTMLDivElement> {
  icon?: React.ReactNode
  title?: string
  value?: string
}

const SpecBox = React.forwardRef<HTMLDivElement, SpecBoxProps>((props, ref) => {
  const { icon, title, value, ...rest } = props

  return (
    <div ref={ref} className="flex flex-row space-x-2 p-5" {...rest}>
      {icon}
      <div className="flex-col">
        <h4>{title}</h4>
        <p>{value}</p>
      </div>
    </div>
  )
})

export type { SpecBoxProps }
export { SpecBox }
