import * as React from "react"
import { notFound } from "next/navigation"

import {
  getDownloadsByLangAction,
  getDownloadsBySlugAction,
} from "@/lib/api/server/download"
import { LanguageTypeData } from "@/lib/data-types"

import { DownloadGameSlugContent } from "./content"

interface DownloadAppSlugProps {
  params: {
    locale: LanguageTypeData
    slug: string
  }
}

export default async function DownloadAppSlugPage({
  params,
}: DownloadAppSlugProps) {
  const { slug, locale } = params
  const { data: downloads } = await getDownloadsByLangAction(locale)
  const { data: download } = await getDownloadsBySlugAction(slug as string)
  if (!download) {
    notFound()
  }
  return <DownloadGameSlugContent downloads={downloads} download={download} />
}
