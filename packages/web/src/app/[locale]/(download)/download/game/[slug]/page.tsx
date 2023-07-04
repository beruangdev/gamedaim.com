import * as React from "react"
import { notFound } from "next/navigation"
import { type Metadata } from "next"

import env from "env"
import {
  getDownloadsByLangAction,
  getDownloadsBySlugAction,
} from "@/lib/api/server/download"
import { getAdsByPositionAction } from "@/lib/api/server/ad"
import { DownloadGameSlugContent } from "./content"
import { type LanguageTypeData } from "@/lib/data-types"

interface DownloadAppSlugProps {
  params: {
    locale: LanguageTypeData
    slug: string
  }
}

export const revalidate = 60

export async function generateMetadata({
  params,
}: {
  params: { slug: string; locale: LanguageTypeData }
}): Promise<Metadata> {
  const { locale, slug } = params

  const { data: download } = await getDownloadsBySlugAction(slug as string)

  return {
    title: download?.metaTitle || download?.title,
    description: download?.metaDescription || download?.excerpt,
    openGraph: {
      title: download?.metaTitle || download?.title,
      description: download?.metaDescription || download?.excerpt,
      url:
        locale === "id"
          ? `${env.SITE_URL}/download/game/${slug}`
          : `${env.EN_SITE_URL}/download/game/${slug}`,
      locale: locale,
    },
  }
}

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
    <DownloadGameSlugContent
      downloads={downloads}
      download={download}
      adsBelowContentData={adsSingleDownloadBelow}
      adsAboveContentData={adsSingleDownloadAbove}
      adsMiddleContentData={adsSingleDownloadInline}
    />
  )
}
