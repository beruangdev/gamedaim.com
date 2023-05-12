import { FastifyInstance } from "fastify"
import {
  createTopicWithParentHandler,
  deleteTopicWithParentHandler,
  getTopicsByLangHandler,
  getTopicByIdHandler,
  getTopicBySlugHandler,
  getTotalTopicsHandler,
  searchTopicsByLangHandler,
  getTopicsSitemapByLangHandler,
  getTopicsByTypeAndLangHandler,
  getTopicsDashboardByLangHandler,
  searchTopicsDashboardHandler,
  updateTopicHandler,
  createTopicHandler,
  getTopicParentByIdHandler,
  getTotalTopicParentsHandler,
  deleteTopicHandler,
  getTopicArticlesBySlugHandler,
} from "./topic.controller"

import { $ref } from "./topic.schema"

async function topicRoutes(server: FastifyInstance) {
  server.post(
    "/with-parent",
    {
      preHandler: [server.authenticate],
      schema: {
        body: $ref("createTopicSchema"),
        response: {
          201: $ref("topicResponseSchema"),
        },
      },
    },
    createTopicWithParentHandler,
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
    "/with-parent/:topicId",
    { preHandler: [server.authenticate] },
    deleteTopicWithParentHandler,
  )

  server.delete(
    "/:topicId",
    { preHandler: [server.authenticate] },
    deleteTopicHandler,
  )

  server.get(
    "/parent/:topicParentId",
    {
      schema: {
        response: {
          200: $ref("topicsResponseSchema"),
        },
      },
    },
    getTopicParentByIdHandler,
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
    "/slug/:topicSlug/articles/:topicPage",
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

  server.get("/count/parent", getTotalTopicParentsHandler)

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
}

export default topicRoutes
