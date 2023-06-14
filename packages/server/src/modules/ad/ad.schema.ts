import { z } from "zod"
import { buildJsonSchemas } from "fastify-zod"

const AD_POSITION = [
  "HOME_BELOW_HEADER",
  "ARTICLE_BELOW_HEADER",
  "TOPIC_BELOW_HEADER",
  "DOWNLOAD_BELOW_HEADER",
  "SINGLE_ARTICLE_ABOVE_CONTENT",
  "SINGLE_ARTICLE_MIDDLE_CONTENT",
  "SINGLE_ARTICLE_BELOW_CONTENT",
  "SINGLE_ARTICLE_POP_UP",
  "SINGLE_DOWNLOAD_ABOVE_CONTENT",
  "SINGLE_DOWNLOAD_MIDDLE_CONTENT",
  "SINGLE_DOWNLOAD_BELOW_CONTENT",
  "SINGLE_DOWNLOAD_POP_UP",
  "DOWNLOADING_PAGE",
] as const

const AD_TYPE = ["ADSENSE", "PLAIN_AD"] as const

const adInput = {
  title: z
    .string({
      required_error: "Title is required",
      invalid_type_error: "Title must be a string",
    })
    .min(2),
  content: z
    .string({
      required_error: "Content is required",
      invalid_type_error: "Content must be a string",
    })
    .min(2),
  position: z.enum(AD_POSITION, {
    invalid_type_error: "your ad position doesnt exist on available option.",
  }),
  type: z.enum(AD_TYPE, {
    invalid_type_error: "your ad type doesnt exist on available option.",
  }),
  active: z
    .boolean({
      invalid_type_error: "Active must be a boolean",
    })
    .optional(),
}

const updateAdInput = {
  ...adInput,
}

const adGenerated = {
  id: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
}

const createAdSchema = z.object({
  ...adInput,
})

const updateAdSchema = z.object({
  ...updateAdInput,
})

const adResponseSchema = z.object({
  ...adInput,
  ...adGenerated,
})

const adsResponseSchema = z.array(adResponseSchema)

export type CreateAdInput = z.infer<typeof createAdSchema>
export type UpdateAdInput = z.infer<typeof updateAdSchema>

const models = {
  adResponseSchema,
  adsResponseSchema,
  createAdSchema,
  updateAdSchema,
}

export const { schemas: adSchemas, $ref } = buildJsonSchemas(models, {
  $id: "AdSchema",
})
