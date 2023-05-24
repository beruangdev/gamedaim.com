import { FastifyInstance } from "fastify"

import { $ref } from "./transaction-counter.schema"
import {
  createTransactionCounterHandler,
  getTransactionCounterByBrandHandler,
} from "./transaction-counter.controller"

async function transactionRoutes(server: FastifyInstance) {
  server.post(
    "/",
    {
      schema: {
        body: $ref("createTransactionCounterSchema"),
        response: {
          201: $ref("transactionCounterResponseSchema"),
        },
      },
    },
    createTransactionCounterHandler,
  )

  server.get(
    "/:transactionBrand",
    {
      schema: {
        response: {
          201: $ref("transactionCounterResponseSchema"),
        },
      },
    },
    getTransactionCounterByBrandHandler,
  )
}

export default transactionRoutes
