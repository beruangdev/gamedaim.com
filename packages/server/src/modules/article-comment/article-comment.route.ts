import { FastifyInstance } from "fastify"

import {
  createArticleCommentHandler,
  deleteArticleCommentHandler,
  getArticleCommentByArticleIdHandler,
  getArticleCommentByIdHandler,
  getArticleCommentsDashboardHandler,
  getArticleCommentsHandler,
  getTotalArticleCommentsHandler,
  searchArticleCommentsHandler,
  updateArticleCommentHandler,
} from "./article-comment.controller"
import { $ref } from "./article-comment.schema"

async function articleCommentRoutes(server: FastifyInstance) {
  server.post(
    "/",
    {
      preHandler: [server.authenticate],
      schema: {
        body: $ref("createArticleCommentSchema"),
        response: {
          201: $ref("articleCommentResponseSchema"),
        },
      },
    },
    createArticleCommentHandler,
  )

  server.put(
    "/:articleCommentId",
    {
      preHandler: [server.authenticate],
      schema: {
        body: $ref("updateArticleCommentSchema"),
        response: {
          201: $ref("articleCommentResponseSchema"),
        },
      },
    },
    updateArticleCommentHandler,
  )

  server.delete(
    "/:articleCommentId",
    { preHandler: [server.authenticate] },
    deleteArticleCommentHandler,
  )

  server.get(
    "/page/:articleCommentPage",
    {
      schema: {
        response: {
          200: $ref("articleCommentsResponseSchema"),
        },
      },
    },
    getArticleCommentsHandler,
  )

  server.get(
    "/dashboard/page/:articleCommentPage",
    {
      schema: {
        response: {
          200: $ref("articleCommentsResponseSchema"),
        },
      },
    },
    getArticleCommentsDashboardHandler,
  )

  server.get(
    "/article/:articleId",
    {
      schema: {
        response: {
          200: $ref("articleCommentsResponseSchema"),
        },
      },
    },
    getArticleCommentByArticleIdHandler,
  )

  server.get(
    "/:articleCommentId",
    {
      schema: {
        response: {
          200: $ref("articleCommentsResponseSchema"),
        },
      },
    },
    getArticleCommentByIdHandler,
  )

  server.get("/count", getTotalArticleCommentsHandler)

  server.get(
    "/search/:searchArticleCommentQuery",
    {
      schema: {
        response: {
          200: $ref("articleCommentsResponseSchema"),
        },
      },
    },
    searchArticleCommentsHandler,
  )
}

export default articleCommentRoutes
