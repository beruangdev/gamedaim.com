import * as React from "react"
import { notFound } from "next/navigation"
import { Metadata } from "next"

import { EditDownloadForm } from "./form"
import { LanguageTypeData } from "@/lib/data-types"
import { getDownloadByIdAction } from "@/lib/api/server/download"

export const metadata: Metadata = {
  title: "Edit Download Dashboard",
  description: "Edit Download Dashboard",
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
  params: { lang: LanguageTypeData; id: string }
}

export default async function CreateDownloadsDashboard({
  params,
}: CreateArticlesDashboardProps) {
  const { lang, id } = params
  const { data } = await getDownloadByIdAction(id as string)

  if (!data) {
    notFound()
  }

  return <EditDownloadForm lang={lang} downloadId={id} />
}
