//TODO: create getTopicArticlesBySlug Route
//TODO: create getAllTopicsHandler Route

import { FastifyInstance } from "fastify"
import {
  createTopicHandler,
  deleteTopicHandler,
  updateTopicTranslationHandler,
  getTopicsByLangHandler,
  getTopicTranslationByIdHandler,
  getTopicBySlugHandler,
  getTotalTopicsHandler,
  searchTopicsByLangHandler,
  getTopicsSitemapByLangHandler,
  getTopicsByTypeAndLangHandler,
  getTopicsDashboardByLangHandler,
  searchTopicsDashboardHandler,
  updateTopicHandler,
  createTopicTranslationHandler,
} from "./topic.controller"

import { $ref } from "./topic.schema"

async function topicRoutes(server: FastifyInstance) {
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

  server.post(
    "/translation",
    {
      preHandler: [server.authenticate],
      schema: {
        body: $ref("createTopicTranslationSchema"),
        response: {
          201: $ref("topicTranslationResponseSchema"),
        },
      },
    },
    createTopicTranslationHandler,
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
    "/sitemap/page/:topicPage",
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

  // server.get(
  //   "/all",
  //   {
  //     schema: {
  //       response: {
  //         200: $ref("topicsResponseSchema"),
  //       },
  //     },
  //   },
  //   getAllTopicsHandler,
  // )

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
    "/:topicId",
    {
      schema: {
        response: {
          200: $ref("topicsResponseSchema"),
        },
      },
    },
    getTopicTranslationByIdHandler,
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

  // server.get(
  //   "/slug/:topicSlug/articles/:topicPage",
  //   {
  //     schema: {
  //       response: {
  //         200: $ref("topicsResponseSchema"),
  //       },
  //     },
  //   },
  //   getTopicArticlesBySlugHandler,
  // )

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

  server.put(
    "/translation/:topicTranslationId",
    {
      preHandler: [server.authenticate],
      schema: {
        body: $ref("updateTopicTranslationSchema"),
        response: {
          201: $ref("topicResponseSchema"),
        },
      },
    },
    updateTopicTranslationHandler,
  )

  server.delete(
    "/:topicId",
    { preHandler: [server.authenticate] },
    deleteTopicHandler,
  )

  server.get("/count", getTotalTopicsHandler)
}

export default topicRoutes
