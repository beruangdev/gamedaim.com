import * as React from "react"
import NextLink from "next/link"
import { useRouter } from "next/navigation"
import { Sidebar } from "."
import { Logo } from "@/components/Brand"
import { ThemeSwitcher } from "@/components/Theme"
import { Icon } from "@/components/UI/Icon"
import { useLogout } from "@/hooks/use-logout"
import { useCurrentUser } from "@/hooks/use-current-user"

export interface SidebarDashboardProps {}

export const SidebarDashboard = React.forwardRef<
  HTMLDivElement,
  SidebarDashboardProps
>((props, ref) => {
  const { ...rest } = props

  const router = useRouter()

  const { user: currentUser } = useCurrentUser()
  const { logout } = useLogout()

  return (
    <Sidebar ref={ref} {...rest}>
      <NextLink
        href="/"
        className="mx-auto my-0 flex items-center justify-center p-5"
      >
        <Logo />
      </NextLink>
      <Sidebar.Item icon={<Icon.Dashboard />} href="/dashboard">
        Dashboard
      </Sidebar.Item>
      <Sidebar.Toggle icon={<Icon.Article />} title="Articles">
        <Sidebar.ToggleItem href="/dashboard/article">
          All Articles
        </Sidebar.ToggleItem>
        <Sidebar.ToggleItem href="/dashboard/article/new">
          Add new article
        </Sidebar.ToggleItem>
      </Sidebar.Toggle>
      <Sidebar.Toggle icon={<Icon.Article />} title="Articles">
        <Sidebar.ToggleItem href="/dashboard/download">
          All Downloads
        </Sidebar.ToggleItem>
        <Sidebar.ToggleItem href="/dashboard/download/new">
          Add new download
        </Sidebar.ToggleItem>
      </Sidebar.Toggle>
      {currentUser?.user?.role === "ADMIN" && (
        <Sidebar.Toggle icon={<Icon.Topic />} title="Topics">
          <Sidebar.ToggleItem href="/dashboard/topic">
            All Topics
          </Sidebar.ToggleItem>
          <Sidebar.ToggleItem href="/dashboard/topic/new">
            Add new topic
          </Sidebar.ToggleItem>
        </Sidebar.Toggle>
      )}
      {currentUser?.user?.role === "ADMIN" && (
        <Sidebar.Toggle icon={<Icon.Currency />} title="Ads">
          <Sidebar.ToggleItem href="/dashboard/ad">All Ads</Sidebar.ToggleItem>
          <Sidebar.ToggleItem href="/dashboard/ad/new">
            Add new ad
          </Sidebar.ToggleItem>
        </Sidebar.Toggle>
      )}
      <Sidebar.Toggle icon={<Icon.Media />} title="Media">
        <Sidebar.ToggleItem href="/dashboard/media">Library</Sidebar.ToggleItem>
        <Sidebar.ToggleItem href="/dashboard/media/new">
          Add new
        </Sidebar.ToggleItem>
      </Sidebar.Toggle>
      {currentUser?.user?.role === "ADMIN" && (
        <>
          <Sidebar.Item icon={<Icon.Comment />} href="/dashboard/comment">
            Comments
          </Sidebar.Item>
          <Sidebar.Toggle icon={<Icon.Users />} title="Users">
            <Sidebar.ToggleItem href="/dashboard/user">
              All users
            </Sidebar.ToggleItem>
            <Sidebar.ToggleItem href="/dashboard/user/new">
              Add new
            </Sidebar.ToggleItem>
          </Sidebar.Toggle>
          <Sidebar.Item icon={<Icon.Settings />} href="/dashboard/setting">
            Settings
          </Sidebar.Item>
        </>
      )}
      <Sidebar.Item icon={<Icon.Shop />} href="/dashboard/shop">
        Shop
      </Sidebar.Item>
      <div className="py-5">
        <Sidebar.Item icon={<Icon.Person />} href="/setting/user/profile">
          Profile
        </Sidebar.Item>
        <Sidebar.Item
          icon={<Icon.Logout />}
          onClick={() => {
            logout && logout()
            router.push("/")
          }}
        >
          Log Out
        </Sidebar.Item>
        <div className="absolute bottom-0 left-0 m-5">
          <ThemeSwitcher />
        </div>
      </div>
    </Sidebar>
  )
})
