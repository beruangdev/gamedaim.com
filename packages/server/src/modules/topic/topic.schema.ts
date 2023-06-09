import { z } from "zod"
import { buildJsonSchemas } from "fastify-zod"

export const TOPIC_TYPE = [
  "ALL",
  "ARTICLE",
  "DOWNLOAD",
  "MOVIE",
  "TV",
  "REVIEW",
  "TUTORIAL",
] as const

const TOPIC_LANGUAGE = ["id", "en"] as const

const topicInput = {
  title: z
    .string({
      required_error: "Title is required",
      invalid_type_error: "Title must be a string",
    })
    .min(2)
    .max(32),
  description: z
    .string({
      invalid_type_error: "Description must be a string",
    })
    .optional(),
  metaTitle: z
    .string({
      invalid_type_error: "Meta Title must be a string",
    })
    .optional(),
  metaDescription: z
    .string({
      invalid_type_error: "Meta Description must be a string",
    })
    .optional(),
  type: z
    .enum(TOPIC_TYPE, {
      invalid_type_error:
        "only ALL, ARTILCE, MOVIE ,TV, REVIEW, TUTORIAL are accepted",
    })
    .optional(),
  featuredImageId: z
    .string({
      invalid_type_error: "featuredImageId must be a string",
    })
    .optional(),
  language: z
    .enum(TOPIC_LANGUAGE, {
      invalid_type_error: "only id and en are accepted",
    })
    .optional(),
}

const topicWithPrimaryInput = {
  ...topicInput,
  topicPrimaryId: z.string({
    required_error: "Topic Primary ID is required",
    invalid_type_error: "Topic Primary ID must be a string",
  }),
}

const updateTopicInput = {
  ...topicInput,
  slug: z
    .string({
      required_error: "Slug is required",
      invalid_type_error: "Slug must be a string",
    })
    .regex(new RegExp(/^[a-zA-Z0-9_-]*$/), {
      message: "Slug should be character a-z, A-Z, number, - and _",
    }),
}

const createTopicSchema = z.object({
  ...topicWithPrimaryInput,
})

const createTopicPrimarySchema = z.object({
  ...topicInput,
})

const updateTopicSchema = z.object({
  ...updateTopicInput,
})

const topicResponseSchema = z.object({
  id: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
})

const topicsResponseSchema = z.array(topicResponseSchema)

export type CreateTopicInput = z.infer<typeof createTopicSchema>
export type CreateTopicPrimaryInput = z.infer<typeof createTopicPrimarySchema>
export type UpdateTopicInput = z.infer<typeof updateTopicSchema>

const models = {
  topicResponseSchema,
  topicsResponseSchema,
  createTopicSchema,
  createTopicPrimarySchema,
  updateTopicSchema,
}

export const { schemas: topicSchemas, $ref } = buildJsonSchemas(models, {
  $id: "TopicSchema",
})
