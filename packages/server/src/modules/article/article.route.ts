import { FastifyInstance } from "fastify"

import {
  createArticleHandler,
  deleteArticleHandler,
  updateArticleHandler,
  getArticleByIdHandler,
  getArticleBySlugHandler,
  getTotalArticlesHandler,
  getArticlesSitemapByLangHandler,
  getArticlesDashboardByLangHandler,
  searchArticlesDasboardHandler,
  createArticleWithParentHandler,
  deleteArticleWithParentHandler,
  getArticleParentByIdHandler,
  getArticlesByLangHandler,
  getArticleByAuthorUsernameAndLangHandler,
  getTotalArticleParentsHandler,
  searchArticlesByLangHandler,
} from "./article.controller"
import { $ref } from "./article.schema"

async function articleRoutes(server: FastifyInstance) {
  server.post(
    "/with-parent",
    {
      preHandler: [server.authenticate],
      schema: {
        body: $ref("createArticleSchema"),
        response: {
          201: $ref("articleResponseSchema"),
        },
      },
    },
    createArticleWithParentHandler,
  )

  server.post(
    "/",
    {
      preHandler: [server.authenticate],
      schema: {
        body: $ref("createArticleSchema"),
        response: {
          201: $ref("articleResponseSchema"),
        },
      },
    },
    createArticleHandler,
  )

  server.put(
    "/:articleId",
    {
      preHandler: [server.authenticate],
      schema: {
        body: $ref("updateArticleSchema"),
        response: {
          201: $ref("articleResponseSchema"),
        },
      },
    },
    updateArticleHandler,
  )

  server.delete(
    "/with-parent/:articleId",
    { preHandler: [server.authenticate] },
    deleteArticleWithParentHandler,
  )

  server.delete(
    "/:articleId",
    { preHandler: [server.authenticate] },
    deleteArticleHandler,
  )

  server.get(
    "/parent/:articleId",
    {
      schema: {
        response: {
          200: $ref("articlesResponseSchema"),
        },
      },
    },
    getArticleParentByIdHandler,
  )

  server.get(
    "/:articleId",
    {
      schema: {
        response: {
          200: $ref("articlesResponseSchema"),
        },
      },
    },
    getArticleByIdHandler,
  )

  server.get(
    "/:articleLanguage/page/:articlePage",
    {
      schema: {
        response: {
          200: $ref("articlesResponseSchema"),
        },
      },
    },
    getArticlesByLangHandler,
  )

  server.get(
    "/:articleLanguage/dashboard/page/:articlePage",
    {
      schema: {
        response: {
          200: $ref("articlesResponseSchema"),
        },
      },
    },
    getArticlesDashboardByLangHandler,
  )

  server.get(
    "/:articleLanguage/sitemap/page/:articlePage",
    {
      schema: {
        response: {
          200: $ref("articlesResponseSchema"),
        },
      },
    },
    getArticlesSitemapByLangHandler,
  )

  server.get(
    "/slug/:articleSlug",
    {
      schema: {
        response: {
          200: $ref("articlesResponseSchema"),
        },
      },
    },
    getArticleBySlugHandler,
  )

  server.get(
    "/author/:authorUsername/:articlePage",
    {
      schema: {
        response: {
          200: $ref("articlesResponseSchema"),
        },
      },
    },
    getArticleByAuthorUsernameAndLangHandler,
  )

  server.get("/count", getTotalArticlesHandler)

  server.get("/count/parent", getTotalArticleParentsHandler)

  server.get(
    "/:articleLanguage/search/:searchArticleQuery",
    {
      schema: {
        response: {
          200: $ref("articlesResponseSchema"),
        },
      },
    },
    searchArticlesByLangHandler,
  )

  server.get(
    "/:articleLanguage/search/dashboard/:searchArticleQuery",
    {
      schema: {
        response: {
          200: $ref("articlesResponseSchema"),
        },
      },
    },
    searchArticlesDasboardHandler,
  )
}

export default articleRoutes
