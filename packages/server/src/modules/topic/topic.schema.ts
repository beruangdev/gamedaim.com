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

const topicTranslationInput = {
  topicId: z.string({
    required_error: "Topic ID is required",
    invalid_type_error: "Topic ID must be a string",
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
  meta_title: z
    .string({
      invalid_type_error: "Meta Title must be a string",
    })
    .optional(),
  meta_description: z
    .string({
      invalid_type_error: "Meta Description must be a string",
    })
    .optional(),
  language: z
    .enum(TOPIC_LANGUAGE, {
      invalid_type_error: "only id_ID and en_US are accepted",
    })
    .optional(),
}

const topicInput = {
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
  meta_title: z
    .string({
      invalid_type_error: "Meta Title must be a string",
    })
    .optional(),
  meta_description: z
    .string({
      invalid_type_error: "Meta Description must be a string",
    })
    .optional(),
  language: z
    .enum(TOPIC_LANGUAGE, {
      invalid_type_error: "only id_ID and en_US are accepted",
    })
    .optional(),
}

const updateTopicInput = {
  type: z
    .enum(TOPIC_TYPE, {
      invalid_type_error: "only ALL, ARTILCE, MOVIE and TV are accepted",
    })
    .optional(),
  featuredImageId: z
    .string({
      invalid_type_error: "featuredImageId must be a string",
    })
    .optional(),
}

const updateTopicTranslationInput = {
  slug: z
    .string({
      required_error: "Slug is required",
      invalid_type_error: "Slug must be a string",
    })
    .regex(new RegExp(/^[a-zA-Z0-9_-]*$/), {
      message: "Slug should be character a-z, A-Z, number, - and _",
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
  meta_title: z
    .string({
      invalid_type_error: "Meta Title must be a string",
    })
    .optional(),
  meta_description: z
    .string({
      invalid_type_error: "Meta Description must be a string",
    })
    .optional(),
  language: z
    .enum(TOPIC_LANGUAGE, {
      invalid_type_error: "only id_ID and en_US are accepted",
    })
    .optional(),
}

const createTopicSchema = z.object({
  ...topicInput,
})

const createTopicTranslationSchema = z.object({
  ...topicTranslationInput,
})

const updateTopicSchema = z.object({
  ...updateTopicInput,
})

const updateTopicTranslationSchema = z.object({
  ...updateTopicTranslationInput,
})

const topicTranslationResponseSchema = z.object({
  id: z.string(),
  language: z.string(),
  title: z.string(),
  description: z.string().nullable(),
  meta_title: z.string().nullable(),
  meta_description: z.string().nullable(),
  createdAt: z.string(),
  updatedAt: z.string(),
})

const topicResponseSchema = z.object({
  id: z.string(),
  type: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
})

const topicsResponseSchema = z.array(topicResponseSchema)
const topicTranslationsResponseSchema = z.array(topicTranslationResponseSchema)

export type CreateTopicInput = z.infer<typeof createTopicSchema>
export type CreateTopicTranslationInput = z.infer<
  typeof createTopicTranslationSchema
>
export type UpdateTopicInput = z.infer<typeof updateTopicSchema>
export type UpdateTopicTranslationInput = z.infer<
  typeof updateTopicTranslationSchema
>

const models = {
  topicResponseSchema,
  topicTranslationResponseSchema,
  topicsResponseSchema,
  topicTranslationsResponseSchema,
  createTopicSchema,
  createTopicTranslationSchema,
  updateTopicSchema,
  updateTopicTranslationSchema,
}

export const { schemas: topicSchemas, $ref } = buildJsonSchemas(models, {
  $id: "TopicSchema",
})
