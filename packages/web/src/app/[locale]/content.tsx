"use client"

import * as React from "react"

import { Ad } from "@/components/Ad"
import { InfiniteScrollWP } from "@/components/InfiniteScroll"
import { ListPostFeatured } from "@/components/List"
import { PostCardSide } from "@/components/Card"
import { WPPageInfoProps, WpSinglePostDataProps } from "@/lib/wp-data-types"
import { AdDataProps, LanguageTypeData } from "@/lib/data-types"
import { splitUriWP } from "@/utils/helper"

interface HomeProps {
  adsBelowHeader: AdDataProps[] | null
  pageInfo: WPPageInfoProps | null | undefined
  posts: WpSinglePostDataProps[] | null
  locale: LanguageTypeData
}

export function IndexContent(props: HomeProps) {
  const { adsBelowHeader, posts, pageInfo, locale } = props

  const listFeatured = posts?.slice(0, 9)
  const listPost = posts?.slice(posts?.length / 2, posts?.length)

  return (
    <section className="flex w-full flex-col">
      {adsBelowHeader &&
        adsBelowHeader.length > 0 &&
        adsBelowHeader.map((ad: AdDataProps) => {
          return <Ad ad={ad} />
        })}
      {listFeatured && <ListPostFeatured listFeatured={listFeatured} />}
      <div className="mx-auto flex w-full flex-row md:max-[991px]:max-w-[750px] min-[992px]:max-[1199px]:max-w-[970px] min-[1200px]:max-w-[1170px]">
        <div className="flex w-full flex-col px-4 lg:w-8/12">
          {listPost && pageInfo && (
            <InfiniteScrollWP
              pageType="home"
              posts={listPost}
              pageInfo={pageInfo}
              language={locale}
            />
          )}
        </div>
        <aside className="hidden w-4/12 lg:block">
          <div className="border-border sticky top-8 rounded-xl border p-4">
            <div className="mb-4">
              <h4 className="text-transparent">
                <span className="after:absolute after:left-1/2 after:top-[40px] after:ml-[-25px] after:h-[3px] after:w-[50px] after:border after:border-[#1e3799] after:bg-[#1e3799]">
                  Trending
                </span>
              </h4>
            </div>
            {posts &&
              posts.map((post: WpSinglePostDataProps) => {
                const newUri = splitUriWP(post.uri)
                console.log(post.uri, newUri)

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
      </div>
    </section>
  )
}
