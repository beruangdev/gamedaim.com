"use client"

import * as React from "react"
import { useSearchParams } from "next/navigation"

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
} from "@/components/UI/Breadcrumb"
import { Icon } from "@/components/UI/Icon"
import { DownloadCard, DownloadCardSide } from "@/components/Card"
import { SearchDownload } from "@/components/Search"

import { useSearchDownloads } from "@/lib/api/client/download"
import { DownloadDataProps, LanguageTypeData } from "@/lib/data-types"

interface SearchProps {
  downloads: DownloadDataProps[] | null
  locale: LanguageTypeData
}

export function DownloadSearchContent(props: SearchProps) {
  const { downloads, locale } = props
  const searchParams = useSearchParams()

  const search = searchParams.get("q")

  const { downloads: resultsData } = useSearchDownloads(
    locale,
    search as string,
  )

  return (
    <section className="flex w-full flex-col">
      <div className="relative mb-10 flex flex-col bg-gradient-to-r from-[#1e3799] to-[#0984e3] py-10">
        <div className="absolute top-1 px-4">
          <Breadcrumb separator={<Icon.ChevronRight aria-label="Breadcrumb" />}>
            <BreadcrumbItem bold>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbItem>
              <BreadcrumbLink href="/download/">Download</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbItem currentPage>
              <BreadcrumbLink href={`/download/search?q=${search}`}>
                {search}
              </BreadcrumbLink>
            </BreadcrumbItem>
          </Breadcrumb>
        </div>
        <div className="self-center">
          <h2>
            {search !== undefined || null
              ? `Search results for "${search}"`
              : "Search"}
          </h2>
        </div>
      </div>
      <div className="mx-4 flex w-full flex-row px-4 md:mx-auto md:max-[991px]:max-w-[750px] min-[992px]:max-[1199px]:max-w-[970px] min-[1200px]:max-w-[1170px]">
        <div className="flex w-full flex-col lg:mr-4">
          <div className="mb-4 rounded-md p-2">
            <SearchDownload />
          </div>
          <div className="w-full px-4">
            {resultsData && resultsData.length > 0 ? (
              <div className="mb-4 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
                {resultsData &&
                  resultsData.map((download: DownloadDataProps) => {
                    return (
                      <DownloadCard
                        operatingSystem={download.operatingSystem}
                        slug={download.slug}
                        featuredImage={download.featuredImage}
                        title={download.title}
                        type={"App"}
                        downloadFiles={download.downloadFiles}
                      />
                    )
                  })}
              </div>
            ) : (
              <>
                <div>{search} not found. Please try with another keyword</div>
              </>
            )}
          </div>
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
            {downloads &&
              downloads.map((download) => {
                return (
                  <DownloadCardSide
                    key={download.id}
                    src={download.featuredImage?.url as string}
                    title={download.title}
                    slug={`/download/${download.type.toLowerCase()}/${
                      download.slug
                    }`}
                  />
                )
              })}
          </div>
        </aside>
      </div>
    </section>
  )
}
