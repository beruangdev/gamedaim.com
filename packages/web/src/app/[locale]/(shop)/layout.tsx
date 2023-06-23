import * as React from "react"
import { MainContainer } from "@/components/Container/MainContainer"

interface ArticlesLayoutProps {
  children: React.ReactNode
}

export default function ArticlesLayout(props: ArticlesLayoutProps) {
  const { children } = props

  return <MainContainer>{children}</MainContainer>
}
