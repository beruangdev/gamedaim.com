import {
  getPriceListPostPaid,
  getPriceListPrePaid,
} from "@/lib/api/server/top-up"
import { ManualTopUpsDashboardShopContent } from "./content"

export default async function ManualTopUpsDashboardShopPage() {
  const { data: prePaid } = await getPriceListPrePaid()
  const { data: postPaid } = await getPriceListPostPaid()
  return (
    <ManualTopUpsDashboardShopContent prePaid={prePaid} postPaid={postPaid} />
  )
}
