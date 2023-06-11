import { FastifyInstance } from "fastify"

import {
  createTopicHandler,
  createTopicWithPrimaryHandler,
  deleteTopicHandler,
  deleteTopicWithPrimaryHandler,
  getTopicArticlesBySlugHandler,
  getTopicByIdHandler,
  getTopicBySlugHandler,
  getTopicDownloadsBySlugHandler,
  getTopicPrimaryByIdHandler,
  getTopicsByLangHandler,
  getTopicsByTypeAndLangHandler,
  getTopicsDashboardByLangHandler,
  getTopicsSitemapByLangHandler,
  getTotalTopicPrimariesHandler,
  getTotalTopicsByLangHandler,
  getTotalTopicsHandler,
  searchTopicsByLangAndTypeHandler,
  searchTopicsByLangHandler,
  searchTopicsDashboardHandler,
  updateTopicHandler,
} from "./topic.controller"
import { $ref } from "./topic.schema"

async function topicRoutes(server: FastifyInstance) {
  server.post(
    "/with-primary",
    {
      preHandler: [server.authenticate],
      schema: {
        body: $ref("createTopicPrimarySchema"),
        response: {
          201: $ref("topicResponseSchema"),
        },
      },
    },
    createTopicWithPrimaryHandler,
  )

  server.post(
    "/",
    {
      preHandler: [server.authenticate],
      schema: {
        body: $ref("createTopicSchema"),
        response: {
          201: $ref("topicResponseSchema"),
        },
      },
    },
    createTopicHandler,
  )

  server.put(
    "/:topicId",
    {
      preHandler: [server.authenticate],
      schema: {
        body: $ref("updateTopicSchema"),
        response: {
          201: $ref("topicResponseSchema"),
        },
      },
    },
    updateTopicHandler,
  )

  server.delete(
    "/with-primary/:topicPrimaryId",
    { preHandler: [server.authenticate] },
    deleteTopicWithPrimaryHandler,
  )

  server.delete(
    "/:topicId",
    { preHandler: [server.authenticate] },
    deleteTopicHandler,
  )

  server.get(
    "/primary/:topicPrimaryId",
    {
      schema: {
        response: {
          200: $ref("topicsResponseSchema"),
        },
      },
    },
    getTopicPrimaryByIdHandler,
  )

  server.get(
    "/:topicId",
    {
      schema: {
        response: {
          200: $ref("topicsResponseSchema"),
        },
      },
    },
    getTopicByIdHandler,
  )

  server.get(
    "/:topicLanguage/page/:topicPage",
    {
      schema: {
        response: {
          200: $ref("topicsResponseSchema"),
        },
      },
    },
    getTopicsByLangHandler,
  )

  server.get(
    "/:topicLanguage/dashboard/page/:topicPage",
    {
      schema: {
        response: {
          200: $ref("topicsResponseSchema"),
        },
      },
    },
    getTopicsDashboardByLangHandler,
  )

  server.get(
    "/:topicLanguage/sitemap/page/:topicPage",
    {
      schema: {
        response: {
          200: $ref("topicsResponseSchema"),
        },
      },
    },
    getTopicsSitemapByLangHandler,
  )

  server.get(
    "/:topicLanguage/type/:topicType/page/:topicPage",
    {
      schema: {
        response: {
          200: $ref("topicsResponseSchema"),
        },
      },
    },

    getTopicsByTypeAndLangHandler,
  )

  server.get(
    "/slug/:topicSlug/articles/page/:topicPage",
    {
      schema: {
        response: {
          200: $ref("topicsResponseSchema"),
        },
      },
    },
    getTopicArticlesBySlugHandler,
  )

  server.get(
    "/slug/:topicSlug/downloads/page/:topicPage",
    {
      schema: {
        response: {
          200: $ref("topicsResponseSchema"),
        },
      },
    },
    getTopicDownloadsBySlugHandler,
  )

  server.get(
    "/slug/:topicSlug",
    {
      schema: {
        response: {
          200: $ref("topicsResponseSchema"),
        },
      },
    },
    getTopicBySlugHandler,
  )

  server.get("/count", getTotalTopicsHandler)

  server.get("/:topicLanguage/count", getTotalTopicsByLangHandler)

  server.get("/count/primary", getTotalTopicPrimariesHandler)

  server.get(
    "/:topicLanguage/search/:searchTopicQuery",
    {
      schema: {
        response: {
          200: $ref("topicsResponseSchema"),
        },
      },
    },
    searchTopicsByLangHandler,
  )

  server.get(
    "/:topicLanguage/search/dashboard/:searchTopicQuery",
    {
      schema: {
        response: {
          200: $ref("topicsResponseSchema"),
        },
      },
    },
    searchTopicsDashboardHandler,
  )

  server.get(
    "/:topicLanguage/type/:topicType/search/:searchTopicQuery",
    {
      schema: {
        response: {
          200: $ref("topicsResponseSchema"),
        },
      },
    },
    searchTopicsByLangAndTypeHandler,
  )
}

export default topicRoutes
