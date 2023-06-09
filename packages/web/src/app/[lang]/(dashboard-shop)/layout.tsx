import * as React from "react"
import { ShopDashboardContainer } from "./container"

interface DashboardLayoutProps {
  children: React.ReactNode
}

export default function ShopDashboardLayout(props: DashboardLayoutProps) {
  const { children } = props

  return <ShopDashboardContainer>{children}</ShopDashboardContainer>
}
