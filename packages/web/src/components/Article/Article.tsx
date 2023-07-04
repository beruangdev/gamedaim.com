/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import * as React from "react"
import NextLink from "next/link"

import { Button, ButtonGroup } from "@/components/UI/Button"
import { Image } from "@/components/Image"
import { Ad } from "@/components/Ad"
import { ArticleInfo } from "@/components/ArticleInfo"
import { StickyShare } from "@/components/Share"

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
import {
  splitUriWP,
  wpPrimaryCategorySlug,
  wpTagPathBySlug,
} from "@/utils/helper"
import { useCurrentUser } from "@/hooks/use-current-user"
import { Icon } from "@/components/UI/Icon"
import { CommentForm } from "@/components/Form/CommentForm"

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
  isMain?: boolean
  isWP?: boolean
  adsSingleArticleAbove: AdDataProps[] | null
  adsSingleArticleBelow: AdDataProps[] | null
  adsSingleArticleInline: AdDataProps[] | null
  adsSingleArticlePopUp: AdDataProps[] | null
  firstContent: React.ReactNode | null
  secondContent: React.ReactNode | null
  locale: LanguageTypeData
}

export const Article = React.forwardRef<HTMLDivElement, PostProps>(
  (props, ref) => {
    const {
      posts,
      isMain,
      isWP,
      postData,
      adsSingleArticleAbove,
      adsSingleArticleBelow,
      adsSingleArticleInline,
      firstContent,
      secondContent,
      locale,
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
      tags,
    } = postData

    let primaryData
    if (isWP) {
      const { primary } = wpPrimaryCategorySlug(
        categories as WpCategoriesDataProps[],
      )
      primaryData = primary
    }

    const { user } = useCurrentUser()

    return (
      <>
        <article id={postData?.slug} ref={ref} className="article-divider px-4">
          <ButtonGroup className="space-x-2">
            {categories?.map((category) => {
              return (
                <Button
                  key={category.name}
                  aria-label={isWP ? category.name : category.title}
                  className="mb-2 rounded-full uppercase"
                >
                  <NextLink
                    aria-label={isWP ? category.name : category.title}
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
          <div className="flex">
            <StickyShare
              locale={locale}
              title={title}
              categorySlug={isWP ? (primaryData?.slug as string) : "article"}
              postSlug={slug}
            />
            <section className="article-body">
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
              {secondContent}
              {adsSingleArticleBelow &&
                adsSingleArticleBelow.length > 0 &&
                adsSingleArticleBelow.map((ad: AdDataProps) => {
                  return <Ad ad={ad} />
                })}
            </section>
          </div>
          <section className="mx-4 my-6 space-x-3 md:mx-12" id="tag">
            {tags &&
              tags.map((tag: { slug: string; name: string }) => {
                return (
                  <Button
                    variant="outline"
                    aria-label={tag.name}
                    size="sm"
                    key={tag.slug}
                    className="mb-2 rounded-full uppercase"
                  >
                    <NextLink
                      aria-label={tag.slug}
                      href={wpTagPathBySlug(tag.slug)}
                    >
                      {tag.name}
                    </NextLink>
                  </Button>
                )
              })}
          </section>
          <section className="mb-5" id="comment">
            {user?.id ? (
              <CommentForm
                postId={postData?.postId || postData.id}
                postType={isWP ? "wp-post" : "article"}
              />
            ) : (
              <NextLink href="/auth/login">
                <Button aria-label="Login" type="button">
                  <Icon.Login
                    aria-label="Login"
                    className="-ml-1 mr-2 h-4 w-4"
                  />{" "}
                  Login for comment
                </Button>
              </NextLink>
            )}
          </section>
          <section className="mb-20">
            {isMain === true && (
              <>
                <div className="mb-2">
                  <h4 className="text-primary border-primary/40 border-b-4">
                    Related Posts
                  </h4>
                </div>
                <div className="grid grid-cols-[repeat(1,1fr)] gap-4 md:grid-cols-2">
                  {posts &&
                    posts.map((post) => {
                      return (
                        <article
                          className="border-border border-b-2"
                          key={post.title}
                        >
                          <NextLink
                            aria-label={post.title}
                            href={
                              isWP
                                ? splitUriWP(
                                    (post as WpSinglePostDataProps).uri,
                                  )
                                : "/article/" + post.slug
                            }
                          >
                            <p className="hover:text-primary font-semibold">
                              {post.title}
                            </p>
                          </NextLink>
                        </article>
                      )
                    })}
                </div>
              </>
            )}
          </section>
        </article>
      </>
    )
  },
)
