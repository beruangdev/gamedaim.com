"use client"

import * as React from "react"
import useSWR from "swr"

import { Button } from "@/components/UI/Button"
import { Icon } from "@/components/UI/Icon"
import { SearchNavForm } from "@/components/Form"
import { SearchCardWP } from "@/components/Card"
import { ListSearchCardShop } from "@/components/List"
import {
  ArticleDataProps,
  PriceListPostPaidProps,
  PriceListPrePaidProps,
} from "@/lib/data-types"

import { WpSinglePostDataProps } from "@/lib/wp-data-types"
import { DownloadDataProps } from "@/lib/data-types"
import { getAllBrandTopUp } from "@/lib/api/server/top-up"
import { wpGetPostsBySearch } from "@/lib/api/server/wp-posts"
import { searchArticlesByLangAction } from "@/lib/api/server/article"
import { searchDownloadsByLangAction } from "@/lib/api/server/download"
import { splitUriWP } from "@/utils/helper"

export const SearchWP = () => {
  const [searchQuery, setSearchQuery] = React.useState("")
  const [searched, setSearched] = React.useState(false)
  const [postsWP, setPostsWP] = React.useState<WpSinglePostDataProps[] | null>(
    [],
  )
  const [downloads, setDownloads] = React.useState<DownloadDataProps[]>([])
  const [articles, setArticles] = React.useState<ArticleDataProps[]>([])
  const [products, setProducts] = React.useState<
    (PriceListPrePaidProps | PriceListPostPaidProps)[]
  >([])
  const [showSearchMobile, setShowSearchMobile] = React.useState(false)

  React.useEffect(() => {
    const LoadProduct = async () => {
      const { brands } = await getAllBrandTopUp()

      if (brands) {
        setProducts(brands)
      }
    }
    LoadProduct()
  }, [])

  useSWR(
    searchQuery ? searchQuery : null,
    () => wpGetPostsBySearch(searchQuery),
    {
      onSuccess: (data) => {
        setPostsWP(data.posts)
      },
      revalidataIfStale: true,
    },
  )

  useSWR(
    searchQuery ? `/article/search/${searchQuery}` : null,
    () => searchArticlesByLangAction("id", searchQuery),
    {
      onSuccess: (data) => {
        if (data.data) {
          setArticles(data.data)
        }
      },
    },
  )

  useSWR(
    searchQuery ? `/download/search/${searchQuery}` : null,
    () => searchDownloadsByLangAction("id", searchQuery),
    {
      onSuccess: (data) => {
        if (data.data) {
          setDownloads(data.data)
        }
      },
    },
  )

  const handleSearch = (event: {
    target: { value: React.SetStateAction<string> }
  }) => {
    if (event.target.value.length > 2) {
      setSearched(true)
      setSearchQuery(event.target.value)
    } else if (searched && event.target.value.length < 2) {
      setSearched(false)
      setPostsWP([])
      setDownloads([])
      setArticles([])
    }
  }

  const filteredList = products.filter((list) => {
    return list.brand.toLowerCase().includes(searchQuery.toLowerCase())
  })

  const handleHideSearch = (event: MouseEvent) => {
    const target = event.target as HTMLElement
    if (!target.closest(".search")) {
      setShowSearchMobile(false)
      setSearched(false)
      setSearchQuery("")
      setPostsWP([])
      setDownloads([])
      setArticles([])
    }
  }

  React.useEffect(() => {
    document.body.addEventListener("click", handleHideSearch)
    return () => {
      document.body.removeEventListener("click", handleHideSearch)
    }
  }, [showSearchMobile])

  return (
    <>
      <div className="search">
        <div className="hidden md:block">
          <SearchNavForm handleSearch={(e) => handleSearch(e)} />
          {searched && searchQuery && (
            <div className="scrollbar scrollbarhide bg-background absolute top-[35px] my-2 max-h-[500px] w-full overflow-y-scroll rounded-md p-4 shadow-lg">
              <div className="mb-2">
                <h4 className="mb-2 border-b">Posts</h4>
                <div className="flex flex-col">
                  {articles &&
                    articles.length > 0 &&
                    articles.map((article) => {
                      return (
                        <React.Fragment key={article.title}>
                          <SearchCardWP
                            title={article.title}
                            url={`/article/${article.slug}`}
                            imgUrl={article.featuredImage?.url}
                          />
                        </React.Fragment>
                      )
                    })}
                  {postsWP && postsWP.length > 0
                    ? postsWP.map((post) => {
                        const newUri = splitUriWP(post.uri)
                        return (
                          <React.Fragment key={post.title}>
                            <SearchCardWP
                              title={post.title}
                              url={newUri}
                              imgUrl={post.featuredImage.sourceUrl}
                            />
                          </React.Fragment>
                        )
                      })
                    : postsWP &&
                      postsWP.length === 0 &&
                      articles.length === 0 && (
                        <>
                          <p>Posts not found</p>
                        </>
                      )}
                </div>
              </div>
              <div className="mb-2">
                <h4 className="mb-2 border-b">Downloads</h4>
                <div className="flex flex-col">
                  {downloads && downloads.length > 0 ? (
                    downloads.map((download) => {
                      return (
                        <React.Fragment key={download.title}>
                          <SearchCardWP
                            title={download.title}
                            url={`/download/${download.type.toLowerCase()}/${
                              download.slug
                            }`}
                            imgUrl={download.featuredImage?.url as string}
                          />
                        </React.Fragment>
                      )
                    })
                  ) : (
                    <>
                      <p>Downloads not found</p>
                    </>
                  )}
                </div>
              </div>
              <div className="mb-2">
                <h4 className="mb-2 border-b">Top Up</h4>
                <ListSearchCardShop resultList={filteredList} />
              </div>
            </div>
          )}
        </div>
        <div className="block md:hidden">
          <Button
            variant="ghost"
            size={null}
            onClick={() => {
              setShowSearchMobile((prev) => !prev)
            }}
          >
            <Icon.Search aria-label="Search" />
          </Button>
        </div>
        {showSearchMobile && (
          <div className="bg-background absolute right-[-123px] top-[60px] block w-[100vw] rounded-md p-5 shadow-lg md:hidden">
            <SearchNavForm handleSearch={(e) => handleSearch(e)} />
            {searched && searchQuery && (
              <div className="mt-4 max-h-[350px] overflow-y-scroll">
                <div className="mb-2">
                  <h4 className="mb-2 border-b">Posts</h4>
                  <div className="flex flex-col">
                    {articles &&
                      articles.length > 0 &&
                      articles.map((article) => {
                        return (
                          <React.Fragment key={article.title}>
                            <SearchCardWP
                              title={article.title}
                              url={`/article/${article.slug}`}
                              imgUrl={article.featuredImage?.url}
                            />
                          </React.Fragment>
                        )
                      })}
                    {postsWP && postsWP.length > 0
                      ? postsWP.map((post) => {
                          const newUri = splitUriWP(post.uri)
                          return (
                            <React.Fragment key={post.title}>
                              <SearchCardWP
                                title={post.title}
                                url={newUri}
                                imgUrl={post.featuredImage.sourceUrl}
                              />
                            </React.Fragment>
                          )
                        })
                      : postsWP &&
                        postsWP.length === 0 &&
                        articles.length === 0 && (
                          <>
                            <p>Posts not found</p>
                          </>
                        )}
                  </div>
                </div>
                <div className="mb-2">
                  <h4 className="mb-2 border-b">Downloads</h4>
                  <div className="flex flex-col">
                    {downloads && downloads.length > 0 ? (
                      downloads.map((download) => {
                        return (
                          <React.Fragment key={download.title}>
                            <SearchCardWP
                              title={download.title}
                              url={`/download/${download.type.toLowerCase()}/${
                                download.slug
                              }`}
                              imgUrl={download.featuredImage?.url as string}
                            />
                          </React.Fragment>
                        )
                      })
                    ) : (
                      <>
                        <p>Downloads not found</p>
                      </>
                    )}
                  </div>
                </div>
                <div className="mb-2">
                  <h4 className="mb-2 border-b">Top Up</h4>
                  <ListSearchCardShop resultList={filteredList} />
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </>
  )
}
