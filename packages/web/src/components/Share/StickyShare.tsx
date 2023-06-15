import * as React from "react"

import env from "env"
import { ShareButtonArticle } from "./ShareButtonArticle"

interface StickyShareProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string
  categorySlug: string
  postSlug: string
}

export const StickyShare = React.forwardRef<HTMLDivElement, StickyShareProps>(
  (props, ref) => {
    const { title, categorySlug, postSlug, ...rest } = props
    return (
      <div
        className="shadow-xs bg-background fixed bottom-0 left-0 top-[unset] z-40 mx-0 mb-0 mr-2 flex h-fit w-full flex-row items-center justify-center lg:sticky lg:bottom-[unset] lg:left-[unset] lg:top-20 lg:w-auto lg:bg-transparent lg:px-2 lg:shadow-none lg:dark:bg-transparent"
        ref={ref}
        {...rest}
      >
        <ShareButtonArticle
          url={`https://${env.DOMAIN}/${categorySlug}/${postSlug}`}
          text={title}
        />
      </div>
    )
  },
)
