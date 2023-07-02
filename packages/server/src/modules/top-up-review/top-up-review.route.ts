import { FastifyInstance } from "fastify"
import {
  createTopUpReviewHandler,
  deleteTopUpReviewHandler,
  getTopUpReviewByIdHandler,
  getTopUpReviewsHandler,
  getTotalTopUpReviewsHandler,
  searchTopUpReviewsHandler,
  updateTopUpReviewHandler,
  getTopUpReviewsByBrandHandler,
  createTopUpRatingHandler,
  getTotalRatingByBrandHandler,
  deleteTopUpReplyHandler,
  createTopUpReplyHandler,
  updateTopUpReplyHandler,
} from "./top-up-review.controller"

import { $ref } from "./top-up-review.schema"

async function reviewRoutes(server: FastifyInstance) {
  server.post(
    "/",
    {
      preHandler: [server.authenticate],
      schema: {
        body: $ref("createTopUpReviewSchema"),
        response: {
          201: $ref("topUpReviewResponseSchema"),
        },
      },
    },
    createTopUpReviewHandler,
  )

  server.put(
    "/:reviewId",
    {
      preHandler: [server.authenticate],
      schema: {
        body: $ref("updateTopUpReviewSchema"),
        response: {
          200: $ref("topUpReviewResponseSchema"),
        },
      },
    },
    updateTopUpReviewHandler,
  )

  server.delete(
    "/:reviewId",
    { preHandler: [server.authenticate] },
    deleteTopUpReviewHandler,
  )

  server.post(
    "/reply",
    {
      preHandler: [server.authenticate],
      schema: {
        body: $ref("createTopUpReplySchema"),
        response: {
          201: $ref("topUpReplyResponseSchema"),
        },
      },
    },
    createTopUpReplyHandler,
  )
  server.put(
    "/reply",
    {
      preHandler: [server.authenticate],
      schema: {
        body: $ref("updateTopUpReplySchema"),
        response: {
          201: $ref("topUpReplyResponseSchema"),
        },
      },
    },
    updateTopUpReplyHandler,
  )
  server.delete(
    "/reply",
    {
      preHandler: [server.authenticate],
    },
    deleteTopUpReplyHandler,
  )

  server.post(
    "/rating",
    {
      preHandler: [server.authenticate],
      schema: {
        body: $ref("createTopUpRatingSchema"),
        response: {
          201: $ref("topUpRatingResponseSchema"),
        },
      },
    },
    createTopUpRatingHandler,
  )

  server.get(
    "/page/:reviewPage",
    {
      schema: {
        response: {
          200: $ref("topUpReviewsResponseSchema"),
        },
      },
    },

    getTopUpReviewsHandler,
  )

  server.get(
    "/search/:searchReviewQuery",
    {
      schema: {
        response: {
          200: $ref("topUpReviewsResponseSchema"),
        },
      },
    },

    searchTopUpReviewsHandler,
  )

  server.get(
    "/:reviewId",
    {
      schema: {
        response: {
          200: $ref("topUpReviewsResponseSchema"),
        },
      },
    },
    getTopUpReviewByIdHandler,
  )

  server.get(
    "/by-brand/:brand",
    {
      schema: {
        response: {
          200: $ref("topUpReviewsResponseSchema"),
        },
      },
    },
    getTopUpReviewsByBrandHandler,
  )
  server.get(
    "/total/by-brand/:brand",
    {
      schema: {
        response: {
          200: $ref("topUpRatingTotalResponseSchema"),
        },
      },
    },
    getTotalRatingByBrandHandler,
  )

  server.get("/count", getTotalTopUpReviewsHandler)
}

export default reviewRoutes
