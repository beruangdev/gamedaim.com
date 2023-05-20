import { buildJsonSchemas } from "fastify-zod"
import { z } from "zod"

const downloadCommentInput = {
  content: z
    .string({
      required_error: "Content is required",
      invalid_type_error: "Content must be a string",
    })
    .min(1)
    .max(600),
  downloadId: z
    .string({
      required_error: "Content is required",
      invalid_type_error: "Content must be a string",
    })
    .optional(),
}

const updateDownloadCommentInput = {
  content: z
    .string({
      required_error: "Content is required",
      invalid_type_error: "Content must be a string",
    })
    .min(1)
    .max(600),
}

const downloadCommentGenerated = {
  id: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
}

const createDownloadCommentSchema = z.object({
  ...downloadCommentInput,
})

const updateDownloadCommentSchema = z.object({
  ...updateDownloadCommentInput,
})

const downloadCommentResponseSchema = z.object({
  ...downloadCommentInput,
  ...downloadCommentGenerated,
})

const downloadCommentsResponseSchema = z.array(downloadCommentResponseSchema)

export type CreateDownloadCommentInput = z.infer<
  typeof createDownloadCommentSchema
>
export type UpdateDownloadCommentInput = z.infer<
  typeof updateDownloadCommentSchema
>

const models = {
  downloadCommentResponseSchema,
  downloadCommentsResponseSchema,
  createDownloadCommentSchema,
  updateDownloadCommentSchema,
}

export const { schemas: downloadCommentSchemas, $ref } = buildJsonSchemas(
  models,
  {
    $id: "DownloadCommentSchema",
  },
)
