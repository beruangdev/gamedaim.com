import { FastifyInstance } from "fastify"

import { $ref } from "./top-up-transaction.schema"
import {
  createTopUpTransactionHandler,
  getTopUpTransactionByInvoiceIdHandler,
  getTopUpTransactionsHandler,
  getTotalTopUpTransactionsHandler,
  updateTopUpTransactionHandler,
  updateTopUpTransactionStatusHandler,
} from "./top-up-transaction.controller"

async function topupTransactionRoutes(server: FastifyInstance) {
  server.post(
    "/",
    {
      schema: {
        body: $ref("createTopUpTransactionSchema"),
      },
    },
    createTopUpTransactionHandler,
  )

  server.put(
    "/:invoiceId",
    {
      schema: {
        body: $ref("updateTopUpTransactionSchema"),
      },
    },
    updateTopUpTransactionHandler,
  )

  server.put(
    "/status/:invoiceId",
    {
      schema: {
        body: $ref("updateTopUpTransactionStatusSchema"),
      },
    },
    updateTopUpTransactionStatusHandler,
  )

  server.get("/:invoiceId", getTopUpTransactionByInvoiceIdHandler)

  server.get("/page/:transactionPage", getTopUpTransactionsHandler)

  server.get("/count", getTotalTopUpTransactionsHandler)
}

export default topupTransactionRoutes
