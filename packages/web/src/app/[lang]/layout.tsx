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
  params: { locale: string }
}

export function generateStaticParams() {
  return [{ locale: "en_US" }, { locale: "id_ID" }]
}
export default function RootLayout({
  children,
  params: { locale },
}: RootLayoutProps) {
  return (
    <html lang={locale}>
      <body className={inter.className} suppressHydrationWarning={true}>
        <Toaster />
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  )
}
