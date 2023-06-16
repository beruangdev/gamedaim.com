import * as React from "react"

import { Article } from "@/components/Article"
import { Ad } from "@/components/Ad"
import { ArticleCardSide } from "@/components/Card"
import { AdDataProps, ArticleDataProps } from "@/lib/data-types"

interface SingleArticleProps {
  article: ArticleDataProps | null
  articles: ArticleDataProps[] | null
  adsBelowHeader: AdDataProps[] | null
  adsSingleArticleAbove: AdDataProps[] | null
  adsSingleArticleBelow: AdDataProps[] | null
  adsSingleArticleInline: AdDataProps[] | null
  adsSingleArticlePopUp: AdDataProps[] | null
}

export default function SingleArticleContent(props: SingleArticleProps) {
  const {
    article,
    articles,
    adsBelowHeader,
    adsSingleArticleAbove,
    adsSingleArticleBelow,
    adsSingleArticleInline,
    adsSingleArticlePopUp,
  } = props

  const articleData = article && {
    id: article.id,
    content: article.content,
    excerpt: article.excerpt,
    title: article.title,
    authorName: article.authors[0].name,
    authorUrl: article.authors[0].username,
    authorUsername: article.authors[0].username,
    authorImg: article.authors[0].profilePicture?.url,
    categories: article.topics,
    featuredImageUrl: article.featuredImage.url,
    featuredImageAlt: article.featuredImage.name,
    featuredImageCaption: article.title,
    date: article.createdAt,
    slug: article.slug,
  }

  return (
    <div className="mx-auto flex w-full md:max-[991px]:max-w-[750px] min-[992px]:max-[1199px]:max-w-[970px] min-[1200px]:max-w-[1170px]">
      {adsBelowHeader &&
        adsBelowHeader.length > 0 &&
        adsBelowHeader.map((ad: AdDataProps) => {
          return <Ad ad={ad} />
        })}
      <section className="w-full lg:w-8/12">
        {articleData && (
          <Article
            isMain={true}
            posts={articles}
            postData={articleData}
            adsSingleArticleAbove={adsSingleArticleAbove}
            adsSingleArticleBelow={adsSingleArticleBelow}
            adsSingleArticleInline={adsSingleArticleInline}
            adsSingleArticlePopUp={adsSingleArticlePopUp}
          />
        )}
      </section>
      <aside className="hidden w-4/12 px-4 lg:block">
        <div className="border-border sticky top-8 rounded-xl border p-4">
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
  )
}
