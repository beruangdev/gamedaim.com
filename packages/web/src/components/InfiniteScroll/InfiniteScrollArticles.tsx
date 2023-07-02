"use client"

import * as React from "react"

import { Article, TransformContent } from "@/components/Article"
import { Button } from "@/components/UI/Button"
import { wpGetInfiniteScollArticles } from "@/lib/api/server/wp-posts"

import {
  WpCategoriesDataProps,
  WpInfinitePostsProps,
  WpSinglePostDataProps,
} from "@/lib/wp-data-types"
import { AdDataProps } from "@/lib/data-types"
import { parseAndSplitHTMLString, wpPrimaryCategorySlug } from "@/utils/helper"

interface ParsedContentProps {
  firstContent: React.ReactElement<
    unknown,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    string | React.JSXElementConstructor<any>
  >
  secondContent: React.ReactElement<
    unknown,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    string | React.JSXElementConstructor<any>
  >
}

interface PostProps {
  posts: WpSinglePostDataProps[]
  post: WpSinglePostDataProps
  adsBelowHeader: AdDataProps[]
  adsSingleArticleAbove: AdDataProps[]
  adsSingleArticleBelow: AdDataProps[]
  adsSingleArticleInline: AdDataProps[]
  adsSingleArticlePopUp: AdDataProps[]
}
export function InfiniteScrollArticles(props: PostProps) {
  const {
    posts,
    post,
    adsSingleArticleAbove,
    adsSingleArticleBelow,
    adsSingleArticleInline,
    adsSingleArticlePopUp,
  } = props

  const { categories } = post
  const { primary } = wpPrimaryCategorySlug(
    categories as WpCategoriesDataProps[],
  )
  const [articles, setArticles] = React.useState<WpSinglePostDataProps[]>([])
  const [parsedContents, SetParsedContents] = React.useState<
    ParsedContentProps[]
  >([])
  const [hasNextPage, setHasNextPage] = React.useState(true)
  const [endCursor, setEndCursor] = React.useState("")
  const LoaderRef = React.useRef(null)
  const articleRef = React.useRef(null)

  const handleObserver = React.useCallback(
    async (entries: IntersectionObserverEntry[]) => {
      const [target] = entries
      if (target.isIntersecting && hasNextPage == true) {
        const data = (await wpGetInfiniteScollArticles(
          primary.id,
          endCursor,
        )) as unknown as WpInfinitePostsProps
        const { firstHalf, secondHalf } = parseAndSplitHTMLString(
          data.posts[0]?.content as string,
        )

        const firstContent = await TransformContent(firstHalf as string)
        const secondContent = await TransformContent(secondHalf as string)
        SetParsedContents((list) => [...list, { firstContent, secondContent }])
        setArticles((list) => [...list, ...data.posts])
        setEndCursor(data.pageInfo.endCursor)
        setHasNextPage(data.pageInfo.hasNextPage)
      }
    },
    [endCursor, hasNextPage, primary],
  )

  React.useEffect(() => {
    const observer = new IntersectionObserver(handleObserver)

    if (LoaderRef.current) {
      observer.observe(LoaderRef.current)
    }

    return () => {
      if (observer) {
        observer.disconnect()
      }
    }
  }, [handleObserver])
  return (
    <>
      {articles.map((postData, i: number, arr) => {
        const postDatas = {
          id: postData.id,
          postId: postData.postId,
          content: postData.content,
          title: postData.title,
          authorName: postData.author.name,
          authorUrl: postData.author.slug,
          authorImg: postData.author.avatar.url,
          categories: postData.categories,
          featuredImageUrl: postData.featuredImage.sourceUrl,
          featuredImageAlt: postData.featuredImage.altText,
          featuredImageCaption: postData.featuredImage.caption,
          date: postData.date,
          slug: postData.slug,
          tags: postData.tags,
        }
        if (arr[i].slug == post.slug) {
          return null
        }
        return (
          <Article
            key={i}
            posts={posts}
            ref={articleRef}
            postData={postDatas}
            adsSingleArticleAbove={adsSingleArticleAbove}
            adsSingleArticleBelow={adsSingleArticleBelow}
            adsSingleArticleInline={adsSingleArticleInline}
            adsSingleArticlePopUp={adsSingleArticlePopUp}
            isWP={true}
            firstContent={parsedContents[i].firstContent}
            secondContent={parsedContents[i].secondContent}
          />
        )
      })}
      <div ref={LoaderRef}>
        <Button
          aria-label="No More Posts"
          loading={hasNextPage == true}
          className="w-full cursor-default"
        >
          {hasNextPage ? "Loading..." : "No More Posts"}
        </Button>
      </div>
    </>
  )
}
