"use client"

import * as React from "react"
import {
  HiOutlineCurrencyDollar,
  HiOutlineDocument,
  HiOutlineChatBubbleLeftEllipsis,
  HiOutlineFolderOpen,
  HiOutlineHashtag,
  HiOutlineUsers,
} from "react-icons/hi2"

import { BoxDashboard } from "@/components/Box"
import { DashboardContainer } from "@/components/Navigation"

import { useGetArticlesCount } from "@/lib/article"
import { useGetAdsCount } from "@/lib/ad"
import { useGetTopicsCount } from "@/lib/topic"
import { useGetMediasCount } from "@/lib/media"
import { useGetCommentsCount } from "@/lib/comment"
import { useGetUsersCount } from "@/lib/user"

export default function Dashboard() {
  const { articlesCount } = useGetArticlesCount()
  const { adsCount } = useGetAdsCount()
  const { topicsCount } = useGetTopicsCount()
  const { mediasCount } = useGetMediasCount()
  const { commentsCount } = useGetCommentsCount()
  const { usersCount } = useGetUsersCount()

  return (
    <DashboardContainer>
      <div className="my-8">
        <h2 className="text-3xl">Statistics</h2>
        <div className="my-8 grid grid-cols-2 gap-3 md:grid-cols-5">
          {articlesCount !== undefined && (
            <BoxDashboard
              icon={<HiOutlineDocument className="h-5 w-5" />}
              count={articlesCount}
              text="article"
            />
          )}
          {topicsCount !== undefined && (
            <BoxDashboard
              icon={<HiOutlineHashtag className="h-5 w-5" />}
              count={topicsCount}
              text="topic"
            />
          )}
          {adsCount !== undefined && (
            <BoxDashboard
              icon={<HiOutlineCurrencyDollar className="h-5 w-5" />}
              count={adsCount}
              text="ad"
            />
          )}
          {mediasCount !== undefined && (
            <BoxDashboard
              icon={<HiOutlineFolderOpen className="h-5 w-5" />}
              count={mediasCount}
              text="media"
            />
          )}
          {commentsCount !== undefined && (
            <BoxDashboard
              icon={<HiOutlineChatBubbleLeftEllipsis className="h-5 w-5" />}
              count={commentsCount}
              text="comment"
            />
          )}
          {usersCount !== undefined && (
            <BoxDashboard
              icon={<HiOutlineUsers className="h-5 w-5" />}
              count={usersCount}
              text="user"
            />
          )}
        </div>
      </div>
    </DashboardContainer>
  )
}
