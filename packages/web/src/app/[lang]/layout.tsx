import * as React from "react"
import { Metadata } from "next"
import { Inter } from "next/font/google"

import env from "env"
import { Toaster } from "@/components/UI/Toast"
import { ThemeProvider } from "@/components/Theme"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: {
    default: env.SITE_TITLE,
    template: `%s | ${env.SITE_TITLE}`,
  },
  description: env.ABOUT,
  openGraph: {
    title: env.SITE_TITLE,
    description: env.ABOUT,
    url: `https://${env.DOMAIN}`,
    siteName: env.SITE_TITLE,
    images: [
      {
        url: env.LOGO_OG_URL,
        width: env.LOGO_OG_WIDTH,
        height: env.LOGO_OG_HEIGHT,
      },
    ],
    locale: "id-ID",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  twitter: {
    title: env.TWITTER_USERNAME,
    card: "summary_large_image",
  },
  icons: {
    shortcut: "/favicon.ico",
  },
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
