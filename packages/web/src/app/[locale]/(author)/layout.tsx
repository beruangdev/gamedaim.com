import * as React from "react"
import { MainContainer } from "@/components/Container/MainContainer"

interface AuthorsLayoutProps {
  children: React.ReactNode
}

export default function AuthorsLayout(props: AuthorsLayoutProps) {
  const { children } = props

  return <MainContainer>{children}</MainContainer>
}
