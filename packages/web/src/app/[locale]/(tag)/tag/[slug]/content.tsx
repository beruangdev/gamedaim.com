import * as React from "react"
import NextLink from "next/link"

import { PostCardSide } from "@/components/Card"
import { Ad } from "@/components/Ad"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
} from "@/components/UI/Breadcrumb"
import { Icon } from "@/components/UI/Icon"
import { Button } from "@/components/UI/Button"
import { InfiniteScrollWP } from "@/components/InfiniteScroll"

import {
  WPPageInfoProps,
  WpSinglePostDataProps,
  WpTagsDataProps,
} from "@/lib/wp-data-types"
import { AdDataProps } from "@/lib/data-types"
import { splitUriWP } from "@/utils/helper"

interface TagProps {
  tag: WpTagsDataProps | null | undefined
  posts: WpSinglePostDataProps[] | null | undefined
  pageInfo: WPPageInfoProps | null | undefined
  adsBelowHeader: AdDataProps[] | null
}

export function TagContent(props: TagProps) {
  const { posts, pageInfo, tag, adsBelowHeader } = props

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
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbItem currentPage>
              <BreadcrumbLink href={`/${tag?.slug}`}>
                {tag?.name}
              </BreadcrumbLink>
            </BreadcrumbItem>
          </Breadcrumb>
        </div>
        <div className="self-center">
          <h1 className="text-background text-2xl">{tag?.name}</h1>
        </div>
        <div className="self-center">
          <NextLink aria-label={tag?.name} href={`/${tag?.slug}`}>
            <Button
              aria-label={tag?.name}
              className="mr-2 border border-[#24272f] bg-[#1e3799]"
            >
              All
            </Button>
          </NextLink>
        </div>
      </div>
      <div className="mx-auto flex w-full flex-row md:mx-auto md:max-[991px]:max-w-[750px] min-[992px]:max-[1199px]:max-w-[970px] min-[1200px]:max-w-[1170px]">
        <div className="flex w-full flex-col px-4 lg:w-8/12">
          {posts && pageInfo && (
            <InfiniteScrollWP
              pageType="tag"
              posts={posts}
              id={tag?.slug}
              pageInfo={pageInfo}
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
            {posts &&
              posts.map((post: WpSinglePostDataProps) => {
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
      </div>
    </section>
  )
}
