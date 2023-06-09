"use client"
import * as React from "react"
import NextLink from "next/link"
import NextImage from "next/image"
import { Button } from "@/components/UI/Button"
import { Icon } from "@/components/UI/Icon"
import { TopicDataProps } from "@/lib/data-types"

interface ListDownloadCategoryProps
  extends React.HTMLAttributes<HTMLDivElement> {
  listCategories: TopicDataProps[]
}

export const ListDownloadCategory = React.forwardRef<
  HTMLDivElement,
  ListDownloadCategoryProps
>((props, ref) => {
  const { listCategories, ...rest } = props

  const [showArrow, setShowArrow] = React.useState<boolean>(false)
  const [prevDisplay, setPrevDisplay] = React.useState<string>("md:hidden")
  const [nextDisplay, setNextDisplay] = React.useState<string>("md:flex")

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
        {listCategories.map((list: TopicDataProps, i: number) => {
          return (
            <div
              key={i}
              className="dark:bg-theme-700 inline-flex w-[200px] flex-row overflow-hidden rounded-lg bg-white shadow-lg"
            >
              {list.featuredImage && (
                <NextImage
                  src={list.featuredImage.url}
                  className="relative h-[135px] w-[70px]"
                  alt={list.title}
                />
              )}
              <div className="flex w-[inherit] flex-col items-center justify-center">
                <NextLink aria-label={list.title} href={`/topic/${list.slug}`}>
                  <h3 className="mt-3 whitespace-normal px-3 text-base">
                    {list.title}
                  </h3>
                </NextLink>
                <div className="mb-3 px-3">
                  <p className="text-[14px]">{list?.description}</p>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
})
