import { FastifyReply, FastifyRequest } from "fastify"

import { tripay } from "@/utils/tripay"
import {
  PaymentTripayCreateClosedTransactionInput,
  PaymentTripayCreateOpenTransactionInput,
  PaymentTripayFeeCalculatorInput,
  PaymentTripayPaymentInstructionInput,
} from "./payment.schema"

export async function paymentTripayGetPaymentInstructionHandler(
  request: FastifyRequest<{ Body: PaymentTripayPaymentInstructionInput }>,
  reply: FastifyReply,
) {
  try {
    const { code, pay_code, amount, allow_html } = request.body

    const instruction = await tripay.instruction({
      code,
      pay_code,
      amount,
      allow_html,
    })
    return reply.code(201).send(instruction)
  } catch (e) {
    console.log(e)
    return reply.code(500).send(e)
  }
}

export async function paymentTripayGetPaymentChannelHandler(
  _request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    const paymentChannel = await tripay.paymentChannel()
    return reply.code(201).send(paymentChannel)
  } catch (e) {
    console.log(e)
    return reply.code(500).send(e)
  }
}

export async function paymentTripayFeeCalculatorHandler(
  request: FastifyRequest<{ Body: PaymentTripayFeeCalculatorInput }>,
  reply: FastifyReply,
) {
  try {
    const { code, amount } = request.body

    const fee = await tripay.feeCalculator({ code, amount })
    return reply.code(201).send(fee)
  } catch (e) {
    console.log(e)
    return reply.code(500).send(e)
  }
}

export async function paymentTripayGetPaymentTransactionsHandler(
  request: FastifyRequest<{ Params: { transactionsPage: number } }>,
  reply: FastifyReply,
) {
  try {
    const { transactionsPage } = request.params
    const per_page = Number(10)

    const transactions = await tripay.transactions({
      page: transactionsPage,
      per_page,
    })
    return reply.code(201).send(transactions)
  } catch (e) {
    console.log(e)
    return reply.code(500).send(e)
  }
}

export async function paymentTripayGetOpenPaymentTransactionsHandler(
  request: FastifyRequest<{ Params: { transactionId: string } }>,
  reply: FastifyReply,
) {
  try {
    const { transactionId } = request.params

    const transactions = await tripay.openTransactions({
      uuid: transactionId,
    })
    return reply.code(201).send(transactions)
  } catch (e) {
    console.log(e)
    return reply.code(500).send(e)
  }
}

export async function paymentTripayGetClosedPaymentTransactionDetailHandler(
  request: FastifyRequest<{ Params: { reference: string } }>,
  reply: FastifyReply,
) {
  const { reference } = request.params

  const transaction = await tripay.closedTransactionDetail({
    reference,
  })
  return reply.code(201).send(transaction)
}

export async function paymentTripayCreateClosedTransactionHandler(
  request: FastifyRequest<{
    Body: PaymentTripayCreateClosedTransactionInput
  }>,
  reply: FastifyReply,
) {
  try {
    const {
      payment_method,
      amount,
      merchant_ref,
      customer_name,
      customer_email,
      customer_phone,
      order_items,
      callback_url,
      return_url,
      expired_time,
    } = request.body

    const transaction = await tripay.createClosedTransaction({
      method: payment_method,
      merchant_ref: merchant_ref,
      amount,
      customer_name,
      customer_email,
      customer_phone,
      order_items,
      callback_url,
      return_url,
      expired_time,
    })

    return reply.code(201).send(transaction)
  } catch (e) {
    console.log(e)
    return reply.code(500).send(e)
  }
}

export async function paymentTripayCreateOpenTransactionHandler(
  request: FastifyRequest<{ Body: PaymentTripayCreateOpenTransactionInput }>,
  reply: FastifyReply,
) {
  try {
    const { method, customer_name, merchant_ref } = request.body

    const transaction = await tripay.createOpenTransaction({
      method,
      merchant_ref,
      customer_name,
    })

    return reply.code(201).send(transaction)
  } catch (e) {
    console.log(e)
    return reply.code(500).send(e)
  }
}
