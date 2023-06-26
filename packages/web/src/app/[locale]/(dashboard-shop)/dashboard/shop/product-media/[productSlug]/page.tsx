import { getPriceListBySlug } from "@/lib/api/server/top-up"
import { UploadProductMediaDashboardContent } from "./content"
import { notFound } from "next/navigation"

export default async function UploadProductMediaDashboardPage({
  params,
}: {
  params: { productSlug: string }
}) {
  const { productSlug } = params
  const { priceBySlug } = await getPriceListBySlug(productSlug as string)
  if (!priceBySlug) {
    notFound()
  }

  return <UploadProductMediaDashboardContent priceBySlug={priceBySlug} />
}
