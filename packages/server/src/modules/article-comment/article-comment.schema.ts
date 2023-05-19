import { buildJsonSchemas } from "fastify-zod"
import { z } from "zod"

const articleCommentInput = {
  content: z
    .string({
      required_error: "Content is required",
      invalid_type_error: "Content must be a string",
    })
    .min(1)
    .max(600),
  articleId: z
    .string({
      required_error: "Content is required",
      invalid_type_error: "Content must be a string",
    })
    .optional(),
}

const updateArticleCommentInput = {
  content: z
    .string({
      required_error: "Content is required",
      invalid_type_error: "Content must be a string",
    })
    .min(1)
    .max(600),
}

const articleCommentGenerated = {
  id: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
}

const createArticleCommentSchema = z.object({
  ...articleCommentInput,
})

const updateArticleCommentSchema = z.object({
  ...updateArticleCommentInput,
})

const articleCommentResponseSchema = z.object({
  ...articleCommentInput,
  ...articleCommentGenerated,
})

const articleCommentsResponseSchema = z.array(articleCommentResponseSchema)

export type CreateArticleCommentInput = z.infer<
  typeof createArticleCommentSchema
>
export type UpdateArticleCommentInput = z.infer<
  typeof updateArticleCommentSchema
>

const models = {
  articleCommentResponseSchema,
  articleCommentsResponseSchema,
  createArticleCommentSchema,
  updateArticleCommentSchema,
}

export const { schemas: articleCommentSchemas, $ref } = buildJsonSchemas(
  models,
  {
    $id: "ArticleCommentSchema",
  },
)
