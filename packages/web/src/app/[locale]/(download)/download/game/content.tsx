import * as React from "react"

import { DropdownLink } from "@/components/Dropdown"
import { SearchDownload } from "@/components/Search"
import { ListDownload, ListDownloadCategory } from "@/components/List"
import { InfiniteScrollDownload } from "@/components/InfiniteScroll"

import {
  LanguageTypeData,
  DownloadDataProps,
  TopicDataProps,
} from "@/lib/data-types"

interface GameProps {
  downloads: DownloadDataProps[] | null
  apps: DownloadDataProps[] | null
  topics: TopicDataProps[] | null
  downloadsCount: number | null
  locale: LanguageTypeData
}
export function DownloadGameContent(props: GameProps) {
  const { downloads, apps, topics, downloadsCount, locale } = props

  const totalPage = downloadsCount && Math.ceil(downloadsCount / 10)

  return (
    <div className="mx-auto flex w-full flex-col max-[991px]:px-4 md:max-[991px]:max-w-[750px] min-[992px]:max-[1199px]:max-w-[970px] min-[1200px]:max-w-[1170px]">
      <div className="bg-muted/10 flex flex-col space-y-8 rounded-md p-5">
        <div className="flex justify-between">
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
          <h2>Games</h2>
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
  )
}
