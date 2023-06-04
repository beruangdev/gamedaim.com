import { z } from "zod"
import { buildJsonSchemas } from "fastify-zod"

const ARTICLE_LANGUAGE = ["id_ID", "en_US"] as const

const articleInput = {
  title: z
    .string({
      required_error: "Title is required",
      invalid_type_error: "Title must be a string",
    })
    .min(3),
  language: z
    .enum(ARTICLE_LANGUAGE, {
      invalid_type_error: "only id_ID and en_US are accepted",
    })
    .optional(),
  content: z
    .string({
      invalid_type_error: "Content must be a string",
    })
    .min(50),
  excerpt: z
    .string({
      invalid_type_error: "Content must be a string",
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
  featuredImageId: z.string({
    invalid_type_error: "Featured Image must be a string",
  }),
  topicIds: z
    .string({
      required_error: "Topic Id is required",
      invalid_type_error: "Topic Id must be a string",
    })
    .array(),
  authorIds: z
    .string({
      required_error: "Author Id is required",
      invalid_type_error: "Author Id must be a string",
    })
    .array(),
  editorIds: z
    .string({
      required_error: "Editor Id is required",
      invalid_type_error: "Editor Id must be a string",
    })
    .array(),
}

const articleWithPrimaryInput = {
  ...articleInput,
  articlePrimaryId: z.string({
    required_error: "Article Primary ID is required",
    invalid_type_error: "Article Primary ID must be a string",
  }),
}

const updateArticleInput = {
  ...articleInput,
  slug: z
    .string({
      required_error: "Slug is required",
      invalid_type_error: "Slug must be a string",
    })
    .regex(new RegExp(/^[a-zA-Z0-9_-]*$/), {
      message: "Slug should be character a-z, A-Z, number, - and _",
    }),
}

const articleGenerated = {
  id: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
}

const createArticleSchema = z.object({
  ...articleWithPrimaryInput,
})

const createArticlePrimarySchema = z.object({
  ...articleInput,
})

const updateArticleSchema = z.object({
  ...updateArticleInput,
})

const articleResponseSchema = z.object({
  ...articleGenerated,
})

const articlesResponseSchema = z.array(articleResponseSchema)

export type CreateArticleInput = z.infer<typeof createArticleSchema>
export type CreateArticlePrimaryInput = z.infer<
  typeof createArticlePrimarySchema
>
export type UpdateArticleInput = z.infer<typeof updateArticleSchema>

const models = {
  articleResponseSchema,
  articlesResponseSchema,
  createArticleSchema,
  createArticlePrimarySchema,
  updateArticleSchema,
}

export const { schemas: articleSchemas, $ref } = buildJsonSchemas(models, {
  $id: "ArticleSchema",
})
