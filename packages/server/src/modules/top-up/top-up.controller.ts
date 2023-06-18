import { FastifyReply, FastifyRequest } from "fastify"
import crypto from "crypto"

import { digiflazz } from "@/utils/digiflazz"
import { tripay } from "@/utils/tripay"
import {
  TopUpDigiflazzCreateDepositInput,
  TopUpDigiflazzCratePlnCheckInput,
  TopUpDigiflazzCreateTransactionInput,
  TopUpTripayPaymentCallbackInput,
  TopUpTripayPaymentInstructionInput,
  TopUpTripayFeeCalculatorInput,
  TopUpTripayCreateClosedTransactionInput,
  TopUpTripayCreateOpenTransactionInput,
  TopUpTripayUpdateClosedTransactionInput,
} from "./top-up.schema"
import {
  getPriceListByKey,
  getTotalTopUpTransactions,
  savePriceList,
  updateTopUpTransactionStatus,
} from "./top-up.service"
import { slugify, uniqueSlug } from "@/utils/slug"
import {
  createTopUpTransaction,
  getTopUpTransactionByInvoiceId,
  getTopUpTransactions,
  updateTopUpTransaction,
} from "../top-up-transaction/top-up-transaction.service"
import env from "env"

export async function topUpDigiflazzCheckBalanceHandler(
  _request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    const balance = await digiflazz.cekSaldo()

    return reply.code(201).send(balance)
  } catch (e) {
    console.log(e)
    return reply.code(500).send(e)
  }
}

export async function topUpDigiflazzPriceListPrePaidHandler(
  _request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    const priceList = (await digiflazz.daftarHarga("prepaid")) as {
      data: string
    }

    if (Array.isArray(priceList.data)) {
      await savePriceList({
        key: "digiflazzTopUpListPricePrePaid",
        value: priceList.data,
      })
    }

    const savedPriceList = await getPriceListByKey("topUpListPricePrePaid")

    return reply.code(201).send(savedPriceList)
  } catch (e) {
    console.log(e)
    return reply.code(500).send(e)
  }
}

export async function topUpDigiflazzListPostPaidHandler(
  _request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    const priceList = (await digiflazz.daftarHarga("pasca")) as { data: string }

    if (Array.isArray(priceList.data)) {
      await savePriceList({
        key: "topUpListPricePostPaid",
        value: priceList.data,
      })
    }

    const savedPriceList = await getPriceListByKey("topUpListPricePostPaid")

    return reply.code(201).send(savedPriceList)
  } catch (e) {
    console.log(e)
    return reply.code(500).send(e)
  }
}

export async function topUpDigiflazzDepositHandler(
  request: FastifyRequest<{
    Body: TopUpDigiflazzCreateDepositInput
  }>,
  reply: FastifyReply,
) {
  try {
    const { amount, bank, name } = request.body

    const deposit = await digiflazz.deposit({ amount, bank, name })

    return reply.code(201).send(deposit)
  } catch (e) {
    console.log(e)
    return reply.code(500).send(e)
  }
}

export async function topUpDigiflazzTransactionHandler(
  request: FastifyRequest<{
    Body: TopUpDigiflazzCreateTransactionInput
  }>,
  reply: FastifyReply,
) {
  try {
    const { sku, customerNo, refId, cmd, testing, msg } = request.body

    const deposit = await digiflazz.transaksi({
      sku,
      customerNo,
      refId,
      cmd,
      testing,
      msg,
    })

    return reply.code(201).send(deposit)
  } catch (e) {
    console.log(e)
    return reply.code(500).send(e)
  }
}

export async function topUpDigiflazzPlnCheckHandler(
  request: FastifyRequest<{
    Body: TopUpDigiflazzCratePlnCheckInput
  }>,
  reply: FastifyReply,
) {
  try {
    const { customerNo } = request.body

    const deposit = await digiflazz.cekIdPln(customerNo)

    return reply.code(201).send(deposit)
  } catch (e) {
    console.log(e)
    return reply.code(500).send(e)
  }
}

