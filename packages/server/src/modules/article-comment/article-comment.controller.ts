import { FastifyReply, FastifyRequest } from "fastify"

import {
  CreateArticleCommentInput,
  UpdateArticleCommentInput,
} from "./article-comment.schema"
import {
  createArticleComment,
  deleteArticleCommentById,
  getArticleCommentById,
  getArticleComments,
  getArticleCommentsByArticleId,
  getArticleCommentsDashboard,
  getTotalArticleCommentByArticle,
  getTotalArticleComments,
  searchArticlecomments,
  updateArticleComment,
} from "./article-comment.service"

export async function createArticleCommentHandler(
  request: FastifyRequest<{
    Body: CreateArticleCommentInput & { articleId: string }
  }>,
  reply: FastifyReply,
) {
  try {
    const { content, articleId } = request.body
    const user = request.user

    const articleComment = await createArticleComment({
      content,
      articleId,
      authorId: user.id,
    })

    return reply.code(201).send(articleComment)
  } catch (e) {
    console.log(e)
    return reply.code(500).send(e)
  }
}

export async function updateArticleCommentHandler(
  request: FastifyRequest<{
    Params: { articleCommentId: string }
    Body: UpdateArticleCommentInput
  }>,
  reply: FastifyReply,
) {
  try {
    const { content } = request.body
    const user = request.user
    const articleCommentId = request.params.articleCommentId

    if (user.role !== "ADMIN") {
      return reply.code(403).send({ message: "Unauthorized" })
    }

    const articleComment = await updateArticleComment(articleCommentId, {
      content,
    })
    return reply.code(201).send(articleComment)
  } catch (e) {
    console.log(e)
    return reply.code(500).send(e)
  }
}

export async function deleteArticleCommentHandler(
  request: FastifyRequest<{ Params: { articleCommentId: string } }>,
  reply: FastifyReply,
) {
  try {
    const { articleCommentId } = request.params
    const user = request.user
    const deleteComment = await deleteArticleCommentById(articleCommentId)

    if (user.role !== "ADMIN") {
      return reply.code(403).send({ message: "Unauthorized" })
    }

    return reply.code(201).send(deleteComment)
  } catch (e) {
    console.log(e)
    return reply.code(500).send(e)
  }
}

export async function getArticleCommentsHandler(
  request: FastifyRequest<{ Params: { articleCommentPage: number } }>,
  reply: FastifyReply,
) {
  try {
    const perPage = 10
    const articleCommentPage = Number(request.params.articleCommentPage || 1)
    const articleComments = await getArticleComments(
      articleCommentPage,
      perPage,
    )
    return reply.code(201).send(articleComments)
  } catch (e) {
    console.log(e)
    return reply.code(500).send(e)
  }
}

export async function getArticleCommentsDashboardHandler(
  request: FastifyRequest<{ Params: { articleCommentPage: number } }>,
  reply: FastifyReply,
) {
  try {
    const perPage = 10
    const articleCommentPage = Number(request.params.articleCommentPage || 1)
    const articleComments = await getArticleCommentsDashboard(
      articleCommentPage,
      perPage,
    )
    return reply.code(201).send(articleComments)
  } catch (e) {
    console.log(e)
    return reply.code(500).send(e)
  }
}

export async function getArticleCommentByArticleIdHandler(
  request: FastifyRequest<{
    Params: { articleId: string; articleCommentPage: number }
  }>,
  reply: FastifyReply,
) {
  try {
    const { articleId } = request.params
    const perPage = 10

    const articleCommentPage = Number(request.params.articleCommentPage || 1)
    const articleComments = await getArticleCommentsByArticleId(
      articleId,
      articleCommentPage,
      perPage,
    )

    return reply.code(201).send(articleComments)
  } catch (e) {
    console.log(e)
    return reply.code(500).send(e)
  }
}

export async function getArticleCommentByIdHandler(
  request: FastifyRequest<{
    Params: { articleCommentId: string }
  }>,
  reply: FastifyReply,
) {
  try {
    const { articleCommentId: commentId } = request.params
    const articleComment = await getArticleCommentById(commentId)
    return reply.code(201).send(articleComment)
  } catch (e) {
    console.log(e)
    return reply.code(500).send(e)
  }
}

export async function getTotalArticleCommentByArticleHandler(
  request: FastifyRequest<{
    Params: { articleId: string }
  }>,
  reply: FastifyReply,
) {
  const { articleId } = request.params
  try {
    const totalComments = await getTotalArticleCommentByArticle(articleId)
    return reply.code(201).send(totalComments)
  } catch (e) {
    console.log(e)
    return reply.code(500).send(e)
  }
}

export async function getTotalArticleCommentsHandler(
  _request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    const articleComments = await getTotalArticleComments()
    return reply.code(201).send(articleComments)
  } catch (e) {
    console.log(e)
    return reply.code(500).send(e)
  }
}

export async function searchArticleCommentsHandler(
  request: FastifyRequest<{ Params: { searchArticleCommentQuery: string } }>,
  reply: FastifyReply,
) {
  try {
    const searchQuery = request.params.searchArticleCommentQuery

    const articleComments = await searchArticlecomments(searchQuery)
    return reply.code(201).send(articleComments)
  } catch (e) {
    console.log(e)
    return reply.code(500).send(e)
  }
}
