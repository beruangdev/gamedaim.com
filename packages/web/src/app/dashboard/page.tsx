"use client"
import * as React from "react"
import dynamic from "next/dynamic"

import { Icon } from "@/components/UI/Icon"
import { useGetArticlesCount } from "@/lib/api/client/article"
import { useGetAdsCount } from "@/lib/api/client/ad"
import { useGetTopicsCount } from "@/lib/api/client/topic"
import { useGetMediasCount } from "@/lib/api/client/media"
import { useGetCommentsCount } from "@/lib/api/client/comment"
import { useGetUsersCount } from "@/lib/api/client/user"

const BoxDashboard = dynamic(() =>
  import("@/components/Box").then((mod) => mod.BoxDashboard),
)

export default function Dashboard() {
  const { articlesCount } = useGetArticlesCount()
  const { adsCount } = useGetAdsCount()
  const { topicsCount } = useGetTopicsCount()
  const { mediasCount } = useGetMediasCount()
  const { commentsCount } = useGetCommentsCount()
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
              text="article"
            />
          )}
          {topicsCount !== undefined && (
            <BoxDashboard
              icon={<Icon.Topic className="h-5 w-5" />}
              count={topicsCount}
              text="topic"
            />
          )}
          {adsCount !== undefined && (
            <BoxDashboard
              icon={<Icon.Currency className="h-5 w-5" />}
              count={adsCount}
              text="ad"
            />
          )}
          {mediasCount !== undefined && (
            <BoxDashboard
              icon={<Icon.Media className="h-5 w-5" />}
              count={mediasCount}
              text="media"
            />
          )}
          {commentsCount !== undefined && (
            <BoxDashboard
              icon={<Icon.Comment className="h-5 w-5" />}
              count={commentsCount}
              text="comment"
            />
          )}
          {usersCount !== undefined && (
            <BoxDashboard
              icon={<Icon.Users className="h-5 w-5" />}
              count={usersCount}
              text="user"
            />
          )}
        </div>
      </div>
    </>
  )
}
