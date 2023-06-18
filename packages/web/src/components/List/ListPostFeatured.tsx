"use client"

import * as React from "react"

import { PostCardFeatured } from "@/components/Card"
import { Button } from "@/components/UI/Button"
import { Icon } from "@/components/UI/Icon"
import { WpSinglePostDataProps } from "@/lib/wp-data-types"

interface ListPostFeaturedProps extends React.HTMLAttributes<HTMLDivElement> {
  listFeatured: WpSinglePostDataProps[]
}

export const ListPostFeatured = React.forwardRef<
  HTMLDivElement,
  ListPostFeaturedProps
>((props, ref) => {
  const { listFeatured, ...rest } = props

  const [prevDisplay, setPrevDisplay] = React.useState<string>("md:hidden")
  const [nextDisplay, setNextDisplay] = React.useState<string>("md:flex")
  const [showArrow, setShowArrow] = React.useState<boolean>(false)

  const arrowClass =
    "hidden justify-center content-center bg-background hover:bg-foreground/80 hover:text-foreground p-2 cursor-pointer ring-0 absolute rounded-full"

  const contentRef: React.RefObject<HTMLDivElement> =
    React.useRef<HTMLDivElement>(null)
  const content: HTMLDivElement | null = contentRef.current

  React.useEffect(() => {
    if (listFeatured && content && content.scrollWidth > content.offsetWidth) {
      setShowArrow(true)
    }
  }, [content, listFeatured])

  function handleNextClick() {
    if (content) {
      content.scrollBy(200, 0)
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
      content.scrollBy(-200, 0)
      if (content.scrollLeft < 200) {
        setPrevDisplay("md:hidden")
      }
      if (content.scrollLeft - 210) {
        setNextDisplay("md:flex")
      }
    }
  }

  return (
    <div
      className="relative mx-auto w-full max-[991px]:px-4 md:max-[991px]:max-w-[750px] min-[992px]:max-[1199px]:max-w-[970px] min-[1200px]:max-w-[1170px]"
      ref={ref}
      {...rest}
    >
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
            className={`${arrowClass} md:flex ${nextDisplay} right-[40px] top-[50%] z-[8] -translate-y-2/4 translate-x-2/4`}
          >
            <Icon.ArrowForward aria-label="Next" />
          </Button>
        </>
      )}
      <div
        ref={contentRef}
        className="scrollbar-hide scrollbar relative mb-4 block h-auto min-w-full overflow-x-auto overflow-y-hidden whitespace-nowrap px-3"
      >
        {listFeatured.map((featuredItem, i: number) => {
          return (
            <div
              className={`inline-block whitespace-normal pr-[15px]`}
              key={featuredItem.slug}
            >
              <PostCardFeatured index={i} post={featuredItem} />
            </div>
          )
        })}
      </div>
    </div>
  )
})
