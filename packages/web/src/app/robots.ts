// Indexing is prevent because deployed on differennt domain

import { type MetadataRoute } from "next"

import env from "env"

export default async function robots(): Promise<MetadataRoute.Robots> {
  return {
    rules: [
      {
        userAgent: "*",
        disallow: "*",
      },
    ],
    sitemap: [`${env.SITE_URL}/sitemap.xml`, `${env.EN_SITE_URL}/sitemap.xml`],
    host: env.SITE_URL,
  }
}
