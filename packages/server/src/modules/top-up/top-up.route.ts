import { FastifyInstance } from "fastify"
import { $ref } from "./top-up.schema"

import { getTotalTopUpTransactionsHandler } from "../top-up-transaction/top-up-transaction.controller"
import {
  getTransactionsHandler,
  topUpDigiflazzCheckBalanceHandler,
  topUpDigiflazzDepositHandler,
  topUpDigiflazzListPostPaidHandler,
  topUpDigiflazzPlnCheckHandler,
  topUpDigiflazzPriceListPrePaidHandler,
  topUpDigiflazzTransactionHandler,
} from "./top-up.controller"

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

  server.get("/transactions/page/:transactionPage", getTransactionsHandler)

  server.get("/count", getTotalTopUpTransactionsHandler)
}

export default topupRoutes
