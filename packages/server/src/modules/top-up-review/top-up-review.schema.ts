import { buildJsonSchemas } from "fastify-zod"
import { z } from "zod"

const authorSchema = z.object({
  id: z.string(),
  name: z.string(),
  profilePicture: z
    .object({
      url: z.string().nullable(),
    })
    .nullable(),
})

const topUpReviewInput = {
  content: z
    .string({
      required_error: "Content is required",
      invalid_type_error: "Content must be a string",
    })
    .min(1),
}

const topUpReplyInput = {
  content: z
    .string({
      required_error: "Content is required",
      invalid_type_error: "Content must be a string",
    })
    .min(1),
  replyId: z.string().optional(),
}

const ratingInput = {
  rating: z.number(),
  brand: z.string(),
  reviewId: z.string().optional(),
}

const updateTopUpReviewInput = {
  ...topUpReviewInput,
}

const updateTopUpReplyInput = {
  ...topUpReplyInput,
}
const updateRatingInput = {
  ...ratingInput,
}

const topUpReviewGenerated = {
  id: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
}

const createTopUpReviewSchema = z.object({
  ...topUpReviewInput,
  rating: z.number(),
  brand: z.string({
    required_error: "Brand is required",
    invalid_type_error: "Brand must be a string",
  }),
})
const createTopUpReplySchema = z.object({
  ...topUpReplyInput,
  reviewId: z.string(),
})
const topUpCreateRatingSchema = z.object({
  ...ratingInput,
})

const updateTopUpReviewSchema = z.object({
  ...updateTopUpReviewInput,
})
const updateTopUpReplySchema = z.object({
  ...updateTopUpReplyInput,
  replyId: z.string(),
})
const topUpUpdateRatingSchema = z.object({
  ...updateRatingInput,
})

const topUpReviewResponse = {
  ...topUpReviewInput,
  ...topUpReviewGenerated,
  ratings: z
    .array(
      z.object({
        id: z.string(),
        rating: z.number(),
        author: authorSchema.optional(),
      }),
    )
    .optional(),
  author: authorSchema.optional(),
}

const topUpReviewResponseSchema = z.object({
  ...topUpReviewResponse,
  replies: z.array(z.object(topUpReviewResponse)).optional(),
})

const topUpRatingResponseSchema = z.object({
  ...ratingInput,
  ...topUpReviewGenerated,
  author: authorSchema.optional(),
})

const topUpReviewsResponseSchema = z.array(topUpReviewResponseSchema)
const topUpRatingsResponseSchema = z.array(topUpRatingResponseSchema)

export type CreateTopUpReviewInput = z.infer<typeof createTopUpReviewSchema>
export type CreateTopUpReplyInput = z.infer<typeof createTopUpReplySchema>
export type CreateRatingSchema = z.infer<typeof topUpCreateRatingSchema>
export type UpdateTopUpReviewInput = z.infer<typeof updateTopUpReviewSchema>
export type UpdateTopUpReplyInput = z.infer<typeof updateTopUpReplySchema>
export type UpdateRatingInput = z.infer<typeof topUpUpdateRatingSchema>

const models = {
  topUpReviewResponseSchema,
  topUpRatingResponseSchema,
  topUpReviewsResponseSchema,
  topUpRatingsResponseSchema,
  createTopUpReviewSchema,
  createTopUpReplySchema,
  topUpCreateRatingSchema,
  updateTopUpReviewSchema,
  updateTopUpReplySchema,
  topUpUpdateRatingSchema,
}

export const { schemas: topUpReviewSchemas, $ref } = buildJsonSchemas(models, {
  $id: "TopUpReviewSchemas",
})
