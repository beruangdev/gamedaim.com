import { FastifyReply, FastifyRequest } from "fastify"
import { LanguageType } from "@prisma/client"

import { slugify, uniqueSlug } from "@/utils/slug"
import { trimText } from "@/utils/trim"
import {
  CreateArticleInput,
  CreateArticlePrimaryInput,
  UpdateArticleInput,
} from "./article.schema"
import {
  createArticle,
  createArticleWithPrimary,
  deleteArticleById,
  deleteArticleWithPrimaryById,
  getArticleById,
  getArticleBySlug,
  getArticlePrimaryById,
  getArticlesByAuthorUsernameAndLang,
  getArticlesByLang,
  getArticlesDashboardByLang,
  getArticlesSitemapByLang,
  getTotalArticlePrimaries,
  getTotalArticles,
  getTotalArticlesByLang,
  searchArticlesByLang,
  searchArticlesDashboardByLang,
  updateArticle,
} from "./article.service"

export async function createArticleWithPrimaryHandler(
  request: FastifyRequest<{
    Body: CreateArticlePrimaryInput
  }>,
  reply: FastifyReply,
) {
  try {
    const {
      title,
      language,
      content,
      excerpt,
      metaTitle,
      metaDescription,
      featuredImageId,
      topicIds,
      authorIds,
      editorIds,
    } = request.body
    const user = request.user
    const articleSlug = slugify(title.toLowerCase()) + "_" + uniqueSlug()

    if (user.role !== "ADMIN") {
      return reply.code(403).send({ message: "Unauthorized" })
    }

    const generatedExcerpt = !excerpt ? trimText(content, 160) : excerpt
    const generatedMetaTitle = !metaTitle ? title : metaTitle
    const generatedMetaDescription = !metaDescription
      ? generatedExcerpt
      : metaDescription

    const articleWithPrimary = await createArticleWithPrimary({
      title: title,
      language: language,
      content: content,
      excerpt: generatedExcerpt,
      metaTitle: generatedMetaTitle,
      metaDescription: generatedMetaDescription,
      slug: articleSlug,
      featuredImageId: featuredImageId,
      topics: {
        connect: topicIds.map((id) => ({ id })),
      },
      authors: {
        connect: authorIds.map((id) => ({ id })),
      },
      editors: {
        connect: editorIds.map((id) => ({ id })),
      },
    })

    return reply.code(201).send(articleWithPrimary)
  } catch (e) {
    return reply.code(500).send(e)
  }
}

export async function createArticleHandler(
  request: FastifyRequest<{
    Body: CreateArticleInput
  }>,
  reply: FastifyReply,
) {
  try {
    const {
      articlePrimaryId,
      title,
      language,
      content,
      excerpt,
      metaTitle,
      metaDescription,
      featuredImageId,
      topicIds,
      authorIds,
      editorIds,
    } = request.body
    const user = request.user
    const articleSlug = slugify(title.toLowerCase()) + "_" + uniqueSlug()

    if (user.role !== "ADMIN") {
      return reply.code(403).send({ message: "Unauthorized" })
    }

    const generatedExcerpt = !excerpt ? trimText(content, 160) : excerpt
    const generatedMetaTitle = !metaTitle ? title : metaTitle
    const generatedMetaDescription = !metaDescription
      ? generatedExcerpt
      : metaDescription

    const article = await createArticle({
      articlePrimaryId: articlePrimaryId,
      title: title,
      language: language,
      content: content,
      excerpt: generatedExcerpt,
      metaTitle: generatedMetaTitle,
      metaDescription: generatedMetaDescription,
      slug: articleSlug,
      featuredImageId: featuredImageId,
      topics: {
        connect: topicIds.map((id) => ({ id })),
      },
      authors: {
        connect: authorIds.map((id) => ({ id })),
      },
      editors: {
        connect: editorIds.map((id) => ({ id })),
      },
    })

    return reply.code(201).send(article)
  } catch (e) {
    return reply.code(500).send(e)
  }
}

