import { buildJsonSchemas } from "fastify-zod"
import { z } from "zod"

const viewCounterInput = {
  slug: z
    .string({
      required_error: "Slug is required",
      invalid_type_error: "Slug must be a string",
    })
    .min(1),
  views: z
    .number({
      required_error: "Value is required",
      invalid_type_error: "Value must be a number",
    })
    .min(1),
}

const viewCounterGenerated = {
  id: z.string(),
  slug: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
}

const createViewCounterSchema = z.object({
  ...viewCounterInput,
})

const viewCounterResponseSchema = z.object({
  ...viewCounterInput,
  ...viewCounterGenerated,
})

const viewCountersResponseSchema = z.array(viewCounterResponseSchema)

export type CreateViewCounterInput = z.infer<typeof createViewCounterSchema>

const models = {
  viewCounterResponseSchema,
  viewCountersResponseSchema,
  createViewCounterSchema,
}

export const { schemas: viewCounterSchemas, $ref } = buildJsonSchemas(models, {
  $id: "ViewCounterSchema",
})
