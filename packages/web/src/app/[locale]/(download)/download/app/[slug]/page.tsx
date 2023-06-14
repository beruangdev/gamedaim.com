import * as React from "react"
import { notFound } from "next/navigation"

import {
  getDownloadsByLangAction,
  getDownloadsBySlugAction,
} from "@/lib/api/server/download"
import { getAdsByPositionAction } from "@/lib/api/server/ad"
import { LanguageTypeData } from "@/lib/data-types"

import { DownloadAppSlugContent } from "./content"

interface DownloadAppSlugProps {
  params: {
    locale: LanguageTypeData
    slug: string
  }
}

export const revalidate = 60

export default async function DownloadAppSlugPage({
  params,
}: DownloadAppSlugProps) {
  const { slug, locale } = params
  const { data: downloads } = await getDownloadsByLangAction(locale)
  const { data: download } = await getDownloadsBySlugAction(slug as string)
  const { data: adsSingleDownloadAbove } = await getAdsByPositionAction(
    "SINGLE_DOWNLOAD_ABOVE_CONTENT",
  )
  const { data: adsSingleDownloadBelow } = await getAdsByPositionAction(
    "SINGLE_DOWNLOAD_BELOW_CONTENT",
  )
  const { data: adsSingleDownloadInline } = await getAdsByPositionAction(
    "SINGLE_DOWNLOAD_MIDDLE_CONTENT",
  )
  if (!download) {
    notFound()
  }
  return (
    <DownloadAppSlugContent
      downloads={downloads}
      download={download}
      adsBelowContentData={adsSingleDownloadBelow}
      adsAboveContentData={adsSingleDownloadAbove}
      adsMiddleContentData={adsSingleDownloadInline}
    />
  )
}
