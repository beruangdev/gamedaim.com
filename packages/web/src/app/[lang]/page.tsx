import * as React from "react"
import NextLink from "next/link"

import { Container } from "@/components/UI/Container"
import { Footer } from "@/components/Footer"
import { TopNav } from "@/components/Navigation"

export default function IndexPage() {
  return (
    <>
      <TopNav />
      <Container className="mt-20 min-h-screen px-2 lg:px-72">
        <NextLink href="/dashboard">dashboard</NextLink>
        <div className="text-success">Index</div>
      </Container>
      <Footer />
    </>
  )
}
