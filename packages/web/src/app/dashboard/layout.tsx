import * as React from "react"
import { DashboardContainer } from "./container"
import { AdminOrAuthorRole } from "@/components/Auth"

export const metadata = {
  title: "Dashboard",
  description: "Dashboard",
}

interface DashboardLayoutProps {
  children: React.ReactNode
}

export default function DashboardLayout(props: DashboardLayoutProps) {
  const { children } = props

  return (
    <AdminOrAuthorRole>
      <DashboardContainer>{children}</DashboardContainer>
    </AdminOrAuthorRole>
  )
}