export async function topUpTripayGetPaymentInstructionHandler(
  request: FastifyRequest<{ Body: TopUpTripayPaymentInstructionInput }>,
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

export async function topUpTripayGetPaymentChannelHandler(
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

export async function topUpTripayFeeCalculatorHandler(
  request: FastifyRequest<{ Body: TopUpTripayFeeCalculatorInput }>,
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

export async function topUpTripayGetPaymentTransactionsHandler(
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

export async function topUpTripayGetOpenPaymentTransactionsHandler(
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

export async function topUpTripayGetClosedPaymentTransactionDetailHandler(
  request: FastifyRequest<{ Params: { reference: string } }>,
  reply: FastifyReply,
) {
  const { reference } = request.params

  const transaction = await tripay.closedTransactionDetail({
    reference,
  })
  return reply.code(201).send(transaction)
}

export async function topUpTripayCreateClosedTransactionHandler(
  request: FastifyRequest<{
    Body: TopUpTripayCreateClosedTransactionInput
  }>,
  reply: FastifyReply,
) {
  try {
    const {
      payment_provider,
      payment_method,
      amount,
      sku,
      account_id,
      customer_name,
      customer_email,
      customer_phone,
      voucher_code,
      discount_amount,
      fee_amount,
      total_amount,
      note,
      order_items,
      callback_url,
      return_url,
      expired_time,
    } = request.body

    const uniqureInvoice = slugify(sku.toLowerCase() + "_" + uniqueSlug())

    const transaction = await tripay.createClosedTransaction({
      method: payment_method,
      merchant_ref: uniqureInvoice,
      amount,
      customer_name,
      customer_email,
      customer_phone,
      order_items,
      callback_url,
      return_url,
      expired_time,
    })

    await createTopUpTransaction({
      paymentProvider: payment_provider,
      paymentMethod: payment_method,
      invoiceId: uniqureInvoice,
      amount,
      sku,
      accountId: account_id,
      customerName: customer_name,
      customerEmail: customer_email,
      customerPhone: customer_phone,
      voucherCode: voucher_code,
      discountAmount: discount_amount,
      feeAmount: fee_amount,
      totalAmount: total_amount,
      note,
    })

    return reply.code(201).send(transaction)
  } catch (e) {
    console.log(e)
    return reply.code(500).send(e)
  }
}

export async function getTopUpTransactionByInvoiceIdHandler(
  request: FastifyRequest<{ Params: { invoice_id: string } }>,
  reply: FastifyReply,
) {
  try {
    const invoice_id = request.params.invoice_id
    const transaction = await getTopUpTransactionByInvoiceId(invoice_id)

    return reply.code(201).send(transaction)
  } catch (e) {
    console.log(e)
  }
}

export async function topUpTripayCreateOpenTransactionHandler(
  request: FastifyRequest<{ Body: TopUpTripayCreateOpenTransactionInput }>,
  reply: FastifyReply,
) {
  try {
    const { method, customer_name } = request.body

    const transaction = await tripay.createOpenTransaction({
      method,
      merchant_ref: uniqueSlug(),
      customer_name,
    })

    return reply.code(201).send(transaction)
  } catch (e) {
    console.log(e)
    return reply.code(500).send(e)
  }
}

export async function topUpTripayUpdateTransactionHandler(
  request: FastifyRequest<{
    Params: { invoice_id: string }
    Body: TopUpTripayUpdateClosedTransactionInput
  }>,
  reply: FastifyReply,
) {
  try {
    const {
      payment_provider,
      payment_method,
      amount,
      sku,
      account_id,
      customer_name,
      customer_email,
      customer_phone,
      voucher_code,
      discount_amount,
      fee_amount,
      total_amount,
      note,
      status,
    } = request.body

    const invoiceId = request.params.invoice_id

    const updatedTransaction = await updateTopUpTransaction(invoiceId, {
      paymentProvider: payment_provider,
      paymentMethod: payment_method,
      amount,
      sku,
      accountId: account_id,
      customerName: customer_name,
      customerEmail: customer_email,
      customerPhone: customer_phone,
      voucherCode: voucher_code,
      discountAmount: discount_amount,
      feeAmount: fee_amount,
      totalAmount: total_amount,
      note,
      status,
    })
    return reply.code(201).send(updatedTransaction)
  } catch (e) {
    console.log(e)
    return reply.code(500).send(e)
  }
}

export async function getTransactionsHandler(
  request: FastifyRequest<{ Params: { transactionPage: number } }>,
  reply: FastifyReply,
) {
  try {
    const perPage = 10
    const transactionPage = Number(request.params.transactionPage || 1)

    const transactions = await getTopUpTransactions(transactionPage, perPage)
    return reply.code(201).send(transactions)
  } catch (e) {
    return reply.code(500).send(e)
  }
}

export const topUpTripayPaymentCallbackHandler = async (
  request: FastifyRequest<{ Body: TopUpTripayPaymentCallbackInput }>,
  reply: FastifyReply,
) => {
  const callbackSignature = request.headers["X-Callback-Signature"] as string
  const data = JSON.stringify(request.body)

  const signature = crypto
    .createHmac("sha256", env.TRIPAY_PRIVATE_KEY_DEV)
    .update(data)
    .digest("hex")

  if (signature !== callbackSignature) {
    reply.send({
      success: false,
      message: "Invalid signature",
    })
    return
  }

  if ("payment_status" !== request.headers["X-Callback-Event"]) {
    reply.send({
      success: false,
      message: "Unrecognized callback event, no action was taken",
    })
    return
  }

  if (request.body.is_closed_payment === 1) {
    const invoice = await getTopUpTransactionByInvoiceId(
      request.body.merchant_ref as string,
    )

    if (!invoice) {
      reply.send({
        success: false,
        message: `No invoice found or already paid: ${request.body.merchant_ref}`,
      })
      return
    }

    switch (request.body.status) {
      case "PAID":
        await updateTopUpTransactionStatus(
          request.body.merchant_ref as string,
          {
            status: "PAID",
          },
        )
        break

      case "EXPIRED":
        await updateTopUpTransactionStatus(
          request.body.merchant_ref as string,
          {
            status: "EXPIRED",
          },
        )
        break

      case "FAILED":
        await updateTopUpTransactionStatus(
          request.body.merchant_ref as string,
          {
            status: "FAILED",
          },
        )
        break

      default:
        reply.send({
          success: false,
          message: "Unrecognized payment status",
        })
        return
    }

    reply.send({ success: true })
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
