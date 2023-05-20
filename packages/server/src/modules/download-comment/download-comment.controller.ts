import { FastifyReply, FastifyRequest } from "fastify"

import {
  CreateDownloadCommentInput,
  UpdateDownloadCommentInput,
} from "./download-comment.schema"
import {
  createDownloadComment,
  deleteDownloadCommentById,
  getDownloadCommentById,
  getDownloadComments,
  getDownloadCommentsByDownloadId,
  getDownloadCommentsDashboard,
  getTotalDownloadCommentByDownload,
  getTotalDownloadComments,
  searchDownloadComments,
  updateDownloadComment,
} from "./download-comment.service"

export async function createDownloadCommentHandler(
  request: FastifyRequest<{
    Body: CreateDownloadCommentInput & { downloadId: string }
  }>,
  reply: FastifyReply,
) {
  try {
    const { content, downloadId } = request.body
    const user = request.user

    const downloadComment = await createDownloadComment({
      content,
      downloadId,
      authorId: user.id,
    })

    return reply.code(201).send(downloadComment)
  } catch (e) {
    console.log(e)
    return reply.code(500).send(e)
  }
}

export async function updateDownloadCommentHandler(
  request: FastifyRequest<{
    Params: { downloadCommentId: string }
    Body: UpdateDownloadCommentInput
  }>,
  reply: FastifyReply,
) {
  try {
    const { content } = request.body
    const user = request.user
    const downloadCommentId = request.params.downloadCommentId

    if (user.role !== "ADMIN") {
      return reply.code(403).send({ message: "Unauthorized" })
    }

    const downloadComment = await updateDownloadComment(downloadCommentId, {
      content,
    })
    return reply.code(201).send(downloadComment)
  } catch (e) {
    console.log(e)
    return reply.code(500).send(e)
  }
}

export async function deleteDownloadCommentHandler(
  request: FastifyRequest<{ Params: { downloadCommentId: string } }>,
  reply: FastifyReply,
) {
  try {
    const { downloadCommentId } = request.params
    const user = request.user
    const deleteComment = await deleteDownloadCommentById(downloadCommentId)

    if (user.role !== "ADMIN") {
      return reply.code(403).send({ message: "Unauthorized" })
    }

    return reply.code(201).send(deleteComment)
  } catch (e) {
    console.log(e)
    return reply.code(500).send(e)
  }
}

export async function getDownloadCommentsHandler(
  request: FastifyRequest<{ Params: { downloadCommentPage: number } }>,
  reply: FastifyReply,
) {
  try {
    const perPage = 10
    const downloadCommentPage = Number(request.params.downloadCommentPage || 1)
    const downloadComments = await getDownloadComments(
      downloadCommentPage,
      perPage,
    )
    return reply.code(201).send(downloadComments)
  } catch (e) {
    console.log(e)
    return reply.code(500).send(e)
  }
}

export async function getDownloadCommentsDashboardHandler(
  request: FastifyRequest<{ Params: { downloadCommentPage: number } }>,
  reply: FastifyReply,
) {
  try {
    const perPage = 10
    const downloadCommentPage = Number(request.params.downloadCommentPage || 1)
    const downloadComments = await getDownloadCommentsDashboard(
      downloadCommentPage,
      perPage,
    )
    return reply.code(201).send(downloadComments)
  } catch (e) {
    console.log(e)
    return reply.code(500).send(e)
  }
}

export async function getDownloadCommentByDownloadIdHandler(
  request: FastifyRequest<{
    Params: { downloadId: string; downloadCommentPage: number }
  }>,
  reply: FastifyReply,
) {
  try {
    const { downloadId } = request.params
    const perPage = 10

    const downloadCommentPage = Number(request.params.downloadCommentPage || 1)
    const downloadComments = await getDownloadCommentsByDownloadId(
      downloadId,
      downloadCommentPage,
      perPage,
    )

    return reply.code(201).send(downloadComments)
  } catch (e) {
    console.log(e)
    return reply.code(500).send(e)
  }
}

export async function getDownloadCommentByIdHandler(
  request: FastifyRequest<{
    Params: { downloadCommentId: string }
  }>,
  reply: FastifyReply,
) {
  try {
    const { downloadCommentId: commentId } = request.params
    const downloadComment = await getDownloadCommentById(commentId)
    return reply.code(201).send(downloadComment)
  } catch (e) {
    console.log(e)
    return reply.code(500).send(e)
  }
}

export async function getTotalDownloadCommentByDownloadHandler(
  request: FastifyRequest<{
    Params: { downloadId: string }
  }>,
  reply: FastifyReply,
) {
  const { downloadId } = request.params
  try {
    const totalComments = await getTotalDownloadCommentByDownload(downloadId)
    return reply.code(201).send(totalComments)
  } catch (e) {
    console.log(e)
    return reply.code(500).send(e)
  }
}

export async function getTotalDownloadCommentsHandler(
  _request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    const downloadComments = await getTotalDownloadComments()
    return reply.code(201).send(downloadComments)
  } catch (e) {
    console.log(e)
    return reply.code(500).send(e)
  }
}

export async function searchDownloadCommentsHandler(
  request: FastifyRequest<{ Params: { searchDownloadCommentQuery: string } }>,
  reply: FastifyReply,
) {
  try {
    const searchQuery = request.params.searchDownloadCommentQuery

    const downloadComments = await searchDownloadComments(searchQuery)
    return reply.code(201).send(downloadComments)
  } catch (e) {
    console.log(e)
    return reply.code(500).send(e)
  }
}
