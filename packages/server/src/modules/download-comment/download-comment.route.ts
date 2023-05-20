import { FastifyInstance } from "fastify"

import {
  createDownloadCommentHandler,
  deleteDownloadCommentHandler,
  getDownloadCommentByDownloadIdHandler,
  getDownloadCommentByIdHandler,
  getDownloadCommentsDashboardHandler,
  getDownloadCommentsHandler,
  getTotalDownloadCommentsHandler,
  searchDownloadCommentsHandler,
  updateDownloadCommentHandler,
} from "./download-comment.controller"
import { $ref } from "./download-comment.schema"

async function downloadCommentRoutes(server: FastifyInstance) {
  server.post(
    "/",
    {
      preHandler: [server.authenticate],
      schema: {
        body: $ref("createDownloadCommentSchema"),
        response: {
          201: $ref("downloadCommentResponseSchema"),
        },
      },
    },
    createDownloadCommentHandler,
  )

  server.put(
    "/:downloadCommentId",
    {
      preHandler: [server.authenticate],
      schema: {
        body: $ref("updateDownloadCommentSchema"),
        response: {
          201: $ref("downloadCommentResponseSchema"),
        },
      },
    },
    updateDownloadCommentHandler,
  )

  server.delete(
    "/:downloadCommentId",
    { preHandler: [server.authenticate] },
    deleteDownloadCommentHandler,
  )

  server.get(
    "/page/:downloadCommentPage",
    {
      schema: {
        response: {
          200: $ref("downloadCommentsResponseSchema"),
        },
      },
    },
    getDownloadCommentsHandler,
  )

  server.get(
    "/dashboard/page/:downloadCommentPage",
    {
      schema: {
        response: {
          200: $ref("downloadCommentsResponseSchema"),
        },
      },
    },
    getDownloadCommentsDashboardHandler,
  )

  server.get(
    "/download/:downloadId",
    {
      schema: {
        response: {
          200: $ref("downloadCommentsResponseSchema"),
        },
      },
    },
    getDownloadCommentByDownloadIdHandler,
  )

  server.get(
    "/:downloadCommentId",
    {
      schema: {
        response: {
          200: $ref("downloadCommentsResponseSchema"),
        },
      },
    },
    getDownloadCommentByIdHandler,
  )

  server.get("/count", getTotalDownloadCommentsHandler)

  server.get(
    "/search/:searchDownloadCommentQuery",
    {
      schema: {
        response: {
          200: $ref("downloadCommentsResponseSchema"),
        },
      },
    },
    searchDownloadCommentsHandler,
  )
}

export default downloadCommentRoutes
