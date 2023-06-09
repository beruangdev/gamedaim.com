import { MetadataRoute } from "next"

import env from "env"
import { getSettingByKeyAction } from "@/lib/api/server/setting"

const { data: siteDomain } = await getSettingByKeyAction("siteDomain")

export default async function robots(): Promise<MetadataRoute.Robots> {
  return {
    rules: [
      {
        userAgent: "*",
      },
    ],
    sitemap: [
      `https://${siteDomain?.value || env.DOMAIN}/sitemap.xml`,
      `https://global.${siteDomain?.value || env.DOMAIN}/sitemap.xml`,
    ],
    host: `https://${siteDomain?.value || env.DOMAIN}`,
  }
}
