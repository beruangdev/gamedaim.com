import { notFound } from "next/navigation"
import { getVoucherById } from "@/lib/api/server/vouchers"
import { EditVoucherDashboardShopContent } from "./content"

export default async function EditVoucherDashboardShopPage({
  params,
}: {
  params: { id: string }
}) {
  const { id } = params
  const { data } = await getVoucherById(id)
  if (!data) {
    notFound
  }
  return <EditVoucherDashboardShopContent voucherId={id} />
}
