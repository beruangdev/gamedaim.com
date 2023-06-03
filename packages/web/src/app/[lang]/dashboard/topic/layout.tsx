import * as React from "react"

export const metadata = {
  title: "Topic Dashboard",
  description: "Topic Dashboard",
}

interface TopicDashboardLayoutProps {
  children: React.ReactNode
}

export default function TopicDashbaord(props: TopicDashboardLayoutProps) {
  const { children } = props

  return <>{children}</>
}
