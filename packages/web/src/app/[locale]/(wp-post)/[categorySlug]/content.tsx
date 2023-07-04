import * as React from "react"
import NextLink from "next/link"

import { Ad } from "@/components/Ad"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
} from "@/components/UI/Breadcrumb"
import { Icon } from "@/components/UI/Icon"
import { Button } from "@/components/UI/Button"
import { InfiniteScrollWP } from "@/components/InfiniteScroll"
import { PostCardSide } from "@/components/Card"
import {
  WpCategoriesDataProps,
  WPPageInfoProps,
  WpSinglePostDataProps,
} from "@/lib/wp-data-types"
import { AdDataProps, LanguageTypeData } from "@/lib/data-types"

import { splitUriWP } from "@/utils/helper"

interface CategoryProps {
  category: WpCategoriesDataProps | null | undefined
  posts: WpSinglePostDataProps[] | null | undefined
  pageInfo: WPPageInfoProps | null | undefined
  adsBelowHeader: AdDataProps[] | null
  locale: LanguageTypeData
}

export function CategoryContent(props: CategoryProps) {
  const { posts, category, pageInfo, adsBelowHeader, locale } = props

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
                href={`/${category?.slug}`}
              >
                {category?.name}
              </BreadcrumbLink>
            </BreadcrumbItem>
          </Breadcrumb>
        </div>
        <div className="self-center">
          <h1 className="text-background text-2xl">{category?.name}</h1>
        </div>
        <div className="mt-2 self-center">
          <NextLink aria-label={category?.name} href={`/${category?.slug}`}>
            <Button
              aria-label={category?.name}
              className="mr-2 border border-[#24272f] bg-[#1e3799]"
            >
              All
            </Button>
          </NextLink>
          {category &&
            category.children.nodes.map(
              (child: { slug: string; name: string; taxonomyName: string }) => {
                if (child.taxonomyName === "category") {
                  return (
                    <NextLink
                      aria-label={child.name}
                      href={`/${child.slug}`}
                      key={child.name}
                    >
                      <Button
                        aria-label={child.name}
                        className="mr-2 border border-[#24272f] bg-[#ffffff33] hover:bg-[#1e3799]"
                      >
                        {child.name}
                      </Button>
                    </NextLink>
                  )
                }
              },
            )}
        </div>
      </div>
      <div className="mx-auto flex w-full flex-row md:max-[991px]:max-w-[750px] min-[992px]:max-[1199px]:max-w-[970px] lg:mx-auto lg:px-4 min-[1200px]:max-w-[1170px]">
        <div className="flex w-full flex-col px-4 lg:w-8/12">
          {posts && category && pageInfo && (
            <InfiniteScrollWP
              pageType="category"
              posts={posts}
              id={category.slug}
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
