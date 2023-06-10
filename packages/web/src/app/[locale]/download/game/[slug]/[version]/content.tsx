import * as React from "react"

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
} from "@/components/UI/Breadcrumb"
import { Icon } from "@/components/UI/Icon"
import { Image } from "@/components/Image"
import { ListDownload } from "@/components/List"
import { DownloadCardSide } from "@/components/Card"
import { DownloadDataProps, DownloadFileDataProps } from "@/lib/data-types"

import { DownloadButtonAction } from "./downloadaction"

interface DownloadGameVersionProps {
  download: DownloadDataProps | null
  downloadFile: DownloadFileDataProps | null
  downloads: DownloadDataProps[] | null
}

export function DownloadGameVersion(props: DownloadGameVersionProps) {
  const { downloadFile, download, downloads } = props

  return (
    <section className="flex w-full flex-col">
      <div className="mx-auto flex w-full flex-row max-[991px]:px-4 md:max-[991px]:max-w-[750px] min-[992px]:max-[1199px]:max-w-[970px] min-[1200px]:max-w-[1170px]">
        <div className="flex w-full flex-col overflow-x-hidden px-4 lg:mr-4">
          <Breadcrumb separator={<Icon.ChevronRight aria-label="Breadcrumb" />}>
            <BreadcrumbItem bold>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbItem>
              <BreadcrumbLink href="/download/app">Game</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbItem currentPage>
              <BreadcrumbLink href={`/${download?.slug}`}>
                {download?.title}
              </BreadcrumbLink>
            </BreadcrumbItem>
          </Breadcrumb>
          <div className={"my-5 flex flex-col space-x-2 space-y-2 lg:flex-row"}>
            <div className={"w-full space-y-4"}>
              <div
                id="download"
                className="bg-background rounded-xl p-7 shadow-md"
              >
                <div className={"flex space-x-6"}>
                  <div className={"w-2/12"}>
                    <div className="relative h-[100px] w-full">
                      <Image
                        fill
                        src={download?.featuredImage?.url as string}
                        alt={download?.title as string}
                        className="rounded-lg"
                        sizes="(max-width: 768px) 30vw,
                    (max-width: 1200px) 20vw,
                    33vw"
                        quality={60}
                      />
                    </div>
                  </div>
                  <div className={"w-10/12 space-y-1"}>
                    <h2 className="line-clamp-1 text-xl md:text-3xl">
                      {download?.title}
                    </h2>

                    <div className="flex flex-wrap gap-2">
                      <p>{downloadFile?.version}</p>
                    </div>

                    <p>{download?.developer}</p>
                    <div className={"inline-flex space-x-2 pt-12"}>
                      <DownloadButtonAction
                        downloadLink={downloadFile?.downloadLink as string}
                        fileSize={downloadFile?.fileSize as string}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="w-full px-4">
                <div className={"my-2 flex flex-row justify-start"}>
                  <h2>Related</h2>
                </div>
                {<ListDownload listDownloads={downloads} />}
              </div>
            </div>
          </div>
        </div>
        <aside className="hidden w-4/12 px-4 lg:block">
          <div className="border-theme-100 dark:border-theme-700 sticky top-8 rounded-xl border p-4">
            <div className="mb-4">
              <h4 className="text-transparent">
                <span className="after:absolute after:left-1/2 after:top-[40px] after:ml-[-25px] after:h-[3px] after:w-[50px] after:border after:border-[#1e3799] after:bg-[#1e3799]">
                  Trending
                </span>
              </h4>
            </div>
            {downloads &&
              downloads.map((download: DownloadDataProps) => {
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
