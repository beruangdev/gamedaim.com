import * as React from "react"
import { Metadata } from "next"

import { AddArticleForm } from "./form"
import { LanguageTypeData } from "@/lib/data-types"
import { getArticlePrimaryByIdAction } from "@/lib/api/server/article"
import { redirect } from "next/navigation"
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
  const { data } = await getArticlePrimaryByIdAction(primaryId)
  const selectedArticle = data?.articles.find(
    (article) => article.language === lang,
  )
  if (selectedArticle) {
    redirect(`/dashboard/article/edit/${selectedArticle.id}`)
  }
  return (
    <>
      <AddArticleForm primaryId={primaryId} lang={lang} />
    </>
  )
}
