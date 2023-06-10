import * as React from "react"

interface DownloadDashboardContainerProps
  extends React.HTMLAttributes<HTMLDivElement> {
  isOpen?: boolean
  sidebar?: React.ReactNode
}

export const DownloadDashboardContainer: React.FunctionComponent<
  DownloadDashboardContainerProps
> = (props) => {
  const { isOpen, sidebar, children, ...rest } = props

  return (
    <div className="flex min-h-screen flex-row flex-wrap" {...rest}>
      <div className="order-1 w-full md:px-64 lg:w-10/12">{children}</div>
      <div
        className={`${
          isOpen == false
            ? "hidden"
            : "pt-15 bg-background relative z-[8] mt-16 flex flex-row overflow-x-auto py-4 opacity-100"
        } `}
      >
        {sidebar}
      </div>
    </div>
  )
}
