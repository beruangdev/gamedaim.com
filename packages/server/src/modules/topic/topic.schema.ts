import { z } from "zod"
import { buildJsonSchemas } from "fastify-zod"

export const TOPIC_TYPE = [
  "ALL",
  "ARTICLE",
  "MOVIE",
  "TV",
  "REVIEW",
  "TUTORIAL",
] as const

const TOPIC_LANGUAGE = ["id_ID", "en_US"] as const

const topicInput = {
  topicParentId: z.string({
    required_error: "Topic Parent ID is required",
    invalid_type_error: "Topic Parent ID must be a string",
  }),
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
      invalid_type_error: "only id_ID and en_US are accepted",
    })
    .optional(),
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
export type UpdateTopicInput = z.infer<typeof updateTopicSchema>

const models = {
  topicResponseSchema,
  topicLocaleResponseSchema: topicResponseSchema,
  topicsResponseSchema,
  createTopicSchema,
  updateTopicSchema,
}

export const { schemas: topicSchemas, $ref } = buildJsonSchemas(models, {
  $id: "TopicSchema",
})
