import { FastifyReply, FastifyRequest } from "fastify"

import { uniqueSlug, slugify } from "../../utils/slug"
import { CreateArticleInput, UpdateArticleInput } from "./article.schema"
import {
  createArticleWithParent,
  getArticlesByLang,
  deleteArticleById,
  updateArticle,
  getArticleById,
  getArticlesByAuthorUsernameAndLang,
  getArticleBySlug,
  getTotalArticles,
  searchArticlesByLang,
  getArticlesSitemapByLang,
  getArticlesDashboardByLang,
  searchArticlesDashboardByLang,
  createArticle,
  getArticleParentById,
  deleteArticleWithParentById,
  getTotalArticleParents,
} from "./article.service"
import { trimText } from "../../utils/trim"

export async function createArticleWithParentHandler(
  request: FastifyRequest<{
    Body: Omit<CreateArticleInput, "articleParentId">
  }>,
  reply: FastifyReply,
) {
  try {
    const {
      title,
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

    const articleWithParent = await createArticleWithParent({
      title,
      content,
      excerpt: generatedExcerpt,
      metaTitle: generatedMetaTitle,
      metaDescription: generatedMetaDescription,
      slug: articleSlug,
      featuredImageId,
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

    return reply.code(201).send(articleWithParent)
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
      articleParentId,
      title,
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
      articleParentId,
      title,
      content,
      excerpt: generatedExcerpt,
      metaTitle: generatedMetaTitle,
      metaDescription: generatedMetaDescription,
      slug: articleSlug,
      featuredImageId,
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
      articleParentId,
      title,
      slug,
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
      articleParentId,
      title,
      content,
      excerpt,
      metaTitle,
      metaDescription,
      slug,
      topics: {
        connect: topicIds.map((id) => ({ id })),
      },
      authors: {
        connect: authorIds.map((id) => ({ id })),
      },
      editors: {
        connect: editorIds.map((id) => ({ id })),
      },
      featuredImageId,
    })

    return reply.code(201).send(updatedArticle)
  } catch (e) {
    console.log(e)
    return reply.code(500).send(e)
  }
}

export async function deleteArticleWithParentHandler(
  request: FastifyRequest<{ Params: { articleParentId: string } }>,
  reply: FastifyReply,
) {
  try {
    const { articleParentId } = request.params
    const user = request.user
    const deletedArticleWithParent = await deleteArticleWithParentById(
      articleParentId,
    )

    if (user.role !== "ADMIN") {
      return reply.code(403).send({ message: "Unauthorized" })
    }

    return reply.code(201).send(deletedArticleWithParent)
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

export async function getArticleParentByIdHandler(
  request: FastifyRequest<{
    Params: { articleParentId: string }
  }>,
  reply: FastifyReply,
) {
  try {
    const { articleParentId } = request.params
    const articleParent = await getArticleParentById(articleParentId)
    return reply.code(201).send(articleParent)
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
    Params: { articleLanguage: "id_ID" | "en_US"; articlePage: number }
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
    Params: { articleLanguage: "id_ID" | "en_US"; articlePage: number }
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
    Params: { articleLanguage: "id_ID" | "en_US"; articlePage: number }
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
      articleLanguage: "id_ID" | "en_US"
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

export async function getTotalArticleParentsHandler(
  _request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    const articleParents = await getTotalArticleParents()
    return reply.code(201).send(articleParents)
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

export async function searchArticlesByLangHandler(
  request: FastifyRequest<{
    Params: { articleLanguage: "id_ID" | "en_US"; searchArticleQuery: string }
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

export async function searchArticlesDasboardHandler(
  request: FastifyRequest<{
    Params: { articleLanguage: "id_ID" | "en_US"; searchArticleQuery: string }
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
