import * as React from "react"

import NextLink from "next/link"
import { DownloadDataProps, DownloadFileDataProps } from "@/lib/data-types"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
} from "@/components/UI/Breadcrumb"
import { Icon } from "@/components/UI/Icon"
import { Image } from "@/components/Image"
import { Button } from "@/components/UI/Button"
import { SpecBox } from "@/components/Box"
import { DownloadCardSide } from "@/components/Card"
import { formatDate } from "@/utils/date"
import { ListDownload } from "@/components/List"

interface DownloadAppProps {
  download: DownloadDataProps | null
  downloads: DownloadDataProps[] | null
}

export function DownloadAppSlugContent(props: DownloadAppProps) {
  const { download, downloads } = props

  const fileVersion =
    download && download.downloadFiles.length > 0
      ? download?.downloadFiles[0]
      : undefined

  return (
    <div className="mx-auto flex w-full flex-row max-[991px]:px-4 md:max-[991px]:max-w-[750px] min-[992px]:max-[1199px]:max-w-[970px] min-[1200px]:max-w-[1170px]">
      <div className="flex w-full flex-col overflow-x-hidden px-4 lg:mr-4">
        <Breadcrumb separator={<Icon.ArrowForward />}>
          <BreadcrumbItem bold>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <BreadcrumbLink href="/download/app">App</BreadcrumbLink>
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
                <div className={"w-2/12 "}>
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
                    {download && download.downloadFiles.length > 0 && (
                      <>
                        <p>{fileVersion?.version}</p>
                        <NextLink
                          aria-label="Show All Version Page"
                          href={`/download/app/${download.slug}#all-version`}
                          className="text-success"
                        >
                          Show All Version
                        </NextLink>
                      </>
                    )}
                  </div>

                  <p>{download?.developer}</p>
                  <div className={"inline-flex space-x-2 pt-12"}>
                    <Button type="button" aria-label="Official Web">
                      <a href={download?.officialWeb} target="_blank">
                        Official Web
                      </a>
                    </Button>
                    {download && download.downloadFiles.length > 0 && (
                      <NextLink
                        aria-label="Download"
                        href={`/download/app/${download.slug}/${fileVersion?.slug}`}
                      >
                        <Button aria-label="Download">Download</Button>
                      </NextLink>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="p-7">{download?.content}</div>
            <div className="dark:bg-muted/80 bg-background grid grid-cols-3 grid-rows-2 rounded-lg shadow">
              <SpecBox
                icon={<Icon.Windows />}
                title="Sistem Operasi"
                value={download?.operatingSystem}
              />
              <SpecBox
                icon={<Icon.Code />}
                title="Developer"
                value={download?.developer}
              />
              <SpecBox
                icon={<Icon.Category />}
                title="Category"
                value={download?.topics && download.topics[0]?.title}
              />
              <SpecBox
                icon={<Icon.Update />}
                title="Last Update"
                value={formatDate(download?.createdAt as string, "LL")}
              />
              {download && download.downloadFiles.length > 0 && (
                <SpecBox
                  icon={<Icon.Folder />}
                  title="File Size"
                  value={fileVersion?.fileSize}
                />
              )}
              <SpecBox
                icon={<Icon.VpnKey />}
                title="License"
                value={download?.license}
              />
            </div>

            <div id="all-version" className="mb-5 space-y-2">
              <h2>All version</h2>
              <div className="bg-background grid grid-cols-3 gap-4 rounded-lg">
                {download &&
                  download.downloadFiles.length > 0 &&
                  download.downloadFiles.map(
                    (downloadFile: DownloadFileDataProps) => {
                      return (
                        <div className="bg-muted/20 cursor-pointer rounded p-2 shadow-md">
                          <NextLink
                            aria-label={downloadFile.title}
                            href={`/download/app/${download.slug}/${downloadFile.slug}`}
                          >
                            <p>{downloadFile.version}</p>
                            <p>{downloadFile.title}</p>
                            <p>{downloadFile.fileSize}</p>
                            <p>{formatDate(downloadFile.createdAt, "LL")}</p>
                          </NextLink>
                        </div>
                      )
                    },
                  )}
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
        <div className="border-muted/10 sticky top-8 rounded-xl border p-4">
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
  )
}
