import { FastifyReply, FastifyRequest } from "fastify"

import {
  CreateTopUpReviewInput,
  UpdateTopUpReplyInput,
  UpdateTopUpReviewInput,
} from "./top-up-review.schema"
import {
  createTopUpReview,
  createTopUpRating,
  deleteTopUpReviewById,
  findTopUpReviewById,
  getTopUpReviews,
  getTotalTopUpReviews,
  searchTopUpReviews,
  getTotalRatingByBrand,
  getTopUpReviewsByBrand,
  createTopUpReply,
  deleteTopUpReplyById,
  updateTopUpReply,
  updateTopUpReview,
  getTopUpRatingByQuery,
  updateTopUpRating,
} from "./top-up-review.service"

export async function createTopUpRatingHandler(
  request: FastifyRequest<{
    Body: { brand: string; rating: number }
  }>,
  reply: FastifyReply,
) {
  try {
    const { brand, rating } = request.body
    const user = request.user

    const existingRating = await getTopUpRatingByQuery({
      authorId: user.id,
      brand,
    })

    if (existingRating) {
      const updateRating = await updateTopUpRating({
        id: existingRating.id,
        rating,
      })
      return reply.code(201).send(updateRating)
    }

    const newRating = await createTopUpRating({
      brand,
      rating,
      authorId: user.id,
    })

    return reply.code(201).send(newRating)
  } catch (err) {
    console.log(err)
    return reply.code(500).send(err)
  }
}
export async function createTopUpReplyHandler(
  request: FastifyRequest<{
    Body: { content: string; reviewId: string }
  }>,
  response: FastifyReply,
) {
  try {
    const { content, reviewId } = request.body
    const user = request.user

    const reply = await createTopUpReply({
      content,
      reviewId,
      authorId: user.id,
    })

    return response.code(201).send(reply)
  } catch (err) {
    console.log(err)
    return response.code(500).send(err)
  }
}

export async function updateTopUpReplyHandler(
  request: FastifyRequest<{
    Body: UpdateTopUpReplyInput
  }>,
  reply: FastifyReply,
) {
  try {
    const user = request.user
    const { content, replyId } = request.body

    if (user.role !== "ADMIN") {
      return reply.code(403).send({ message: "Unauthorized" })
    }

    const updatedReply = await updateTopUpReply({
      replyId,
      content,
    })
    return reply.code(201).send(updatedReply)
  } catch (e) {
    console.log(e)
    return reply.code(500).send(e)
  }
}
export async function createTopUpReviewHandler(
  request: FastifyRequest<{ Body: CreateTopUpReviewInput }>,
  reply: FastifyReply,
) {
  try {
    const { content, brand, rating } = request.body
    const user = request.user

    const topUpReview = await createTopUpReview({
      content,
      rating,
      authorId: user.id,
      brand,
    })

    return reply.code(201).send(topUpReview)
  } catch (err) {
    console.log(err)
    return reply.code(500).send(err)
  }
}

export async function updateTopUpReviewHandler(
  request: FastifyRequest<{
    Params: { reviewId: string }
    Body: UpdateTopUpReviewInput
  }>,
  reply: FastifyReply,
) {
  try {
    const user = request.user
    const reviewId = request.params.reviewId
    const { content } = request.body

    if (user.role !== "ADMIN") {
      return reply.code(403).send({ message: "Unauthorized" })
    }

    const topUpReview = await updateTopUpReview({
      reviewId,
      content,
    })
    return reply.code(201).send(topUpReview)
  } catch (e) {
    console.log(e)
    return reply.code(500).send(e)
  }
}

export async function getTopUpReviewByIdHandler(
  request: FastifyRequest<{
    Params: { reviewId: string }
  }>,
  reply: FastifyReply,
) {
  try {
    const { reviewId } = request.params
    const topUpReview = await findTopUpReviewById(reviewId)
    return reply.code(201).send(topUpReview)
  } catch (e) {
    console.log(e)
    return reply.code(500).send(e)
  }
}

export async function getTopUpReviewsByBrandHandler(
  request: FastifyRequest<{
    Params: { brand?: string }
  }>,
  reply: FastifyReply,
) {
  try {
    const { brand } = request.params

    const perPage = 100
    const query = request.query as { topUpReviewPage: number }
    const topUpReviewPage = Number(query.topUpReviewPage || 1)

    const topUpReviews = await getTopUpReviewsByBrand({
      brand,
      topUpReviewPage,
      perPage,
    })

    return reply.code(201).send(topUpReviews)
  } catch (e) {
    console.log(e)
    return reply.code(500).send(e)
  }
}

export async function getTotalRatingByBrandHandler(
  request: FastifyRequest<{
    Params: { brand: string }
  }>,
  reply: FastifyReply,
) {
  const { brand } = request.params
  try {
    const topUpReviews = await getTotalRatingByBrand(brand)
    return reply.code(201).send(topUpReviews)
  } catch (e) {
    console.log(e)
    return reply.code(500).send(e)
  }
}

export async function getTopUpReviewsHandler(
  request: FastifyRequest<{ Params: { topUpReviewPage: number } }>,
  reply: FastifyReply,
) {
  try {
    const perPage = 10
    const topUpReviewPage = Number(request.params.topUpReviewPage || 1)
    const topUpReviews = await getTopUpReviews(topUpReviewPage, perPage)
    return reply.code(201).send(topUpReviews)
  } catch (e) {
    console.log(e)
    return reply.code(500).send(e)
  }
}

export async function searchTopUpReviewsHandler(
  request: FastifyRequest<{ Params: { searchTopUpReviewQuery: string } }>,
  reply: FastifyReply,
) {
  try {
    const searchQuery = request.params.searchTopUpReviewQuery

    const topUpReviews = await searchTopUpReviews(searchQuery)
    return reply.code(201).send(topUpReviews)
  } catch (e) {
    console.log(e)
    return reply.code(500).send(e)
  }
}

export async function getTotalTopUpReviewsHandler(
  _request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    const topUpReviews = await getTotalTopUpReviews()
    return reply.code(201).send(topUpReviews)
  } catch (e) {
    console.log(e)
    return reply.code(500).send(e)
  }
}
export async function deleteTopUpReplyHandler(
  request: FastifyRequest<{
    Params: { replyId: string }
  }>,
  reply: FastifyReply,
) {
  try {
    const { replyId } = request.params
    const user = request.user
    if (user.role !== "ADMIN") {
      return reply.code(403).send({ message: "Unauthorized" })
    }
    const deleteTopUpReply = await deleteTopUpReplyById({ replyId })
    return reply.code(201).send(deleteTopUpReply)
  } catch (e) {
    console.log(e)
    return reply.code(500).send(e)
  }
}
export async function deleteTopUpReviewHandler(
  request: FastifyRequest<{
    Params: { reviewId: string }
  }>,
  reply: FastifyReply,
) {
  try {
    const { reviewId } = request.params
    const user = request.user

    if (user.role !== "ADMIN") {
      return reply.code(403).send({ message: "Unauthorized" })
    }
    const deleteTopUpReview = await deleteTopUpReviewById({ reviewId })

    return reply.code(201).send(deleteTopUpReview)
  } catch (e) {
    console.log(e)
    return reply.code(500).send(e)
  }
}
