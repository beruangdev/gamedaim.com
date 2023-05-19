"use client"

import { Button } from "ui"

export default function GlobalError({
  reset,
}: {
  error: Error
  reset: () => void
}) {
  return (
    <html>
      <body>
        <section className="bg-background flex h-screen items-center justify-center">
          <div className="mx-auto max-w-screen-xl px-4 py-8 lg:px-6 lg:py-16">
            <div className="mx-auto max-w-screen-sm text-center">
              <h1 className="text-primary mb-4 text-7xl font-extrabold tracking-tight lg:text-9xl">
                500
              </h1>
              <p className="text-foreground mb-4 text-3xl font-bold tracking-tight md:text-4xl">
                We are already working to solve the problem
              </p>
              <p className="text-foreground mb-4 text-lg font-light">
                We are already working to solve the problem
              </p>
              <Button onClick={() => reset()}>Try again</Button>
            </div>
          </div>
        </section>
      </body>
    </html>
  )
}
