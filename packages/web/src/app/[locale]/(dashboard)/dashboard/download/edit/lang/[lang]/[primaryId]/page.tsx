import * as React from "react"
import { Metadata } from "next"
import { redirect } from "next/navigation"

import { LanguageTypeData } from "@/lib/data-types"
import { getDownloadPrimaryByIdAction } from "@/lib/api/server/download"
import { AddLangDownloadForm } from "./form"

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

interface CreateDownloadsDashboardProps {
  params: { primaryId: string; lang: LanguageTypeData }
}

export const revalidate = 60

export default async function CreateDownloadsDashboard({
  params,
}: CreateDownloadsDashboardProps) {
  const { primaryId, lang } = params
  const { data } = await getDownloadPrimaryByIdAction(primaryId)
  const selectedDownload = data?.downloads.find(
    (download) => download.language === lang,
  )
  if (selectedDownload) {
    redirect(`/dashboard/download/edit/${selectedDownload.id}`)
  }
  return (
    <>
      <AddLangDownloadForm primaryId={primaryId} lang={lang} />
    </>
  )
}
