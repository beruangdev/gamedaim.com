import * as React from "react"

import { Container } from "@/components/UI/Container"
import { Footer } from "@/components/Footer"
import { TopNav } from "@/components/Navigation"

export default function SettingUserProfilePage({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <TopNav />
      <Container className="mt-20 min-h-screen px-2 lg:px-64">
        {children}
      </Container>
      <Footer />
    </>
  )
}
