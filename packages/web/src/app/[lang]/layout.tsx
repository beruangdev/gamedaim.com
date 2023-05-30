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
  params: { lang: string }
}

export function generateStaticParams() {
  return [{ lang: "en" }, { lang: "id" }]
}
export default function RootLayout({
  children,
  params: { lang },
}: RootLayoutProps) {
  return (
    <html lang={lang}>
      <body className={inter.className} suppressHydrationWarning={true}>
        <Toaster />
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  )
}
