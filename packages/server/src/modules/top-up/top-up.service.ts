import db from "@/utils/db"
import { SavePriceListInput } from "./top-up.schema"

export async function savePriceList(data: SavePriceListInput) {
  const { key, value } = data
  return await db.topUpPriceList.upsert({
    where: { key: key },
    update: { value: value },
    create: {
      key: key,
      value: value,
    },
  })
}

export async function getPriceListByKey(priceListKey: string) {
  return await db.topUpPriceList.findUnique({
    where: { key: priceListKey },
  })
}

export async function getTotalTopUpTransactions() {
  return await db.topUpTransaction.count()
}

export async function updateTopUpTransactionStatus(
  invoiceId: string,
  data: { status: string },
) {
  return await db.topUpTransaction.update({
    where: { invoiceId: invoiceId },
    //@ts-ignore FIX: use enum
    data: { status: data.status },
  })
}
