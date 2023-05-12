import NextLink from "next/link"
import { Container } from "@dafunda-ui-test/react"

import { TopNav } from "@/components/Navigation"

export default function Home() {
  return (
    <>
      <TopNav />
      <Container className="mt-20 min-h-screen px-2 lg:px-72">
        <NextLink href="/dashboard">dashboard</NextLink>
        <div className="text-primary/30">Index</div>
      </Container>
    </>
  )
}
