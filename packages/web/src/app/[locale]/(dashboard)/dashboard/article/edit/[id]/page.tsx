import * as React from "react"
import { notFound } from "next/navigation"
import { Metadata } from "next"

import { EditArticleForm } from "./form"
import { LanguageTypeData } from "@/lib/data-types"
import { getArticleByIdAction } from "@/lib/api/server/article"

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
  params: { locale: LanguageTypeData; id: string }
}

export default async function CreateArticlesDashboard({
  params,
}: CreateArticlesDashboardProps) {
  const { locale, id } = params

  const { data } = await getArticleByIdAction(id as string)

  if (!data) {
    notFound()
  }

  return (
    <>
      <EditArticleForm locale={locale} articleId={id} />
    </>
  )
}
