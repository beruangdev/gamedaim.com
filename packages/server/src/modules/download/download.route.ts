import { FastifyInstance } from "fastify"

import {
  createDownloadHandler,
  createDownloadWithPrimaryHandler,
  deleteDownloadHandler,
  deleteDownloadWithPrimaryHandler,
  getDownloadByAuthorUsernameAndLangHandler,
  getDownloadByIdHandler,
  getDownloadBySlugHandler,
  getDownloadsByLangHandler,
  getDownloadsByTypeAndLangHandler,
  getDownloadsDashboardByLangHandler,
  getDownloadsSitemapByLangHandler,
  getTotalDownloadPrimariesHandler,
  getTotalDownloadsHandler,
  searchDownloadsByLangHandler,
  searchDownloadsDashboardByLangHandler,
  updateDownloadHandler,
} from "./download.controller"
import { $ref } from "./download.schema"

async function downloadRoutes(server: FastifyInstance) {
  server.post(
    "/with-primary",
    {
      preHandler: [server.authenticate],
      schema: {
        body: $ref("createDownloadSchema"),
        response: {
          201: $ref("downloadResponseSchema"),
        },
      },
    },
    createDownloadWithPrimaryHandler,
  )

  server.post(
    "/",
    {
      preHandler: [server.authenticate],
      schema: {
        body: $ref("createDownloadSchema"),
        response: {
          201: $ref("downloadResponseSchema"),
        },
      },
    },
    createDownloadHandler,
  )

  server.put(
    "/:downloadId",
    {
      preHandler: [server.authenticate],
      schema: {
        body: $ref("updateDownloadSchema"),
        response: {
          201: $ref("downloadResponseSchema"),
        },
      },
    },
    updateDownloadHandler,
  )

  server.delete(
    "/with-primary/:downloadId",
    { preHandler: [server.authenticate] },
    deleteDownloadWithPrimaryHandler,
  )

  server.delete(
    "/:downloadId",
    { preHandler: [server.authenticate] },
    deleteDownloadHandler,
  )

  server.get(
    "/:downloadId",
    {
      schema: {
        response: {
          200: $ref("downloadsResponseSchema"),
        },
      },
    },
    getDownloadByIdHandler,
  )

  server.get(
    "/:downloadLanguage/page/:downloadPage",
    {
      schema: {
        response: {
          200: $ref("downloadsResponseSchema"),
        },
      },
    },

    getDownloadsByLangHandler,
  )

  server.get(
    "/:downloadLanguage/dashboard/page/:downloadPage",
    {
      schema: {
        response: {
          200: $ref("downloadsResponseSchema"),
        },
      },
    },

    getDownloadsDashboardByLangHandler,
  )

  server.get(
    "/:downloadLanguage/sitemap/page/:downloadPage",
    {
      schema: {
        response: {
          200: $ref("downloadsResponseSchema"),
        },
      },
    },

    getDownloadsSitemapByLangHandler,
  )

  server.get(
    "/slug/:downloadSlug/:downloadFilesPage",
    {
      schema: {
        response: {
          200: $ref("downloadsResponseSchema"),
        },
      },
    },
    getDownloadBySlugHandler,
  )

  server.get(
    "/:downloadLanguage/author/:authorUsername/:downloadPage",
    {
      schema: {
        response: {
          200: $ref("downloadsResponseSchema"),
        },
      },
    },
    getDownloadByAuthorUsernameAndLangHandler,
  )

  server.get(
    "/:downloadLanguage/type/:downloadType/:downloadPage",
    {
      schema: {
        response: {
          200: $ref("downloadsResponseSchema"),
        },
      },
    },
    getDownloadsByTypeAndLangHandler,
  )

  server.get("/count/primary", getTotalDownloadPrimariesHandler)

  server.get("/count", getTotalDownloadsHandler)

  server.get(
    "/:downloadLanguage/search/:searchDownloadQuery",
    {
      schema: {
        response: {
          200: $ref("downloadsResponseSchema"),
        },
      },
    },
    searchDownloadsByLangHandler,
  )

  server.get(
    "/:downloadLanguage/search/dashboard/:searchDownloadQuery",
    {
      schema: {
        response: {
          200: $ref("downloadsResponseSchema"),
        },
      },
    },
    searchDownloadsDashboardByLangHandler,
  )
}

export default downloadRoutes
