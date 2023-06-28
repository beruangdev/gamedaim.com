"use client"

import * as React from "react"
import useSWR from "swr"

import { Button } from "@/components/UI/Button"
import { Icon } from "@/components/UI/Icon"
import { Image } from "@/components/Image"
import { BannerProps } from "@/lib/data-types"
import { getSettingByKeyAction } from "@/lib/api/server/setting"

export const BannerShop = () => {
  const [content, setContent] = React.useState<BannerProps[] | null>(null)
  const { data } = useSWR(
    "banner-shop",
    () => getSettingByKeyAction("settingShop"),
    {
      onSuccess: (data) => {
        if (data.data) {
          const parsedData = JSON.parse(data.data.value)
          if (parsedData) {
            setContent(parsedData.banners)
          }
        }
      },
    },
  )

  const arrowClass =
    "justify-center content-center bg-[#F39C12] hover:bg-foreground/50 hover:text-background p-2 cursor-pointer border-none ring-0 absolute rounded-full top-[48%]"

  return (
    <>
      {data && content && Array.isArray(content) && content.length > 0 ? (
        <div className="flex h-full items-center justify-center">
          <div className="relative h-[400px] w-full overflow-hidden rounded-md">
            <Button
              aria-label="Prev"
              id="prev"
              variant="outline"
              className={`${arrowClass} left-[5%] z-[20]`}
            >
              <Icon.ArrowBack aria-label="Prev" />
            </Button>
            <Button
              aria-label="Next"
              id="next"
              variant="outline"
              className={`${arrowClass} right-[5%] z-[20]`}
            >
              <Icon.ArrowForward aria-label="Next" />
            </Button>
            <div className="scrollbar-hide scrollbar relative flex snap-x snap-mandatory overflow-x-scroll scroll-smooth">
              {content.map((c: BannerProps, i: number) => {
                const arrow = i + 1

                return (
                  <div
                    key={i}
                    id={`slides__${arrow}`}
                    className="scale-1 relative mr-0 box-border flex h-[400px] w-full flex-shrink-0 origin-[center_center] snap-center items-center justify-center"
                  >
                    <div className="relative aspect-video h-[inherit] w-[inherit]">
                      <Image src={c.url} alt="Gamedaim Shop" />
                    </div>
                    <Button
                      aria-label="Prev"
                      id="prev"
                      variant="outline"
                      className={`${arrowClass} left-[5%] z-[100] opacity-0`}
                    >
                      <a
                        className="h-full w-full"
                        href={`#slides__${
                          arrow === 1 ? content.length : arrow - 1
                        }`}
                        title="Prev"
                      >
                        <Icon.ArrowBack />
                      </a>
                    </Button>

                    <Button
                      aria-label="Next"
                      id="next"
                      variant="outline"
                      className={`${arrowClass} right-[5%] z-[100] opacity-0`}
                    >
                      <a
                        className="h-full w-full"
                        href={`#slides__${
                          arrow === content.length ? 1 : arrow + 1
                        }`}
                        title="Next"
                      >
                        <Icon.ArrowForward />
                      </a>
                    </Button>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  )
}