export async function updateArticleHandler(
  request: FastifyRequest<{
    Params: { articleId: string }
    Body: UpdateArticleInput & {
      excerpt: string
    }
  }>,
  reply: FastifyReply,
) {
  try {
    const {
      title,
      slug,
      language,
      content,
      excerpt,
      metaTitle,
      metaDescription,
      featuredImageId,
      topicIds,
      authorIds,
      editorIds,
    } = request.body
    const user = request.user
    const articleId = request.params.articleId

    const allowedRoles = ["ADMIN", "AUTHOR"]

    if (!allowedRoles.includes(user.role)) {
      return reply
        .code(403)
        .send({ message: "Only Author and Admin can update article" })
    }

    const updatedArticle = await updateArticle(articleId, {
      title: title,
      language: language,
      content: content,
      excerpt: excerpt,
      metaTitle: metaTitle,
      metaDescription: metaDescription,
      slug: slug,
      featuredImageId: featuredImageId,
      topics: {
        connect: topicIds.map((id) => ({ id })),
      },
      authors: {
        connect: authorIds.map((id) => ({ id })),
      },
      editors: {
        connect: editorIds.map((id) => ({ id })),
      },
    })

    return reply.code(201).send(updatedArticle)
  } catch (e) {
    console.log(e)
    return reply.code(500).send(e)
  }
}

export async function deleteArticleWithPrimaryHandler(
  request: FastifyRequest<{ Params: { articlePrimaryId: string } }>,
  reply: FastifyReply,
) {
  try {
    const { articlePrimaryId } = request.params
    const user = request.user
    const deletedArticleWithPrimary = await deleteArticleWithPrimaryById(
      articlePrimaryId,
    )

    if (user.role !== "ADMIN") {
      return reply.code(403).send({ message: "Unauthorized" })
    }

    return reply.code(201).send(deletedArticleWithPrimary)
  } catch (e) {
    console.log(e)
    return reply.code(500).send(e)
  }
}

export async function deleteArticleHandler(
  request: FastifyRequest<{ Params: { articleId: string } }>,
  reply: FastifyReply,
) {
  try {
    const { articleId } = request.params
    const deleteArticle = await deleteArticleById(articleId)
    return reply.code(201).send(deleteArticle)
  } catch (e) {
    console.log(e)
    return reply.code(500).send(e)
  }
}

export async function getArticlePrimaryByIdHandler(
  request: FastifyRequest<{
    Params: { articlePrimaryId: string }
  }>,
  reply: FastifyReply,
) {
  try {
    const { articlePrimaryId } = request.params
    const articlePrimary = await getArticlePrimaryById(articlePrimaryId)
    return reply.code(201).send(articlePrimary)
  } catch (e) {
    console.log(e)
    return reply.code(500).send(e)
  }
}

export async function getArticleByIdHandler(
  request: FastifyRequest<{
    Params: { articleId: string }
  }>,
  reply: FastifyReply,
) {
  try {
    const { articleId } = request.params
    const article = await getArticleById(articleId)
    return reply.code(201).send(article)
  } catch (e) {
    console.log(e)
    return reply.code(500).send(e)
  }
}

export async function getArticlesByLangHandler(
  request: FastifyRequest<{
    Params: { articleLanguage: LanguageType; articlePage: number }
  }>,
  reply: FastifyReply,
) {
  try {
    const perPage = 10
    const articleLanguage = request.params.articleLanguage
    const articlePage = Number(request.params.articlePage || 1)

    const articles = await getArticlesByLang(
      articleLanguage,
      articlePage,
      perPage,
    )
    return reply.code(201).send(articles)
  } catch (e) {
    return reply.code(500).send(e)
  }
}

