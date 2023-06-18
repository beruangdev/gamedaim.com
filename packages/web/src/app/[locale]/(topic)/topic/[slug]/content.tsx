import * as React from "react"
import NextLink from "next/link"

import { Ad } from "@/components/Ad"
import { Icon } from "@/components/UI/Icon"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
} from "@/components/UI/Breadcrumb"
import { ListArticleFeatured, ListDownload } from "@/components/List"
import { ArticleCardSide } from "@/components/Card"

import { AdDataProps, ArticleDataProps, TopicDataProps } from "@/lib/data-types"

interface TopicProps {
  topicArticle: TopicDataProps | null
  topicDownload: TopicDataProps | null
  adsBelowHeader: AdDataProps[] | null
}

export function TopicContent(props: TopicProps) {
  const { topicArticle, topicDownload, adsBelowHeader } = props

  return (
    <section className="flex w-full flex-col">
      <div className="relative mb-10 flex flex-col bg-gradient-to-r from-[#1e3799] to-[#0984e3] py-10">
        <div className="absolute top-1 ml-4">
          {adsBelowHeader &&
            adsBelowHeader.length > 0 &&
            adsBelowHeader.map((ad: AdDataProps) => {
              return <Ad ad={ad} />
            })}
          <Breadcrumb
            className="text-background"
            separator={
              <Icon.ChevronRight
                aria-label="Breadcrumb"
                className="text-background"
              />
            }
          >
            <BreadcrumbItem bold>
              <BreadcrumbLink className="text-background" href="/">
                Home
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbItem currentPage>
              <BreadcrumbLink
                className="text-background"
                href={`/${topicArticle?.slug}`}
              >
                {topicArticle?.title}
              </BreadcrumbLink>
            </BreadcrumbItem>
          </Breadcrumb>
        </div>
        {topicArticle && (
          <div className="self-center">
            <h1 className="text-background text-2xl">{topicArticle.title}</h1>
          </div>
        )}
      </div>
      <div className="mx-auto flex w-full flex-row md:max-[991px]:max-w-[750px] min-[992px]:max-[1199px]:max-w-[970px] lg:mx-auto lg:px-4 min-[1200px]:max-w-[1170px]">
        <div className="flex w-full flex-col px-4 lg:mr-4 lg:w-2/3">
          <div>
            <div className={"my-2 flex flex-row justify-between"}>
              <h2 className="text-xl">Article</h2>
              {topicArticle && (
                <NextLink
                  aria-label="See More Articles"
                  href={`/article/topic/${topicArticle.slug}`}
                >
                  <p className="text-primary">See more</p>
                </NextLink>
              )}
            </div>
            {topicArticle && topicArticle.articles && (
              <ListArticleFeatured listFeatured={topicArticle.articles} />
            )}
          </div>
          {topicDownload && topicDownload?.downloads && (
            <div>
              <div className={"my-2 flex flex-row justify-between"}>
                <h2 className="text-xl">Downloads</h2>
                <NextLink
                  aria-label="See More Downloads"
                  href={`/download/topic/${topicDownload.slug}`}
                >
                  <p className="text-primary">See more</p>
                </NextLink>
              </div>
              <ListDownload listDownloads={topicDownload.downloads} />
            </div>
          )}
        </div>
        <aside className="hidden w-4/12 px-4 lg:block">
          <div className="border-border sticky top-8 rounded-xl border p-4">
            <div className="mb-4">
              <h4 className="text-transparent">
                <span className="after:absolute after:left-1/2 after:top-[40px] after:ml-[-25px] after:h-[3px] after:w-[50px] after:border after:border-[#1e3799] after:bg-[#1e3799]">
                  Trending
                </span>
              </h4>
            </div>
            {topicArticle &&
              topicArticle.articles &&
              topicArticle.articles.map((article: ArticleDataProps) => {
                return <ArticleCardSide key={article.id} article={article} />
              })}
          </div>
        </aside>
      </div>
    </section>
  )
}
