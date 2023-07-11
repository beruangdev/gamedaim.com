import * as React from "react"
import NextLink from "next/link"

import { Button, ButtonGroup } from "@/components/UI/Button"
import { Image } from "@/components/Image"
import { Ad } from "@/components/Ad"
import { ArticleInfo } from "@/components/ArticleInfo"
import { StaticShare } from "@/components/Share"

import {
  AdDataProps,
  ArticleDataProps,
  LanguageTypeData,
} from "@/lib/data-types"
import {
  WpCategoriesDataProps,
  WpSinglePostDataProps,
  WpTagsDataProps,
} from "@/lib/wp-data-types"
import { wpPrimaryCategorySlug } from "@/utils/helper"

interface PostProps {
  postData: {
    id: string
    postId?: number
    title: string
    content: string
    authorName: string
    authorUrl: string
    authorImg: string
    slug: string
    categories: {
      title: string | undefined
      slug: string
      name?: string
    }[]
    tags?: WpTagsDataProps[]
    date: string
    featuredImageCaption: string
    featuredImageUrl: string
    featuredImageAlt: string
  }
  posts: WpSinglePostDataProps[] | ArticleDataProps[] | null
  isWP?: boolean
  adsSingleArticleAbove: AdDataProps[] | null
  adsSingleArticleBelow: AdDataProps[] | null
  adsSingleArticleInline: AdDataProps[] | null
  adsSingleArticlePopUp: AdDataProps[] | null
  locale: LanguageTypeData
  firstContent: React.ReactNode | null
}

export const ArticleScroll = React.forwardRef<HTMLDivElement, PostProps>(
  (props, ref) => {
    const {
      isWP,
      postData,
      adsSingleArticleAbove,
      adsSingleArticleBelow,
      adsSingleArticleInline,
      locale,
      firstContent,
    } = props
    const {
      title,
      authorName,
      authorUrl,
      authorImg,
      categories,
      featuredImageCaption,
      featuredImageUrl,
      featuredImageAlt,
      date,
      slug,
    } = postData

    let primaryData
    if (isWP) {
      const { primary } = wpPrimaryCategorySlug(
        categories as WpCategoriesDataProps[],
      )
      primaryData = primary
    }

    return (
      <>
        <article id={postData?.slug} ref={ref} className="article-divider px-4">
          <ButtonGroup className="space-x-2">
            {categories?.map((category, i) => {
              if (i < 2) {
                return (
                  <Button
                    size={null}
                    key={category.name}
                    aria-label={isWP ? category.name : category.title}
                    className="mb-2 rounded-full px-3 py-1 uppercase"
                  >
                    <NextLink
                      aria-label={isWP ? category.name : category.title}
                      className="text-[11px]"
                      href={
                        isWP
                          ? `/${category.slug}`
                          : `/article/topic/${category.slug}`
                      }
                    >
                      {isWP ? category.name : category.title}
                    </NextLink>
                  </Button>
                )
              }
              return
            })}
          </ButtonGroup>
          <h1 className="border-border mb-2 mt-4 line-clamp-none border-b pb-2 text-[25px] font-bold leading-[1.7] md:border-none md:text-[40px] md:leading-[43px]">
            {title}
          </h1>
          {isWP && (
            <div className="mb-2">
              <ArticleInfo
                authorName={authorName}
                authorAvatarUrl={authorImg}
                authorSlug={authorUrl}
                date={date}
              />
            </div>
          )}
          {featuredImageUrl && (
            <>
              <div className="relative aspect-video w-full">
                <Image
                  src={featuredImageUrl}
                  className="max-w-auto relative aspect-video w-full overflow-hidden rounded object-cover"
                  alt={featuredImageAlt}
                  sizes="(max-width: 768px) 300px, 500px"
                />
              </div>
              {featuredImageCaption && (
                <span
                  className="text-foreground text-center text-xs italic"
                  dangerouslySetInnerHTML={{ __html: featuredImageCaption }}
                />
              )}
            </>
          )}
          <div className="mt-[30px] flex flex-col">
            <StaticShare
              locale={locale}
              title={title}
              categorySlug={isWP ? (primaryData?.slug as string) : "article"}
              postSlug={slug}
            />
            <section className="article-body mb-4 max-h-[300px] space-y-4 overflow-y-hidden pt-4">
              {adsSingleArticleAbove &&
                adsSingleArticleAbove.length > 0 &&
                adsSingleArticleAbove.map((ad: AdDataProps) => {
                  return <Ad ad={ad} />
                })}
              {firstContent}
              {adsSingleArticleInline &&
                adsSingleArticleInline.length > 0 &&
                adsSingleArticleInline.map((ad: AdDataProps) => {
                  return <Ad ad={ad} />
                })}

              {adsSingleArticleBelow &&
                adsSingleArticleBelow.length > 0 &&
                adsSingleArticleBelow.map((ad: AdDataProps) => {
                  return <Ad ad={ad} />
                })}
            </section>
            <div className="before:from-background relative my-4 flex justify-center from-60% to-40% before:absolute before:bottom-[99%] before:right-0 before:block before:h-[150px] before:w-full before:bg-gradient-to-t  before:to-transparent">
              <NextLink
                href={`/${
                  isWP ? (primaryData?.slug as string) : "article"
                }/${slug}`}
              >
                <Button type="button">Read more</Button>
              </NextLink>
            </div>
          </div>
        </article>
      </>
    )
  },
)
