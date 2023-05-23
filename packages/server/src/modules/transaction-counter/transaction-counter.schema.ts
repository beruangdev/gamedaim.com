import { buildJsonSchemas } from "fastify-zod"
import { z } from "zod"

const transactionCounterInput = {
  brand: z
    .string({
      required_error: "Brand is required",
      invalid_type_error: "Brand must be a string",
    })
    .min(2),
}

const transactionCounterGenerated = {
  id: z.string(),
  transactions: z.number(),
}

const transactionCounterResponseSchema = z.object({
  ...transactionCounterInput,
  ...transactionCounterGenerated,
})

const createTransactionCounterSchema = z.object({
  ...transactionCounterInput,
})

export type CreateTransactionCounterInput = z.infer<
  typeof createTransactionCounterSchema
>

const models = {
  createTransactionCounterSchema,
  transactionCounterResponseSchema,
}

export const { schemas: transactionCounterSchemas, $ref } = buildJsonSchemas(
  models,
  {
    $id: "TransactionCounterSchema",
  },
)
