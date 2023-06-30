import * as React from "react"
import { ShopContainer } from "@/components/Container/ShopContainer"

interface ArticlesLayoutProps {
  children: React.ReactNode
}

export default function ArticlesLayout(props: ArticlesLayoutProps) {
  const { children } = props

  return <ShopContainer>{children}</ShopContainer>
}
