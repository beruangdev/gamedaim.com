import * as React from "react"
import { MainContainer } from "@/components/Container/MainContainer"

interface DashboardLayoutProps {
  children: React.ReactNode
}

export default function DashboardLayout(props: DashboardLayoutProps) {
  const { children } = props

  return <MainContainer>{children}</MainContainer>
}
