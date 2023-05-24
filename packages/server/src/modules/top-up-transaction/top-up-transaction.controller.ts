import { FastifyReply, FastifyRequest } from "fastify"
import { PaymentStatus, TopUpStatus } from "@prisma/client"

import {
  CreateTopUpTransactionInput,
  UpdateTopUpTransactionInput,
} from "./top-up-transaction.schema"
import {
  createTopUpTransaction,
  getTopUpTransactionByInvoiceId,
  getTopUpTransactions,
  getTotalTopUpTransactions,
  updateTopUpTransaction,
  updateTopUpTransactionStatus,
} from "./top-up-transaction.service"

export async function createTopUpTransactionHandler(
  request: FastifyRequest<{
    Body: CreateTopUpTransactionInput
  }>,
  reply: FastifyReply,
) {
  try {
    const {
      paymentProvider,
      paymentMethod,
      topUpProvider,
      amount,
      sku,
      accountId,
      customerName,
      invoiceId,
      customerEmail,
      customerPhone,
      voucherCode,
      discountAmount,
      feeAmount,
      totalAmount,
      note,
      paymentStatus,
      status,
    } = request.body

    const topUpTransaction = await createTopUpTransaction({
      paymentProvider: paymentProvider,
      paymentMethod: paymentMethod,
      topUpProvider: topUpProvider,
      invoiceId: invoiceId,
      amount: amount,
      sku: sku,
      accountId: accountId,
      customerName: customerName,
      customerEmail: customerEmail,
      customerPhone: customerPhone,
      voucherCode: voucherCode,
      discountAmount: discountAmount,
      feeAmount: feeAmount,
      totalAmount: totalAmount,
      note: note,
      paymentStatus: paymentStatus,
      status: status,
    })

    return reply.code(201).send(topUpTransaction)
  } catch (e) {
    console.log(e)
    return reply.code(500).send(e)
  }
}

export async function updateTopUpTransactionHandler(
  request: FastifyRequest<{
    Params: { invoiceId: string }
    Body: UpdateTopUpTransactionInput
  }>,
  reply: FastifyReply,
) {
  try {
    const {
      paymentProvider,
      paymentMethod,
      topUpProvider,
      amount,
      sku,
      accountId,
      customerName,
      customerEmail,
      customerPhone,
      voucherCode,
      discountAmount,
      feeAmount,
      totalAmount,
      note,
      paymentStatus,
      status,
    } = request.body

    const invoiceId = request.params.invoiceId

    const updatedTransaction = await updateTopUpTransaction(invoiceId, {
      paymentProvider: paymentProvider,
      paymentMethod: paymentMethod,
      topUpProvider: topUpProvider,
      amount: amount,
      sku: sku,
      accountId: accountId,
      customerName: customerName,
      customerEmail: customerEmail,
      customerPhone: customerPhone,
      voucherCode: voucherCode,
      discountAmount: discountAmount,
      feeAmount: feeAmount,
      totalAmount: totalAmount,
      note: note,
      paymentStatus: paymentStatus,
      status: status,
    })
    return reply.code(201).send(updatedTransaction)
  } catch (e) {
    console.log(e)
    return reply.code(500).send(e)
  }
}

export async function updateTopUpTransactionStatusHandler(
  request: FastifyRequest<{
    Params: { invoiceId: string }
    Body: { status: TopUpStatus; paymentStatus: PaymentStatus }
  }>,
  reply: FastifyReply,
) {
  try {
    const { status, paymentStatus } = request.body

    const invoiceId = request.params.invoiceId

    const updatedTopUpTransaction = await updateTopUpTransactionStatus({
      invoiceId,
      status: status,
      paymentStatus: paymentStatus,
    })
    return reply.code(201).send(updatedTopUpTransaction)
  } catch (e) {
    console.log(e)
    return reply.code(500).send(e)
  }
}

export async function getTopUpTransactionByInvoiceIdHandler(
  request: FastifyRequest<{ Params: { invoiceId: string } }>,
  reply: FastifyReply,
) {
  try {
    const invoiceId = request.params.invoiceId
    const topUpTransaction = await getTopUpTransactionByInvoiceId(invoiceId)

    return reply.code(201).send(topUpTransaction)
  } catch (e) {
    console.log(e)
  }
}

export async function getTopUpTransactionsHandler(
  request: FastifyRequest<{ Params: { transactionPage: number } }>,
  reply: FastifyReply,
) {
  try {
    const perPage = 10
    const transactionPage = Number(request.params.transactionPage || 1)

    const topUpTransactions = await getTopUpTransactions(
      transactionPage,
      perPage,
    )
    return reply.code(201).send(topUpTransactions)
  } catch (e) {
    return reply.code(500).send(e)
  }
}

export async function getTotalTopUpTransactionsHandler(
  _request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    const topUpTransactions = await getTotalTopUpTransactions()
    return reply.code(201).send(topUpTransactions)
  } catch (e) {
    console.log(e)
    return reply.code(500).send(e)
  }
}
