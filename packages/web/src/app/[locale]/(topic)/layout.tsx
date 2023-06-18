import * as React from "react"
import { MainContainer } from "@/components/Container/MainContainer"

interface TopicsLayoutProps {
  children: React.ReactNode
}

export default function TopicsLayout(props: TopicsLayoutProps) {
  const { children } = props

  return <MainContainer>{children}</MainContainer>
}
