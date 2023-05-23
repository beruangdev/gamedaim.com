import { FastifyInstance } from "fastify"
import {
  createWpCommentHandler,
  deleteWpCommentHandler,
  getTotalWpCommentsHandler,
  getWpCommentByIdHandler,
  getWpCommentsHandler,
  searchWpCommentsHandler,
  updateWpCommentHandler,
  getWpCommentByPostIdHandler,
} from "./wp-comment.controller"
import { $ref } from "./wp-comment.schema"

async function wpCommentRoutes(server: FastifyInstance) {
  server.post(
    "/",
    {
      preHandler: [server.authenticate],
      schema: {
        body: $ref("createWpCommentSchema"),
        response: {
          201: $ref("wpCommentResponseSchema"),
        },
      },
    },
    createWpCommentHandler,
  )

  server.get(
    "/page/:wpCommentPage",
    {
      schema: {
        response: {
          200: $ref("wpCommentsResponseSchema"),
        },
      },
    },

    getWpCommentsHandler,
  )

  server.get(
    "/search/:searchWpCommentQuery",
    {
      schema: {
        response: {
          200: $ref("wpCommentsResponseSchema"),
        },
      },
    },

    searchWpCommentsHandler,
  )

  server.get(
    "/:wpCommentId",
    {
      schema: {
        response: {
          200: $ref("wpCommentsResponseSchema"),
        },
      },
    },
    getWpCommentByIdHandler,
  )

  server.get(
    "/by-post/:wpPostId",
    {
      schema: {
        response: {
          200: $ref("wpCommentsResponseSchema"),
        },
      },
    },
    getWpCommentByPostIdHandler,
  )

  server.put(
    "/:wpCommentId",
    {
      preHandler: [server.authenticate],
      schema: {
        body: $ref("updateWpCommentSchema"),
        response: {
          201: $ref("wpCommentResponseSchema"),
        },
      },
    },
    updateWpCommentHandler,
  )

  server.delete(
    "/:wpCommentId",
    { preHandler: [server.authenticate] },
    deleteWpCommentHandler,
  )

  server.get("/count", getTotalWpCommentsHandler)
}

export default wpCommentRoutes
