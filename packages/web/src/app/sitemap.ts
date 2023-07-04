import { MetadataRoute } from "next"

import env from "env"

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const routes = ["", "/article", "/download", "/shop", "/shop/top-up"].map(
    (route) => ({
      url: `${env.SITE_URL}${route}`,
      lastModified: new Date().toISOString().split("T")[0],
    }),
  )

  return [...routes]
}
