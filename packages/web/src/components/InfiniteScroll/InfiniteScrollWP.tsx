"use client"

import * as React from "react"

import { Button } from "@/components/UI/Button"
import { PostCard } from "@/components/Card"
import {
  wpGetAllPostsLoadMore,
  wpGetPostsByAuthorSlug,
  wpGetPostsByCategorySlug,
  wpGetPostsByTagSlug,
} from "@/lib/api/server/wp-posts"
import {
  WpInfinitePostsProps,
  WpSinglePostDataProps,
} from "@/lib/wp-data-types"
import { LanguageTypeData } from "@/lib/data-types"
import { WPPageInfoProps } from "@/lib/wp-data-types"
import { splitUriWP } from "@/utils/helper"

interface InfiniteScrollWPProps extends React.HTMLAttributes<HTMLDivElement> {
  id?: string
  posts: WpSinglePostDataProps[]
  pageInfo: WPPageInfoProps
  pageType: "home" | "category" | "author" | "tag"
  language: LanguageTypeData
}

export const InfiniteScrollWP = React.forwardRef<
  HTMLDivElement,
  InfiniteScrollWPProps
>((props, ref) => {
  const { id, posts, pageInfo, language, pageType, ...rest } = props

  const loadMoreRef = React.useRef<HTMLDivElement>(null)
  const [page, setPage] = React.useState<WPPageInfoProps>(pageInfo)
  const [list, setList] = React.useState<WpSinglePostDataProps[]>(posts)

  const handleObserver = React.useCallback(
    async (entries: IntersectionObserverEntry[]) => {
      const [target] = entries
      if (target.isIntersecting && page.hasNextPage == true) {
        if (pageType == "category") {
          const data = (await wpGetPostsByCategorySlug(
            id as string,
            page.endCursor,
            language.toLocaleUpperCase(),
          )) as unknown as WpInfinitePostsProps
          setList((list) => [...list, ...data.posts])
          setPage(data.pageInfo)
        } else if (pageType == "author") {
          const data = (await wpGetPostsByAuthorSlug(
            id as string,
            page.endCursor,
            language.toLocaleUpperCase(),
          )) as unknown as WpInfinitePostsProps
          setList((list) => [...list, ...data.posts])
          setPage(data.pageInfo)
        } else if (pageType == "tag") {
          const data = (await wpGetPostsByTagSlug(
            id as string,
            page.endCursor,
          )) as unknown as WpInfinitePostsProps
          setList((list) => [...list, ...data.posts])
          setPage(data.pageInfo)
        } else {
          const data = (await wpGetAllPostsLoadMore(
            page.endCursor,
            language.toLocaleUpperCase(),
          )) as unknown as WpInfinitePostsProps
          setList((list) => [...list, ...data.posts])
          setPage(data.pageInfo)
        }
      }
    },
    [id, language, page.endCursor, page.hasNextPage, pageType],
  )

  React.useEffect(() => {
    const lmRef = loadMoreRef.current
    const observer = new IntersectionObserver(handleObserver)

    if (loadMoreRef.current) observer.observe(loadMoreRef.current)
    return () => {
      if (lmRef) {
        observer.unobserve(lmRef)
      }
    }
  }, [handleObserver, pageType, posts])

  return (
    <div ref={ref} {...rest}>
      {list.map((post) => {
        const newUri = splitUriWP(post.uri)

        return (
          <PostCard
            key={post.id}
            src={post.featuredImage.sourceUrl}
            alt={post.featuredImage.altText}
            slug={newUri}
            title={post.title}
            excerpt={post.excerpt}
            authorName={post.author.name}
            authorAvatarUrl={post.author.avatar.url}
            authorUri={post.author.uri}
            date={post.date}
          />
        )
      })}
      <div ref={loadMoreRef}>
        <Button
          aria-label="No More Posts"
          loading={page.hasNextPage == true}
          className="!w-full !cursor-default"
        >
          {page.hasNextPage ? "Loading..." : "No More Posts"}
        </Button>
      </div>
    </div>
  )
})
