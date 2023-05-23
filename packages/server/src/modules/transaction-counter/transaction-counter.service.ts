import db from "@/utils/db"

import { CreateTransactionCounterInput } from "./transaction-counter.schema"

export async function createTransactionCounter(
  data: CreateTransactionCounterInput,
) {
  const { brand } = data

  return await db.transactionCounter.upsert({
    where: { brand: brand },
    update: {
      transactions: { increment: 1 },
    },
    create: {
      brand: brand,
      transactions: 1,
    },
  })
}

export async function getTransactionCounterByBrand(brand: string) {
  return await db.transactionCounter.findUnique({
    where: { brand: brand },
    select: {
      id: true,
      brand: true,
      transactions: true,
    },
  })
}
