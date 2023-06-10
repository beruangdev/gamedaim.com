import NextLink from "next/link"
import { Metadata } from "next"

import { Button } from "@/components/UI/Button"

export const metadata: Metadata = {
  title: "404 Not Found",
  description: "404 Not Found",
}

export default function NotFound() {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <section className="bg-background flex h-screen items-center justify-center">
          <div className="mx-auto max-w-screen-xl px-4 py-8 lg:px-6 lg:py-16">
            <div className="mx-auto max-w-screen-sm text-center">
              <h1 className="text-primary mb-4 text-7xl font-extrabold tracking-tight lg:text-9xl">
                404
              </h1>
              <p className="text-foreground mb-4 text-3xl font-bold tracking-tight md:text-4xl">
                Something&apos;s missing.
              </p>
              <p className="text-foreground mb-4 text-lg font-light">
                Sorry, we can&apos;t find that page. You&apos;ll find lots to
                explore on the home page.
              </p>
              <NextLink aria-label="Go To Homepage" href="/">
                <Button aria-label="Go To Homepage">Back to Homepage</Button>
              </NextLink>
            </div>
          </div>
        </section>
      </body>
    </html>
  )
}
