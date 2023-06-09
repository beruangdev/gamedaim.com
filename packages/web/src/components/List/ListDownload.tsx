"use client"
import * as React from "react"
import { DownloadCard } from "@/components/Card"
import { DownloadDataProps } from "@/lib/data-types"
import { Button } from "../UI/Button"
import { Icon } from "../UI/Icon"

interface ListDownloadProps extends React.HTMLAttributes<HTMLDivElement> {
  listDownloads: DownloadDataProps[] | null
}

export const ListDownload = React.forwardRef<HTMLDivElement, ListDownloadProps>(
  (props, ref) => {
    const { listDownloads, ...rest } = props

    const [prevDisplay, setPrevDisplay] = React.useState<string>("md:hidden")
    const [nextDisplay, setNextDisplay] = React.useState<string>("md:flex")
    const [showArrow, setShowArrow] = React.useState(false)

    const arrowClass =
      "hidden justify-center content-center bg-white hover:bg-theme-800 hover:text-white p-2 cursor-pointer ring-0 absolute rounded-full"

    const contentRef: React.RefObject<HTMLDivElement> =
      React.useRef<HTMLDivElement>(null)
    const content: HTMLDivElement | null = contentRef.current

    React.useEffect(() => {
      if (content && content.scrollWidth > content.offsetWidth) {
        setShowArrow(true)
      }
    }, [content])

    function handleNextClick() {
      if (content) {
        content.scrollBy(250, 0)
        if (content.scrollLeft > 190) {
          setPrevDisplay("md:flex")
        }
        if (
          content.scrollLeft >=
          content.scrollWidth - content.offsetWidth - 200
        ) {
          setNextDisplay("md:hidden")
        }
      }
    }

    function handlePrevClick() {
      if (content) {
        content.scrollBy(-250, 0)
        if (content.scrollLeft < 200) {
          setPrevDisplay("md:hidden")
        }
        if (content.scrollLeft - 210) {
          setNextDisplay("md:flex")
        }
      }
    }

    return (
      <div className="relative" ref={ref} {...rest}>
        {showArrow && (
          <>
            <Button
              aria-label="Prev"
              onClick={handlePrevClick}
              id="prev"
              variant="outline"
              className={`${arrowClass} ${prevDisplay} left-0 top-[50%] z-[8] hidden -translate-y-2/4	translate-x-2/4`}
            >
              <Icon.ArrowBack aria-label="Prev" />
            </Button>
            <Button
              aria-label="Next"
              onClick={handleNextClick}
              id="next"
              variant="outline"
              className={`${arrowClass} md:flex ${nextDisplay} right-[40px] top-[50%] z-[8]	-translate-y-2/4 translate-x-2/4`}
            >
              <Icon.ArrowForward aria-label="Next" />
            </Button>
          </>
        )}
        <div
          ref={contentRef}
          className="scrollbar-hide scrollbar relative mb-4 block h-auto min-w-full space-x-5 overflow-x-auto overflow-y-auto whitespace-nowrap px-3"
        >
          {listDownloads?.map((list) => {
            return (
              <React.Fragment key={list.id}>
                <DownloadCard
                  operatingSystem={list.operatingSystem}
                  slug={list.slug}
                  title={list.title}
                  type={list.type}
                  featuredImage={list.featuredImage}
                  downloadFiles={list.downloadFiles}
                />
              </React.Fragment>
            )
          })}
        </div>
      </div>
    )
  },
)
