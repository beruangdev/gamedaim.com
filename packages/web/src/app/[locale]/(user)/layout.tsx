import * as React from "react"

import { TopNav } from "@/components/Navigation"
import { Container } from "@/components/UI/Container"
import { Footer } from "@/components/Footer"

export default function UserLayoutPage({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <TopNav />
      <Container className="mt-20 min-h-screen px-2 lg:px-72">
        {children}
      </Container>
      <Footer />
    </>
  )
}
