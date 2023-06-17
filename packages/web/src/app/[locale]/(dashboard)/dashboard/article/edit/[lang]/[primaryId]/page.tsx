import * as React from "react"
import { notFound } from "next/navigation"
import { Metadata } from "next"

import { EditArticleForm } from "./form"
import { getArticleByIdAction } from "@/lib/api/server/article"
import { LanguageTypeData } from "@/lib/data-types"
export const metadata: Metadata = {
  title: "Edit Article Dashboard",
  description: "Edit Article Dashboard",
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
  params: { primaryId: string; lang: LanguageTypeData }
}

export default async function CreateArticlesDashboard({
  params,
}: CreateArticlesDashboardProps) {
  const { primaryId, lang } = params

  const { data } = await getArticleByIdAction(primaryId as string)

  if (!data || lang !== ("id" || "en")) {
    notFound()
  }

  return (
    <>
      <EditArticleForm articleId={primaryId} lang={lang} />
    </>
  )
}
