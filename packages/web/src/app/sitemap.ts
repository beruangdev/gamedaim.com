import { MetadataRoute } from "next"

import env from "env"
import { getSettingByKeyAction } from "@/lib/api/server/setting"

const { data: siteDomain } = await getSettingByKeyAction("siteDomain")

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const routes = ["", "/article", "/download", "/shop", "/shop/top-up"].map(
    (route) => ({
      url: `https://${siteDomain?.value || env.DOMAIN}${route}`,
      lastModified: new Date().toISOString().split("T")[0],
    }),
  )

  return [...routes]
}
