import { FastifyInstance } from "fastify"

import {
  createDownloadFileHandler,
  deleteDownloadFileHandler,
  getDownloadFileByAuthorUsernameHandler,
  getDownloadFileByIdHandler,
  getDownloadFileBySlugHandler,
  getDownloadFilesHandler,
  getDownloadFilesSitemapHandler,
  getTotalDownloadFilesHandler,
  searchDownloadFilesHandler,
  updateDownloadFileHandler,
} from "./download-file.controller"
import { $ref } from "./download-file.schema"

async function downloadFileRoutes(server: FastifyInstance) {
  server.post(
    "/",
    {
      preHandler: [server.authenticate],
      schema: {
        body: $ref("createDownloadFileSchema"),
        response: {
          201: $ref("downloadFileResponseSchema"),
        },
      },
    },
    createDownloadFileHandler,
  )

  server.put(
    "/:downloadFileId",
    {
      preHandler: [server.authenticate],
      schema: {
        body: $ref("updateDownloadFileSchema"),
        response: {
          201: $ref("downloadFileResponseSchema"),
        },
      },
    },
    updateDownloadFileHandler,
  )

  server.delete(
    "/:downloadFileId",
    { preHandler: [server.authenticate] },
    deleteDownloadFileHandler,
  )

  server.get(
    "/page/:downloadFilePage",
    {
      schema: {
        response: {
          200: $ref("downloadFilesResponseSchema"),
        },
      },
    },

    getDownloadFilesHandler,
  )

  server.get(
    "/sitemap/page/:downloadFilePage",
    {
      schema: {
        response: {
          200: $ref("downloadFilesResponseSchema"),
        },
      },
    },

    getDownloadFilesSitemapHandler,
  )

  server.get(
    "/:downloadFileId",
    {
      schema: {
        response: {
          200: $ref("downloadFilesResponseSchema"),
        },
      },
    },
    getDownloadFileByIdHandler,
  )

  server.get(
    "/slug/:downloadFileSlug",
    {
      schema: {
        response: {
          200: $ref("downloadFilesResponseSchema"),
        },
      },
    },
    getDownloadFileBySlugHandler,
  )

  server.get(
    "/author/:authorUsername/:downloadFilePage",
    {
      schema: {
        response: {
          200: $ref("downloadFilesResponseSchema"),
        },
      },
    },
    getDownloadFileByAuthorUsernameHandler,
  )

  server.get("/count", getTotalDownloadFilesHandler)

  server.get(
    "/search/:searchDownloadFileQuery",
    {
      schema: {
        response: {
          200: $ref("downloadFilesResponseSchema"),
        },
      },
    },

    searchDownloadFilesHandler,
  )
}

export default downloadFileRoutes
