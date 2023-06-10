import * as React from "react"
import { HomeLayout } from "@/components/Layout/HomeLayout"

interface DashboardLayoutProps {
  children: React.ReactNode
}

export default function DashboardLayout(props: DashboardLayoutProps) {
  const { children } = props

  return <HomeLayout>{children}</HomeLayout>
}
