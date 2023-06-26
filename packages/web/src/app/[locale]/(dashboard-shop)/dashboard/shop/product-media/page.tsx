import { getAllBrandTopUp } from "@/lib/api/server/top-up"
import { ProductMediasDashboardContent } from "./content"

export default async function ProductMediasDashboardPage() {
  const { brands } = await getAllBrandTopUp()

  return <ProductMediasDashboardContent brands={brands} />
}
