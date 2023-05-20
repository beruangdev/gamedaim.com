import * as React from "react"
import { DashboardContainer } from "../container"
import { AdminRole } from "@/components/Auth"

export const metadata = {
  title: "Dashboard Users",
  description: "Dashboard Users",
}

interface DashboardUserLayoutProps {
  children: React.ReactNode
}

export default function DashboardUserLayout(props: DashboardUserLayoutProps) {
  const { children } = props

  return (
    <AdminRole>
      <DashboardContainer>{children}</DashboardContainer>
    </AdminRole>
  )
}
