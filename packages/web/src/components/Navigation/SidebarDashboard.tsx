import * as React from "react"
import NextLink from "next/link"
import {
  HiOutlineCurrencyDollar,
  HiOutlineDocument,
  HiOutlineFolderOpen,
  HiOutlineHashtag,
  HiOutlineUser,
  HiOutlineUsers,
  HiOutlineLogout,
} from "react-icons/hi"
import {
  HiOutlineSquares2X2,
  HiOutlineCog8Tooth,
  HiOutlineChatBubbleLeftEllipsis,
} from "react-icons/hi2"

import { Sidebar } from "."
import { Logo } from "@/components/Brand"
import { useAuthStore } from "@/store/auth"

export interface SidebarDashboardProps {}

export const SidebarDashboard = React.forwardRef<
  HTMLDivElement,
  SidebarDashboardProps
>((props, ref) => {
  const { ...rest } = props

  const { auth, logout } = useAuthStore()

  return (
    <Sidebar ref={ref} {...rest}>
      <NextLink
        href="/"
        className="mx-auto my-0 flex items-center justify-center p-5"
      >
        <Logo />
      </NextLink>
      <Sidebar.Item icon={<HiOutlineSquares2X2 />} href="/dashboard">
        Dashboard
      </Sidebar.Item>
      <Sidebar.Toggle icon={<HiOutlineDocument />} title="Articles">
        <Sidebar.ToggleItem href="/dashboard/articles">
          All Articles
        </Sidebar.ToggleItem>
        <Sidebar.ToggleItem href="/dashboard/articles/new">
          Add new article
        </Sidebar.ToggleItem>
      </Sidebar.Toggle>
      {auth.user?.role === "ADMIN" && (
        <Sidebar.Toggle icon={<HiOutlineHashtag />} title="Topics">
          <Sidebar.ToggleItem href="/dashboard/topics">
            All Topics
          </Sidebar.ToggleItem>
          <Sidebar.ToggleItem href="/dashboard/topics/new">
            Add new topic
          </Sidebar.ToggleItem>
        </Sidebar.Toggle>
      )}
      {auth.user?.role === "ADMIN" && (
        <Sidebar.Toggle icon={<HiOutlineCurrencyDollar />} title="Ads">
          <Sidebar.ToggleItem href="/dashboard/ads">All Ads</Sidebar.ToggleItem>
          <Sidebar.ToggleItem href="/dashboard/ads/new">
            Add new ad
          </Sidebar.ToggleItem>
        </Sidebar.Toggle>
      )}
      <Sidebar.Toggle icon={<HiOutlineFolderOpen />} title="Media">
        <Sidebar.ToggleItem href="/dashboard/media">Library</Sidebar.ToggleItem>
        <Sidebar.ToggleItem href="/dashboard/media/new">
          Add new
        </Sidebar.ToggleItem>
      </Sidebar.Toggle>
      {auth.user?.role === "ADMIN" && (
        <>
          <Sidebar.Item
            icon={<HiOutlineChatBubbleLeftEllipsis />}
            href="/dashboard/comments"
          >
            Comments
          </Sidebar.Item>
          <Sidebar.Toggle icon={<HiOutlineUsers />} title="Users">
            <Sidebar.ToggleItem href="/dashboard/users">
              All users
            </Sidebar.ToggleItem>
            <Sidebar.ToggleItem href="/dashboard/users/new">
              Add new
            </Sidebar.ToggleItem>
          </Sidebar.Toggle>
          <Sidebar.Item
            icon={<HiOutlineCog8Tooth />}
            href="/dashboard/settings"
          >
            Settings
          </Sidebar.Item>
        </>
      )}
      <div className="py-5">
        <Sidebar.Item icon={<HiOutlineUser />} href="/setting/user/profile">
          Profile
        </Sidebar.Item>
        <Sidebar.Item icon={<HiOutlineLogout />} onClick={() => logout()}>
          Log Out
        </Sidebar.Item>
      </div>
    </Sidebar>
  )
})
