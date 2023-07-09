import * as React from "react"

import {
  WpCategoriesDataProps,
  WpSinglePostDataProps,
} from "@/lib/wp-data-types"
import { AdDataProps, LanguageTypeData } from "@/lib/data-types"
import { Ad } from "@/components/Ad"
import { Article } from "@/components/Article"
import { InfiniteScrollArticles } from "@/components/InfiniteScroll"
import { PostCardSide } from "@/components/Card"

import { parseAndSplitHTMLString, wpPrimaryCategorySlug } from "@/utils/helper"
import { transformContent } from "@/hooks/use-transform-content"

interface PostProps {
  posts: WpSinglePostDataProps[] | null
  post: WpSinglePostDataProps | null
  adsBelowHeader: AdDataProps[] | null
  adsSingleArticleAbove: AdDataProps[] | null
  adsSingleArticleBelow: AdDataProps[] | null
  adsSingleArticleInline: AdDataProps[] | null
  adsSingleArticlePopUp: AdDataProps[] | null
  locale: LanguageTypeData
}
export async function PostContent(props: PostProps) {
  const {
    posts,
    post,
    adsBelowHeader,
    adsSingleArticleAbove,
    adsSingleArticleBelow,
    adsSingleArticleInline,
    adsSingleArticlePopUp,
    locale,
  } = props

  let categories
  if (post) {
    categories = post.categories
  }
  const { primary } = wpPrimaryCategorySlug(
    categories as WpCategoriesDataProps[],
  )
  let postData
  if (post) {
    postData = {
      id: post.id,
      postId: post.postId,
      content: post.content,
      title: post.title,
      authorName: post.author.name,
      authorUrl: post.author.slug,
      authorImg: post.author.avatar.url,
      categories: post.categories,
      featuredImageUrl: post.featuredImage.sourceUrl,
      featuredImageAlt: post.featuredImage.altText,
      featuredImageCaption: post.featuredImage.caption,
      date: post.date,
      slug: post.slug,
      tags: post.tags,
    }
  }
  const { firstHalf, secondHalf } = parseAndSplitHTMLString(
    post?.content as string,
  )
  const firstContent = await transformContent(
    firstHalf as string,
    postData?.title as string,
  )
  const secondContent = await transformContent(
    secondHalf as string,
    postData?.title as string,
  )
  return (
    <div className="mx-auto flex w-full md:max-[991px]:max-w-[750px] min-[992px]:max-[1199px]:max-w-[970px] min-[1200px]:max-w-[1170px]">
      {adsBelowHeader &&
        adsBelowHeader.length > 0 &&
        adsBelowHeader.map((ad: AdDataProps) => {
          return <Ad ad={ad} />
        })}
      <section className="w-full lg:w-8/12">
        {postData && (
          <Article
            isMain={true}
            posts={posts}
            postData={postData}
            isWP={true}
            adsSingleArticleAbove={adsSingleArticleAbove}
            adsSingleArticleBelow={adsSingleArticleBelow}
            adsSingleArticleInline={adsSingleArticleInline}
            adsSingleArticlePopUp={adsSingleArticlePopUp}
            firstContent={firstContent}
            secondContent={secondContent}
            locale={locale}
          />
        )}
        {posts && post && (
          <InfiniteScrollArticles
            posts={posts}
            post={post}
            locale={locale}
            adsBelowHeader={adsBelowHeader || []}
            adsSingleArticleAbove={adsSingleArticleAbove || []}
            adsSingleArticleBelow={adsSingleArticleBelow || []}
            adsSingleArticleInline={adsSingleArticleInline || []}
            adsSingleArticlePopUp={adsSingleArticlePopUp || []}
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
          {posts &&
            posts.map((post) => {
              return (
                <PostCardSide
                  key={post.id}
                  src={post.featuredImage.sourceUrl}
                  alt={post.featuredImage.altText}
                  slug={`/${primary.slug}/${post.slug}`}
                  title={post.title}
                />
              )
            })}
        </div>
      </aside>
    </div>
  )
}
