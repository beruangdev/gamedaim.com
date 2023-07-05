import * as React from "react"

import { InfiniteScrollWP } from "@/components/InfiniteScroll"
import { Ad } from "@/components/Ad"
import { PostCardSide } from "@/components/Card"
import { AdDataProps, LanguageTypeData } from "@/lib/data-types"
import {
  WPPageInfoProps,
  WpAuthorsDataProps,
  WpSinglePostDataProps,
} from "@/lib/wp-data-types"
import { splitUriWP } from "@/utils/helper"

interface AuthorProps {
  posts: WpSinglePostDataProps[] | null | undefined
  listPosts: WpSinglePostDataProps[] | null | undefined

  pageInfo: WPPageInfoProps | null | undefined
  user: WpAuthorsDataProps | null | undefined
  adsBelowHeader: AdDataProps[] | null
  authorSlug: string
  locale: LanguageTypeData
}

export function AuthorContent(props: AuthorProps) {
  const { posts, pageInfo, listPosts, adsBelowHeader, authorSlug, locale } =
    props

  return (
    <section className="mx-auto flex w-full flex-row md:max-[991px]:max-w-[750px] min-[992px]:max-[1199px]:max-w-[970px] lg:px-4 min-[1200px]:max-w-[1170px]">
      {adsBelowHeader &&
        adsBelowHeader.length > 0 &&
        adsBelowHeader.map((ad: AdDataProps) => {
          return <Ad ad={ad} />
        })}
      <div className="flex w-full flex-col px-4 lg:w-8/12">
        {posts && pageInfo && (
          <InfiniteScrollWP
            pageType="author"
            posts={posts}
            id={authorSlug}
            pageInfo={pageInfo}
            language={locale}
          />
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
          {listPosts?.map((post: WpSinglePostDataProps) => {
            const newUri = splitUriWP(post.uri)
            return (
              <PostCardSide
                key={post.id}
                src={post.featuredImage.sourceUrl}
                alt={post.featuredImage.altText}
                title={post.title}
                slug={newUri}
              />
            )
          })}
        </div>
      </aside>
    </section>
  )
}
