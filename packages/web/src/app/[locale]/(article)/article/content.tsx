import * as React from "react"

import { Ad } from "@/components/Ad"
import { ArticleCardSide } from "@/components/Card"
import { InfiniteScrollArticle } from "@/components/InfiniteScroll"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
} from "@/components/UI/Breadcrumb"
import { Icon } from "@/components/UI/Icon"

import {
  AdDataProps,
  ArticleDataProps,
  LanguageTypeData,
} from "@/lib/data-types"

interface ArticlesProps {
  articles: ArticleDataProps[] | [] | null
  articlesCount: number | null
  adsBelowHeader: AdDataProps[] | null
  locale: LanguageTypeData
}
export function ArticleContent(props: ArticlesProps) {
  const { adsBelowHeader, articles, articlesCount, locale } = props
  const totalPage = articlesCount && Math.ceil(articlesCount / 10)
  return (
    <section className="flex w-full flex-col">
      <div className="relative mb-10 flex flex-col bg-gradient-to-r from-[#1e3799] to-[#0984e3] py-10">
        <div className="absolute top-1 ml-4">
          {adsBelowHeader &&
            adsBelowHeader.length > 0 &&
            adsBelowHeader.map((ad: AdDataProps) => {
              return <Ad ad={ad} />
            })}
          <Breadcrumb separator={<Icon.ChevronRight aria-label="Breadcrumb" />}>
            <BreadcrumbItem bold>
              <BreadcrumbLink className="text-background" href="/">
                Home
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbItem currentPage>
              <BreadcrumbLink className="text-background" href="article">
                Articles
              </BreadcrumbLink>
            </BreadcrumbItem>
          </Breadcrumb>
        </div>
        <div className="self-center">
          <h4 className="text-background text-2xl">Gamedaim</h4>
        </div>
      </div>
      <div className="mx-auto flex w-full flex-row md:max-[991px]:max-w-[750px] min-[992px]:max-[1199px]:max-w-[970px] lg:mx-auto lg:px-4 min-[1200px]:max-w-[1170px]">
        <div className="flex w-full flex-col px-4 lg:w-8/12">
          {articles && totalPage && (
            <InfiniteScrollArticle
              index={2}
              posts={articles}
              pageType="articles"
              totalPage={totalPage}
              locale={locale}
            />
          )}
        </div>
        <aside className="hidden w-4/12 px-4 lg:block">
          <div className="sticky top-8 rounded-xl border p-4">
            <div className="mb-4">
              <h4 className="text-transparent">
                <span className="after:absolute after:left-1/2 after:top-[40px] after:ml-[-25px] after:h-[3px] after:w-[50px] after:border after:border-[#1e3799] after:bg-[#1e3799]">
                  Trending
                </span>
              </h4>
            </div>
            {articles &&
              articles.map((article: ArticleDataProps) => {
                return <ArticleCardSide key={article.id} article={article} />
              })}
          </div>
        </aside>
      </div>
    </section>
  )
}
