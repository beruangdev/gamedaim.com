import * as React from "react"
import NextLink from "next/link"
import { useRouter } from "next/navigation"

import { Sidebar } from "."
import { Icon } from "@/components/UI/Icon"
import { useLogout } from "@/hooks/use-logout"
import { useCurrentUser } from "@/hooks/use-current-user"
import { ThemeSwitcher } from "@/components/Theme"

export interface SidebarShopDashboardProps {}

export const SidebarShopDashboard = React.forwardRef<
  HTMLDivElement,
  SidebarShopDashboardProps
>((props, ref) => {
  const { ...rest } = props

  const router = useRouter()

  const { user: currentUser } = useCurrentUser()
  const { logout } = useLogout()

  return (
    <Sidebar ref={ref} {...rest}>
      {currentUser?.role === "ADMIN" && (
        <>
          <Sidebar.Item
            icon={<Icon.ArrowBack aria-label="Dashboard" />}
            href="/dashboard"
          >
            Back
          </Sidebar.Item>
          <Sidebar.Item icon={<Icon.Shop aria-label="Visit Shop" />}>
            <NextLink href="/shop" target="_blank">
              Visit Shop
            </NextLink>
          </Sidebar.Item>
          <Sidebar.Item
            icon={<Icon.Dashboard aria-label="Dashboard" />}
            href="/dashboard/shop"
          >
            Dashboard
          </Sidebar.Item>
          <Sidebar.Item
            icon={<Icon.Analytics aria-label="Dashboard" />}
            href="/dashboard/shop/transactions"
          >
            List Transactions
          </Sidebar.Item>
          <Sidebar.Toggle
            icon={<Icon.Discount aria-label="Voucher" />}
            title="Voucher"
          >
            <Sidebar.ToggleItem href="/dashboard/shop/voucher">
              All Vouchers
            </Sidebar.ToggleItem>
            <Sidebar.ToggleItem href="/dashboard/shop/voucher/new">
              Add new voucher
            </Sidebar.ToggleItem>
          </Sidebar.Toggle>
          <Sidebar.Item
            icon={<Icon.ShoppingCart aria-label="Manual Top Up" />}
            href="/dashboard/shop/manual-top-up"
          >
            Manual Top Up
          </Sidebar.Item>
          <Sidebar.Item
            icon={<Icon.Image aria-label="Product Media" />}
            href="/dashboard/shop/product-media"
          >
            Product Media
          </Sidebar.Item>
        </>
      )}
      <div className="py-5">
        {currentUser?.role === "ADMIN" && (
          <Sidebar.Item
            icon={<Icon.Settings aria-label="Dashboard" />}
            href="/dashboard/shop/setting"
          >
            Settings
          </Sidebar.Item>
        )}
        <Sidebar.Item
          icon={<Icon.Logout aria-label="Log Out" />}
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