export async function getArticlesDashboardByLangHandler(
  request: FastifyRequest<{
    Params: { articleLanguage: LanguageType; articlePage: number }
  }>,
  reply: FastifyReply,
) {
  try {
    const perPage = 10
    const articleLanguage = request.params.articleLanguage
    const articlePage = Number(request.params.articlePage || 1)

    const articles = await getArticlesDashboardByLang(
      articleLanguage,
      articlePage,
      perPage,
    )
    return reply.code(201).send(articles)
  } catch (e) {
    return reply.code(500).send(e)
  }
}

export async function getArticlesSitemapByLangHandler(
  request: FastifyRequest<{
    Params: { articleLanguage: LanguageType; articlePage: number }
  }>,
  reply: FastifyReply,
) {
  try {
    const perPage = 100
    const articleLanguage = request.params.articleLanguage
    const articlePage = Number(request.params.articlePage || 1)

    const articles = await getArticlesSitemapByLang(
      articleLanguage,
      articlePage,
      perPage,
    )
    return reply.code(201).send(articles)
  } catch (e) {
    return reply.code(500).send(e)
  }
}

export async function getArticleBySlugHandler(
  request: FastifyRequest<{
    Params: { articleSlug: string }
  }>,
  reply: FastifyReply,
) {
  try {
    const { articleSlug } = request.params
    const article = await getArticleBySlug(articleSlug)
    return reply.code(201).send(article)
  } catch (e) {
    console.log(e)
    return reply.code(500).send(e)
  }
}

export async function getArticleByAuthorUsernameAndLangHandler(
  request: FastifyRequest<{
    Params: {
      articleLanguage: LanguageType
      authorUsername: string
      articlePage: number
    }
  }>,
  reply: FastifyReply,
) {
  try {
    const { authorUsername } = request.params

    const perPage = 10
    const articleLanguage = request.params.articleLanguage
    const articlePage = Number(request.params.articlePage || 1)

    const article = await getArticlesByAuthorUsernameAndLang(
      authorUsername,
      articleLanguage,
      articlePage,
      perPage,
    )
    return reply.code(201).send(article)
  } catch (e) {
    console.log(e)
    return reply.code(500).send(e)
  }
}

export async function getTotalArticlePrimariesHandler(
  _request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    const articlePrimaries = await getTotalArticlePrimaries()
    return reply.code(201).send(articlePrimaries)
  } catch (e) {
    console.log(e)
    return reply.code(500).send(e)
  }
}

export async function getTotalArticlesHandler(
  _request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    const articles = await getTotalArticles()
    return reply.code(201).send(articles)
  } catch (e) {
    console.log(e)
    return reply.code(500).send(e)
  }
}

export async function getTotalArticlesByLangHandler(
  request: FastifyRequest<{ Params: { articleLanguage: LanguageType } }>,
  reply: FastifyReply,
) {
  try {
    const articleLanguage = request.params.articleLanguage

    const articles = await getTotalArticlesByLang(articleLanguage)
    return reply.code(201).send(articles)
  } catch (e) {
    console.log(e)
    return reply.code(500).send(e)
  }
}

export async function searchArticlesByLangHandler(
  request: FastifyRequest<{
    Params: { articleLanguage: LanguageType; searchArticleQuery: string }
  }>,
  reply: FastifyReply,
) {
  try {
    const searchQuery = request.params.searchArticleQuery
    const articleLanguage = request.params.articleLanguage

    const searchedArticles = await searchArticlesByLang(
      articleLanguage,
      searchQuery,
    )
    return reply.code(201).send(searchedArticles)
  } catch (e) {
    console.log(e)
    return reply.code(500).send(e)
  }
}

export async function searchArticlesDashboardByLangHandler(
  request: FastifyRequest<{
    Params: { articleLanguage: LanguageType; searchArticleQuery: string }
  }>,
  reply: FastifyReply,
) {
  try {
    const searchQuery = request.params.searchArticleQuery
    const articleLanguage = request.params.articleLanguage

    const articles = await searchArticlesDashboardByLang(
      articleLanguage,
      searchQuery,
    )
    return reply.code(201).send(articles)
  } catch (e) {
    console.log(e)
    return reply.code(500).send(e)
  }
}
