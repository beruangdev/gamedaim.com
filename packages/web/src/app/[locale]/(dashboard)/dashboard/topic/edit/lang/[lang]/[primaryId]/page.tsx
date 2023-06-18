import * as React from "react"
import { Metadata } from "next"

import { LanguageTypeData } from "@/lib/data-types"
import { getTopicPrimaryByIdAction } from "@/lib/api/server/topic"
import { redirect } from "next/navigation"
import { AddNewLangTopicForm } from "./form"
export const metadata: Metadata = {
  title: "Edit Topic Dashboard",
  description: "Edit Topic Dashboard",
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

interface CreateTopicsDashboardProps {
  params: { primaryId: string; lang: LanguageTypeData }
}

export const revalidate = 60

export default async function CreateTopicsDashboard({
  params,
}: CreateTopicsDashboardProps) {
  const { primaryId, lang } = params
  const { data } = await getTopicPrimaryByIdAction(primaryId)
  const selectedTopic = data?.topics.find((topic) => topic.language === lang)
  if (selectedTopic) {
    redirect(`/dashboard/topic/edit/${selectedTopic.id}`)
  }
  return (
    <>
      <AddNewLangTopicForm primaryId={primaryId} lang={lang} />
    </>
  )
}
