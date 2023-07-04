import * as React from "react"
import { notFound } from "next/navigation"
import { ArticleJsonLd, SoftwareAppJsonLd, BreadcrumbJsonLd } from "next-seo"
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
    <>
      <ArticleJsonLd
        useAppDir={true}
        url={`${env.SITE}/download/app/${download.slug}`}
        title={download.metaTitle || download.title}
        images={[download?.featuredImage?.url as string]}
        datePublished={download.createdAt}
        dateModified={download.createdAt}
        authorName={[
          {
            name: env.SITE_TITTLE,
            url: locale === "id" ? env.SITE_URL : env.EN_SITE_URL,
          },
        ]}
        publisherName={env.SITE_TITTLE}
        publisherLogo={env.LOGO_URL}
        description={download.metaDescription || download.excerpt}
        isAccessibleForFree={true}
      />
      <SoftwareAppJsonLd
        useAppDir={true}
        name={download.metaTitle || download.title}
        price={download.downloadFiles[0]?.price as unknown as string}
        priceCurrency={download.downloadFiles[0]?.currency}
        aggregateRating={{ ratingValue: "5.0", reviewCount: "1" }}
        operatingSystem={download.operatingSystem}
        applicationCategory={download.schemaType}
      />
      <BreadcrumbJsonLd
        useAppDir={true}
        itemListElements={[
          {
            position: 1,
            name: env.DOMAIN,
            item: locale === "id" ? env.SITE_URL : env.EN_SITE_URL,
          },
          {
            position: 2,
            name: "Download",
            item:
              locale === "id"
                ? `${env.SITE_URL}/download`
                : `${env.EN_SITE_URL}/download`,
          },
          {
            position: 3,
            name: download.type,
            item:
              locale === "id"
                ? `${env.SITE_URL}/download/${download.type}`
                : `${env.EN_SITE_URL}/download/${download.type}`,
          },
          {
            position: 4,
            name: download.topics && download.topics[0]?.title,
            item:
              locale === "id"
                ? `${env.SITE_URL}/download/topic/${download.topics[0].slug}`
                : `${env.EN_SITE_URL}/download/${download.topics[0].slug}`,
          },
        ]}
      />
      <DownloadGameSlugContent
        downloads={downloads}
        download={download}
        adsBelowContentData={adsSingleDownloadBelow}
        adsAboveContentData={adsSingleDownloadAbove}
        adsMiddleContentData={adsSingleDownloadInline}
      />
    </>
  )
}
