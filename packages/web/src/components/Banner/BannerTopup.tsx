import * as React from "react"
import { CoverTopUp } from "@/components/Image"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
} from "@/components/UI/Breadcrumb"
import { Icon } from "@/components/UI/Icon"
import { slugify } from "@/utils/helper"

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
        <div className="bg-foreground/20 absolute flex h-full w-full items-center justify-center">
          <Breadcrumb
            className="breadcrumb-topup text-background"
            separator={
              <Icon.ChevronRight
                aria-label="Breadcrumb"
                className="text-background"
              />
            }
          >
            <BreadcrumbItem>
              <BreadcrumbLink className="text-background" href="/shop">
                GAMEDAIM STORE
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbItem>
              <BreadcrumbLink className="text-background" href="/shop/topup">
                TOP UP
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbItem className="col-span-2" currentPage>
              <BreadcrumbLink
                className="text-background text-[40px]"
                href={url}
              >
                {brand}
              </BreadcrumbLink>
            </BreadcrumbItem>
          </Breadcrumb>
        </div>
      </div>
    )
  },
)
