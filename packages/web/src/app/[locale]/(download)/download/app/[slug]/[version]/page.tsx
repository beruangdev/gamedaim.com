import * as React from "react"
import { notFound } from "next/navigation"
import { ArticleJsonLd, SoftwareAppJsonLd, BreadcrumbJsonLd } from "next-seo"
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
        ]}
      />
      <DownloadAppVersion
        downloads={downloads}
        download={download}
        downloadFile={downloadFile}
        adsDownloadingPage={adsDownloadingPageData}
      />
    </>
  )
}
