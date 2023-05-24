import { FastifyInstance } from "fastify"
import { $ref } from "./payment.schema"

import {
  paymentTripayCreateClosedTransactionHandler,
  paymentTripayCreateOpenTransactionHandler,
  paymentTripayFeeCalculatorHandler,
  paymentTripayGetPaymentChannelHandler,
  paymentTripayGetPaymentInstructionHandler,
  paymentTripayGetPaymentTransactionsHandler,
  paymentTripayGetOpenPaymentTransactionsHandler,
  paymentTripayGetClosedPaymentTransactionDetailHandler,
} from "./payment.controller"

async function paymentRoutes(server: FastifyInstance) {
  server.post(
    "/tripay/instruction",
    {
      schema: {
        body: $ref("paymentTripayPaymentInstructionSchema"),
      },
    },
    paymentTripayGetPaymentInstructionHandler,
  )

  server.get("/tripay/channel", paymentTripayGetPaymentChannelHandler)

  server.post(
    "/tripay/fee-calculator",
    {
      schema: {
        body: $ref("paymentTripayFeeCalculatorSchema"),
      },
    },
    paymentTripayFeeCalculatorHandler,
  )

  server.get(
    "/tripay/transaction/closed/detail/:reference",
    paymentTripayGetClosedPaymentTransactionDetailHandler,
  )

  server.get(
    "/tripay/transactions/:transactionsPage",
    paymentTripayGetPaymentTransactionsHandler,
  )

  server.get(
    "/tripay/transaction/open/:transactionId",
    paymentTripayGetOpenPaymentTransactionsHandler,
  )

  server.post(
    "/tripay/transaction/create/closed",
    {
      schema: {
        body: $ref("paymentTripayCreateClosedTransactionSchema"),
      },
    },
    paymentTripayCreateClosedTransactionHandler,
  )

  server.post(
    "/tripay/transaction/create/open",
    {
      schema: {
        body: $ref("paymentTripayCreateOpenTransactionSchema"),
      },
    },
    paymentTripayCreateOpenTransactionHandler,
  )
}

export default paymentRoutes
