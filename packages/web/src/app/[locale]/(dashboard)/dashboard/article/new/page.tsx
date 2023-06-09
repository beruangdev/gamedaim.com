import * as React from "react"
import { Metadata } from "next"

import { AddArticleForm } from "./form"
import { LanguageTypeData } from "@/lib/data-types"

export const metadata: Metadata = {
  title: "Add New Article Dashboard",
  description: "Add New Article Dashboard",
  robots: {
    index: false,
    follow: true,
    nocache: true,
    googleBot: {
      index: false,
      follow: false,
      noimageindex: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
}

interface CreateArticlesDashboardProps {
  params: {
    locale: LanguageTypeData
  }
}

export default function CreateArticlesDashboard({
  params,
}: CreateArticlesDashboardProps) {
  const { locale } = params
  return (
    <>
      <AddArticleForm locale={locale} />
    </>
  )
}
