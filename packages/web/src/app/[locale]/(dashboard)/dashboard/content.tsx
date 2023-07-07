"use client"

import * as React from "react"
import dynamic from "next/dynamic"

import { Icon } from "@/components/UI/Icon"
import { useGetAdsCount } from "@/lib/api/client/ad"
import { useGetArticlesCount } from "@/lib/api/client/article"
import { useGetMediasCount } from "@/lib/api/client/media"
import { useGetTopicsCount } from "@/lib/api/client/topic"
import { useGetUsersCount } from "@/lib/api/client/user"
import { useGetDownloadsCount } from "@/lib/api/client/download"
import { useGetDownloadFilesCount } from "@/lib/api/client/download-file"

const BoxDashboard = dynamic(() =>
  import("@/components/Box").then((mod) => mod.BoxDashboard),
)

export function DashboardContent() {
  const { articlesCount } = useGetArticlesCount()
  const { adsCount } = useGetAdsCount()
  const { downloadsCount } = useGetDownloadsCount()
  const { downloadFilesCount } = useGetDownloadFilesCount()
  const { topicsCount } = useGetTopicsCount()
  const { mediasCount } = useGetMediasCount()
  const { usersCount } = useGetUsersCount()

  return (
    <>
      <div className="my-8">
        <h2 className="text-3xl">Statistics</h2>
        <div className="my-8 grid grid-cols-2 gap-3 md:grid-cols-5">
          {articlesCount !== undefined && (
            <BoxDashboard
              icon={<Icon.Article className="h-5 w-5" />}
              count={articlesCount}
              text="articles"
            />
          )}
          {downloadsCount !== undefined && (
            <BoxDashboard
              icon={<Icon.Download className="h-5 w-5" />}
              count={downloadsCount}
              text="downloads"
            />
          )}
          {downloadFilesCount !== undefined && (
            <BoxDashboard
              icon={<Icon.UploadFile className="h-5 w-5" />}
              count={downloadFilesCount}
              text="download files"
            />
          )}
          {topicsCount !== undefined && (
            <BoxDashboard
              icon={<Icon.Topic className="h-5 w-5" />}
              count={topicsCount}
              text="topics"
            />
          )}
          {adsCount !== undefined && (
            <BoxDashboard
              icon={<Icon.Currency className="h-5 w-5" />}
              count={adsCount}
              text="ads"
            />
          )}
          {mediasCount !== undefined && (
            <BoxDashboard
              icon={<Icon.Media className="h-5 w-5" />}
              count={mediasCount}
              text="medias"
            />
          )}
          {usersCount !== undefined && (
            <BoxDashboard
              icon={<Icon.Users className="h-5 w-5" />}
              count={usersCount}
              text="users"
            />
          )}
        </div>
      </div>
    </>
  )
}
