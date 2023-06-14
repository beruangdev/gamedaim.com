import * as React from "react"

import { DropdownLink } from "@/components/Dropdown"
import { SearchDownload } from "@/components/Search"
import { ListDownload, ListDownloadCategory } from "@/components/List"
import { InfiniteScrollDownload } from "@/components/InfiniteScroll"

import {
  LanguageTypeData,
  DownloadDataProps,
  TopicDataProps,
  AdDataProps,
} from "@/lib/data-types"
import { Ad } from "@/components/Ad"

interface AppProps {
  downloads: DownloadDataProps[] | null
  apps: DownloadDataProps[] | null
  topics: TopicDataProps[] | null
  downloadsCount: number | null
  locale: LanguageTypeData
  adsBelowHeader: AdDataProps[] | null
}
export function DownloadAppContent(props: AppProps) {
  const { downloads, apps, topics, downloadsCount, locale, adsBelowHeader } =
    props

  const totalPage = downloadsCount && Math.ceil(downloadsCount / 10)

  return (
    <>
      {adsBelowHeader &&
        adsBelowHeader.length > 0 &&
        adsBelowHeader.map((ad: AdDataProps) => {
          return <Ad ad={ad} />
        })}
      <div className="mx-auto flex w-full flex-col max-[991px]:px-4 md:max-[991px]:max-w-[750px] min-[992px]:max-[1199px]:max-w-[970px] min-[1200px]:max-w-[1170px]">
        <div className="bg-muted/10 flex flex-col space-y-8 rounded-md p-5">
          <div className="flex items-center justify-between gap-2">
            <div className="flex space-x-2">
              <DropdownLink list={topics} title={"Category"} />
            </div>
            <div>
              <SearchDownload />
            </div>
          </div>

          <div>
            <div className="mb-2">
              <h2>Pilih Kategori</h2>
            </div>
            {topics && <ListDownloadCategory listCategories={topics} />}
          </div>
        </div>

        <div className="w-full px-4">
          <div className={"my-2 flex flex-row justify-start"}>
            <h2>Apps</h2>
          </div>

          <ListDownload listDownloads={apps} />
        </div>
        <div className="w-full px-4">
          <div className={"my-2 flex flex-row justify-start"}>
            <h2>Newest</h2>
          </div>
          {downloads && totalPage && (
            <InfiniteScrollDownload
              locale={locale}
              posts={downloads}
              index={2}
              totalPage={totalPage}
            />
          )}
        </div>
      </div>
    </>
  )
}
