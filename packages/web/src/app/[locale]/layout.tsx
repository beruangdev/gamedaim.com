import * as React from "react"
import { Metadata } from "next"
import { Inter } from "next/font/google"

import "@/styles/globals.css"
import env from "env"
import { Toaster } from "@/components/UI/Toast"
import { ThemeProvider } from "@/components/Theme"
import { getSettingByKeyAction } from "@/lib/api/server/setting"
import { type LanguageTypeData } from "@/lib/data-types"

const inter = Inter({ subsets: ["latin"] })

export async function generateMetadata({
  locale,
}: {
  locale: LanguageTypeData
}): Promise<Metadata> {
  const { data: siteTitle } = await getSettingByKeyAction("siteTitle")
  const { data: siteTagline } = await getSettingByKeyAction("siteTagline")
  const { data: siteDescription } = await getSettingByKeyAction(
    "siteDescription",
  )
  const { data: twitterUsername } = await getSettingByKeyAction(
    "twitterUsername",
  )

  return {
    title: {
      default: `${siteTitle?.value} | ${siteTagline?.value}` || env.SITE_TITLE,
      template: `%s | ${siteTitle?.value || env.SITE_TITLE}`,
    },
    description: siteDescription?.value || env.ABOUT,
    alternates: {
      canonical: locale === "id" ? env.SITE_URL : env.EN_SITE_URL,
      languages: {
        id: env.SITE_URL,
        en: env.EN_SITE_URL,
      },
    },
    openGraph: {
      title: siteTitle?.value || env.SITE_TITLE,
      description: siteDescription?.value || env.ABOUT,
      url: locale === "id" ? env.SITE_URL : env.EN_SITE_URL,
      siteName: siteTitle?.value || env.SITE_TITLE,
      images: [
        {
          url: env.LOGO_OG_URL,
          width: env.LOGO_OG_WIDTH,
          height: env.LOGO_OG_HEIGHT,
        },
      ],
      locale: "id",
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
      title: twitterUsername?.value || env.TWITTER_USERNAME,
      card: "summary_large_image",
      images: [
        {
          url: env.LOGO_OG_URL,
          width: env.LOGO_OG_WIDTH,
          height: env.LOGO_OG_HEIGHT,
        },
      ],
    },
    icons: {
      shortcut: "/favicon.ico",
    },
  }
}

interface RootLayoutProps {
  children: React.ReactNode
  params: { locale: string }
}

export function generateStaticParams() {
  return [{ locale: "en" }, { locale: "id" }]
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
