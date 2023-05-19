import * as React from "react"
import { Inter } from "next/font/google"

import { Toaster } from "@/components/UI/Toast"
import { ThemeProvider } from "@/components/Theme"
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
      <body className={inter.className}>
        <Toaster />
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  )
}
