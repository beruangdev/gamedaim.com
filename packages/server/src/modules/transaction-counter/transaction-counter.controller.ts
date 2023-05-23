import { FastifyReply, FastifyRequest } from "fastify"

import { CreateTransactionCounterInput } from "./transaction-counter.schema"
import {
  createTransactionCounter,
  getTransactionCounterByBrand,
} from "./transaction-counter.service"

export async function createTransactionCounterHandler(
  request: FastifyRequest<{ Body: CreateTransactionCounterInput }>,
  reply: FastifyReply,
) {
  try {
    const { brand } = request.body

    const transactionCounter = await createTransactionCounter({ brand })

    return reply.code(201).send(transactionCounter)
  } catch (e) {
    console.log(e)
    return reply.code(500).send(e)
  }
}

export async function getTransactionCounterByBrandHandler(
  request: FastifyRequest<{
    Params: { transactionBrand: string }
  }>,
  reply: FastifyReply,
) {
  try {
    const { transactionBrand } = request.params

    const transactionCounter = await getTransactionCounterByBrand(
      transactionBrand,
    )

    return reply.code(201).send(transactionCounter)
  } catch (e) {
    console.log(e)
    return reply.code(500).send(e)
  }
}
