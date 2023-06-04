import { FastifyInstance } from "fastify"

import {
  createArticleHandler,
  createArticleWithPrimaryHandler,
  deleteArticleHandler,
  deleteArticleWithPrimaryHandler,
  getArticleByAuthorUsernameAndLangHandler,
  getArticleByIdHandler,
  getArticleBySlugHandler,
  getArticlePrimaryByIdHandler,
  getArticlesByLangHandler,
  getArticlesDashboardByLangHandler,
  getArticlesSitemapByLangHandler,
  getTotalArticlePrimariesHandler,
  getTotalArticlesHandler,
  searchArticlesByLangHandler,
  searchArticlesDashboardByLangHandler,
  updateArticleHandler,
} from "./article.controller"
import { $ref } from "./article.schema"

async function articleRoutes(server: FastifyInstance) {
  server.post(
    "/with-primary",
    {
      preHandler: [server.authenticate],
      schema: {
        body: $ref("createArticlePrimarySchema"),
        response: {
          201: $ref("articleResponseSchema"),
        },
      },
    },
    createArticleWithPrimaryHandler,
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
    "/with-primary/:articleId",
    { preHandler: [server.authenticate] },
    deleteArticleWithPrimaryHandler,
  )

  server.delete(
    "/:articleId",
    { preHandler: [server.authenticate] },
    deleteArticleHandler,
  )

  server.get(
    "/primary/:articleId",
    {
      schema: {
        response: {
          200: $ref("articlesResponseSchema"),
        },
      },
    },
    getArticlePrimaryByIdHandler,
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
    "/:articleLanguage/author/:authorUsername/page/:articlePage",
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

  server.get("/count/primary", getTotalArticlePrimariesHandler)

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
    searchArticlesDashboardByLangHandler,
  )
}

export default articleRoutes
