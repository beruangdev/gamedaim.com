import * as React from "react"
import { Inter } from "next/font/google"

import { ThemeProvider } from "@/components/Theme"
import { Toaster } from "@/components/Toaster"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Gamedaim",
  description: "Gamedaim",
}

interface RootLayoutProps {
  children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" suppressHydrationWarning>
      <ThemeProvider>
        <Toaster />
        <body className={inter.className}>
          <main>{children}</main>
        </body>
      </ThemeProvider>
    </html>
  )
}
