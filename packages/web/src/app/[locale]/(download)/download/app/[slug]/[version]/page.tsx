import * as React from "react"
import { notFound } from "next/navigation"
import { type Metadata } from "next"

import env from "env"
import { getDownloadFileBySlugAction } from "@/lib/api/server/download-file"
import { getAdsByPositionAction } from "@/lib/api/server/ad"
import {
  getDownloadsByLangAction,
  getDownloadsBySlugAction,
} from "@/lib/api/server/download"
import { DownloadAppVersion } from "./content"
import { type LanguageTypeData } from "@/lib/data-types"

interface DownloadAppSlugProps {
  params: {
    locale: LanguageTypeData
    slug: string
    version: string
  }
}

export const revalidate = 60

export async function generateMetadata({
  params,
}: {
  params: { slug: string; version: string; locale: LanguageTypeData }
}): Promise<Metadata> {
  const { locale, slug, version } = params

  const { data: download } = await getDownloadsBySlugAction(slug as string)
  const { data: downloadFile } = await getDownloadFileBySlugAction(
    version as string,
  )

  return {
    title: downloadFile?.metaTitle || downloadFile?.title,
    description: downloadFile?.metaDescription,
    openGraph: {
      title: downloadFile?.metaTitle || downloadFile?.title,
      description: downloadFile?.metaDescription,
      url:
        locale === "id"
          ? `${env.SITE_URL}/download/app/${download?.slug}/${downloadFile?.slug}`
          : `${env.EN_SITE_URL}/download/app/${download?.slug}/${downloadFile?.slug}`,
      locale: locale,
    },
  }
}

export default async function DownloadAppSlugPage({
  params,
}: DownloadAppSlugProps) {
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
    <DownloadAppVersion
      downloads={downloads}
      download={download}
      downloadFile={downloadFile}
      adsDownloadingPage={adsDownloadingPageData}
    />
  )
}
