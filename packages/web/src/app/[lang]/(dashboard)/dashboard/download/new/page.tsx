import * as React from "react"
import { Metadata } from "next"

import { LanguageTypeData } from "@/lib/data-types"
import { AddDownloadForms } from "./form"

export const metadata: Metadata = {
  title: "Add New Download Dashboard",
  description: "Add New Download Dashboard",
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

interface CreateArticleDashboardProps {
  params: { lang: LanguageTypeData }
}

export default function CreateArticleDashboard({
  params,
}: CreateArticleDashboardProps) {
  const { lang } = params

  return <AddDownloadForms lang={lang} />
}
