import { PaymentStatus, TopUpStatus } from "@prisma/client"

import db from "@/utils/db"
import {
  CreateTopUpTransactionInput,
  UpdateTopUpTransactionInput,
} from "./top-up-transaction.schema"

export async function createTopUpTransaction(
  data: CreateTopUpTransactionInput & { invoiceId: string },
) {
  return await db.topUpTransaction.create({
    data,
  })
}

export async function updateTopUpTransaction(
  invoiceId: string,
  data: UpdateTopUpTransactionInput,
) {
  return await db.topUpTransaction.update({
    where: { invoiceId: invoiceId },
    data,
  })
}

export async function updateTopUpTransactionStatus({
  invoiceId,
  status,
  paymentStatus,
}: {
  invoiceId: string
  status: TopUpStatus
  paymentStatus: PaymentStatus
}) {
  return await db.topUpTransaction.update({
    where: { invoiceId: invoiceId },
    data: { status: status, paymentStatus: paymentStatus },
  })
}

export async function getTopUpTransactions(
  transactionPage: number,
  perPage: number,
) {
  return await db.topUpTransaction.findMany({
    orderBy: {
      createdAt: "desc",
    },
    skip: (transactionPage - 1) * perPage,
    take: perPage,
    select: {
      id: true,
      invoiceId: true,
      amount: true,
      paymentMethod: true,
      paymentProvider: true,
      topUpProvider: true,
      sku: true,
      accountId: true,
      customerName: true,
      customerEmail: true,
      customerPhone: true,
      voucherCode: true,
      discountAmount: true,
      feeAmount: true,
      totalAmount: true,
      note: true,
      status: true,
      paymentStatus: true,
      createdAt: true,
      updatedAt: true,
    },
  })
}

export async function getTopUpTransactionByInvoiceId(invoiceId: string) {
  return await db.topUpTransaction.findUnique({
    where: {
      invoiceId: invoiceId,
    },
    select: {
      id: true,
      invoiceId: true,
      amount: true,
      paymentMethod: true,
      paymentProvider: true,
      topUpProvider: true,
      sku: true,
      accountId: true,
      customerName: true,
      customerEmail: true,
      customerPhone: true,
      voucherCode: true,
      discountAmount: true,
      feeAmount: true,
      totalAmount: true,
      note: true,
      status: true,
      paymentStatus: true,
      createdAt: true,
      updatedAt: true,
    },
  })
}

export async function getTotalTopUpTransactions() {
  return await db.topUpTransaction.count()
}
