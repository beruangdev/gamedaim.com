import { type MetadataRoute } from "next"

import env from "env"

export default async function robots(): Promise<MetadataRoute.Robots> {
  return {
    rules: [
      {
        userAgent: "*",
      },
    ],
    sitemap: [`${env.SITE_URL}/sitemap.xml`, `${env.EN_SITE_URL}/sitemap.xml`],
    host: env.SITE_URL,
  }
}
