import { FastifyInstance } from "fastify"
import { $ref } from "./top-up.schema"

import {
  topUpDigiflazzCheckBalanceHandler,
  topUpDigiflazzPriceListPrePaidHandler,
  topUpDigiflazzListPostPaidHandler,
  topUpDigiflazzDepositHandler,
  topUpDigiflazzTransactionHandler,
  topUpDigiflazzPlnCheckHandler,
  topUpTripayGetPaymentInstructionHandler,
  topUpTripayGetPaymentChannelHandler,
  topUpTripayFeeCalculatorHandler,
  topUpTripayGetClosedPaymentTransactionDetailHandler,
  topUpTripayGetPaymentTransactionsHandler,
  topUpTripayGetOpenPaymentTransactionsHandler,
  topUpTripayCreateClosedTransactionHandler,
  topUpTripayUpdateTransactionHandler,
  topUpTripayCreateOpenTransactionHandler,
  topUpTripayPaymentCallbackHandler,
  getTransactionsHandler,
} from "./top-up.controller"
import {
  getTopUpTransactionByInvoiceIdHandler,
  getTotalTopUpTransactionsHandler,
} from "../top-up-transaction/top-up-transaction.controller"

async function topupRoutes(server: FastifyInstance) {
  server.post("/digiflazz/check-balance", topUpDigiflazzCheckBalanceHandler)

  server.post(
    "/digiflazz/price-list-prepaid",
    topUpDigiflazzPriceListPrePaidHandler,
  )

  server.post(
    "/digiflazz/price-list-postpaid",
    topUpDigiflazzListPostPaidHandler,
  )

  server.post(
    "/digiflazz/deposit",
    {
      schema: {
        body: $ref("topUpDigiflazzCreateDepositSchema"),
      },
    },
    topUpDigiflazzDepositHandler,
  )

  server.post(
    "/digiflazz/transaction",
    {
      schema: {
        body: $ref("topUpDigiflazzCreateTransactionSchema"),
      },
    },
    topUpDigiflazzTransactionHandler,
  )

  server.post(
    "/digiflazz/pln-check",
    {
      schema: {
        body: $ref("topUpDigiflazzCreatePlnCheckSchema"),
      },
    },
    topUpDigiflazzPlnCheckHandler,
  )

  server.post(
    "/tripay/instruction",
    {
      schema: {
        body: $ref("topUpTripayPaymentInstructionSchema"),
      },
    },
    topUpTripayGetPaymentInstructionHandler,
  )

  server.get("/tripay/channel", topUpTripayGetPaymentChannelHandler)

  server.post(
    "/tripay/fee-calculator",
    {
      schema: {
        body: $ref("topUpTripayFeeCalculatorSchema"),
      },
    },
    topUpTripayFeeCalculatorHandler,
  )

  server.get(
    "/tripay/transaction/closed/detail/:reference",
    topUpTripayGetClosedPaymentTransactionDetailHandler,
  )

  server.get(
    "/tripay/transactions/:transactionsPage",
    topUpTripayGetPaymentTransactionsHandler,
  )

  server.get(
    "/tripay/transaction/open/:transactionId",
    topUpTripayGetOpenPaymentTransactionsHandler,
  )

  server.post(
    "/tripay/transaction/create/closed",
    {
      schema: {
        body: $ref("topUpTripayCreateClosedTransactionSchema"),
      },
    },
    topUpTripayCreateClosedTransactionHandler,
  )

  server.put(
    "/tripay/transaction/:invoice_id",
    {
      schema: {
        body: $ref("topUpTripayUpdateClosedTransactionSchema"),
      },
    },
    topUpTripayUpdateTransactionHandler,
  )

  server.get(
    "/top-up/transaction/:invoice_id",
    getTopUpTransactionByInvoiceIdHandler,
  )

  server.post(
    "/tripay/transaction/create/open",
    {
      schema: {
        body: $ref("topUpTripayCreateOpenTransactionSchema"),
      },
    },
    topUpTripayCreateOpenTransactionHandler,
  )

  server.post(
    "/tripay/transaction/callback",
    {
      schema: {
        body: $ref("topUpTripayPaymentCallbackSchema"),
      },
    },
    topUpTripayPaymentCallbackHandler,
  )

  server.get("/transactions/page/:transactionPage", getTransactionsHandler)

  server.get("/count", getTotalTopUpTransactionsHandler)
}

export default topupRoutes
