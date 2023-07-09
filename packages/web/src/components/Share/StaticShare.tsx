import * as React from "react"

import env from "env"
import { ShareButtonArticle } from "./ShareButtonArticle"
import { type LanguageTypeData } from "@/lib/data-types"

interface StaticShareProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string
  categorySlug: string
  postSlug: string
  locale: LanguageTypeData
}

export const StaticShare = React.forwardRef<HTMLDivElement, StaticShareProps>(
  (props, ref) => {
    const { title, categorySlug, postSlug, locale, ...rest } = props
    return (
      <div
        className="grid w-full grid-flow-col grid-rows-1 space-x-2"
        ref={ref}
        {...rest}
      >
        <ShareButtonArticle
          url={
            locale === "id"
              ? `${env.SiTE_URL}/${categorySlug}/${postSlug}`
              : `${env.EN_SiTE_URL}/${categorySlug}/${postSlug}`
          }
          text={title}
        />
      </div>
    )
  },
)
