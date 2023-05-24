import * as React from "react"
import { DashboardContainer } from "../container"

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
    <>
      <DashboardContainer>{children}</DashboardContainer>
    </>
  )
}
