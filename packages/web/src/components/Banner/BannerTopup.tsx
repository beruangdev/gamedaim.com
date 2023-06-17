import * as React from "react"
import { MdChevronRight } from "react-icons/md"
import { CoverTopUp } from "@/components/Picture"
import { slugify } from "@/utils/helper"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
} from "@/components/UI/Breadcrumb"

interface BannerTopUpProps extends React.HTMLAttributes<HTMLDivElement> {
  url: string
  brand: string
}

export const BannerTopup = React.forwardRef<HTMLDivElement, BannerTopUpProps>(
  (props, ref) => {
    const { url, brand } = props

    return (
      <div
        className="relative flex h-[200px] w-full items-center justify-center overflow-hidden"
        ref={ref}
      >
        <CoverTopUp url={slugify(brand)} className="relative h-full w-full" />
        <div className="absolute flex h-full w-full items-center justify-center bg-[#0000008f]">
          <Breadcrumb
            className="breadcrumb-topup dark:text-theme-200 text-white"
            separator={
              <MdChevronRight aria-label="Breadcrumb" className="text-white" />
            }
          >
            <BreadcrumbItem>
              <BreadcrumbLink className="text-white" href="/shop">
                GAMEDAIM STORE
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbItem>
              <BreadcrumbLink className="text-white" href="/shop/topup">
                TOP UP
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbItem className="col-span-2" currentPage>
              <BreadcrumbLink className="text-[40px] text-white" href={url}>
                {brand}
              </BreadcrumbLink>
            </BreadcrumbItem>
          </Breadcrumb>
        </div>
      </div>
    )
  },
)
