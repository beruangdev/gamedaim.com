import { FastifyInstance } from "fastify"
import { $ref } from "./top-up.schema"

import {
  topUpDigiflazzCheckBalanceHandler,
  topUpDigiflazzPriceListPrePaidHandler,
  topUpDigiflazzListPostPaidHandler,
  topUpDigiflazzDepositHandler,
  topUpDigiflazzTransactionHandler,
  topUpDigiflazzPlnCheckHandler,
  getTopUpDigiflazzPriceListPrePaidFromDBHandler,
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

  server.get(
    "/digiflazz/price-list-prepaid/data",
    getTopUpDigiflazzPriceListPrePaidFromDBHandler,
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
}

export default topupRoutes
