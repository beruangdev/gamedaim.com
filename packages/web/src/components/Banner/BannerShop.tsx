import * as React from "react"
import { MdArrowBack, MdArrowForward } from "react-icons/md"
import { Button } from "@/components/UI/Button"

import { Image } from "@/components/Image"
import { BannerProps } from "@/lib/data-types"

interface BannerShopProps {
  content: BannerProps[]
}

export const BannerShop = React.forwardRef<HTMLDivElement, BannerShopProps>(
  (props, ref) => {
    const { content } = props

    const arrowClass =
      "justify-center content-center bg-[#F39C12] hover:bg-theme-800 hover:text-white p-2 cursor-pointer border-none ring-0 absolute rounded-full top-[48%]"

    return (
      <div className="flex h-full items-center justify-center" ref={ref}>
        <div className="relative h-[400px] w-full overflow-hidden rounded-md">
          <Button
            aria-label="Prev"
            id="prev"
            variant="outline"
            className={`${arrowClass} left-[5%] z-[99]`}
          >
            <MdArrowBack aria-label="Prev" />
          </Button>
          <Button
            aria-label="Next"
            id="next"
            variant="outline"
            className={`${arrowClass} right-[5%] z-[99]`}
          >
            <MdArrowForward aria-label="Next" />
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
                  <Image
                    src={c.url}
                    className="relative aspect-video h-[inherit] w-[inherit]"
                    alt="Gamedaim Shop"
                  />

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
                      <MdArrowBack />
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
                      <MdArrowForward />
                    </a>
                  </Button>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    )
  },
)
