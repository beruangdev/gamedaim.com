import * as React from "react"
import { DashboardContainer } from "./container"

interface DashboardLayoutProps {
  children: React.ReactNode
}

export default function DashboardLayout(props: DashboardLayoutProps) {
  const { children } = props

  return (
    <>
      <DashboardContainer>{children}</DashboardContainer>
    </>
  )
}
