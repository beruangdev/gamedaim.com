import * as React from "react"
import { notFound } from "next/navigation"

import { getDownloadFileBySlugAction } from "@/lib/api/server/download-file"
import { getAdsByPositionAction } from "@/lib/api/server/ad"
import {
  getDownloadsByLangAction,
  getDownloadsBySlugAction,
} from "@/lib/api/server/download"
import { LanguageTypeData } from "@/lib/data-types"

import { DownloadGameVersion } from "./content"

interface DownloadGameSlugProps {
  params: {
    locale: LanguageTypeData
    slug: string
    version: string
  }
}

export const revalidate = 60

export default async function DownloadGameSlugPage({
  params,
}: DownloadGameSlugProps) {
  const { slug, locale, version } = params
  const { data: downloads } = await getDownloadsByLangAction(locale)
  const { data: download } = await getDownloadsBySlugAction(slug as string)
  const { data: downloadFile } = await getDownloadFileBySlugAction(
    version as string,
  )
  const { data: adsDownloadingPageData } = await getAdsByPositionAction(
    "DOWNLOADING_PAGE",
  )

  if (!download) {
    notFound()
  }
  return (
    <DownloadGameVersion
      downloads={downloads}
      download={download}
      downloadFile={downloadFile}
      adsDownloadingPage={adsDownloadingPageData}
    />
  )
}
