import { FastifyReply, FastifyRequest } from "fastify"

import { slugify, uniqueSlug } from "@/utils/slug"
import {
  CreateDownloadFileInput,
  UpdateDownloadFileInput,
} from "./download-file.schema"
import {
  createDownloadFile,
  deleteDownloadFileById,
  getDownloadFileByAuthorUsername,
  getDownloadFileById,
  getDownloadFileBySlug,
  getDownloadFiles,
  getDownloadFilesSitemap,
  getTotalDownloadFiles,
  searchDownloadFiles,
  updateDownloadFile,
} from "./download-file.service"

export async function createDownloadFileHandler(
  request: FastifyRequest<{
    Body: CreateDownloadFileInput
  }>,
  reply: FastifyReply,
) {
  try {
    const {
      title,
      metaTitle,
      metaDescription,
      featuredImageId,
      downloadIds,
      version,
      downloadLink,
      fileSize,
      currency,
      price,
      authorIds,
    } = request.body
    const user = request.user
    const downloadFileSlug = slugify(title.toLowerCase() + "_" + uniqueSlug())

    if (user.role !== "ADMIN") {
      return reply.code(403).send({ message: "Unauthorized" })
    }

    const generatedMetaTitle = !metaTitle ? title : metaTitle
    const generatedMetaDescription = !metaDescription
      ? generatedMetaTitle
      : metaDescription

    const downloadFile = await createDownloadFile({
      title: title,
      metaTitle: generatedMetaTitle,
      metaDescription: generatedMetaDescription,
      slug: downloadFileSlug,
      version: version,
      downloadLink: downloadLink,
      fileSize: fileSize,
      currency: currency,
      price: price,
      featuredImageId: featuredImageId,
      downloads: {
        connect: downloadIds.map((id) => ({ id })),
      },
      authors: {
        connect: authorIds.map((id) => ({ id })),
      },
    })

    return reply.code(201).send(downloadFile)
  } catch (e) {
    return reply.code(500).send(e)
  }
}

export async function updateDownloadFileHandler(
  request: FastifyRequest<{
    Params: { downloadFileId: string }
    Body: UpdateDownloadFileInput
  }>,
  reply: FastifyReply,
) {
  try {
    const {
      title,
      slug,
      metaTitle,
      metaDescription,
      featuredImageId,
      downloadIds,
      authorIds,
      version,
      downloadLink,
      fileSize,
      currency,
      price,
    } = request.body
    const user = request.user
    const downloadFileId = request.params.downloadFileId

    const allowedRoles = ["ADMIN", "AUTHOR"]

    if (!allowedRoles.includes(user.role)) {
      return reply
        .code(403)
        .send({ message: "Only Author and Admin can update downloadFile" })
    }

    const updatedDownloadFile = await updateDownloadFile(downloadFileId, {
      title: title,
      metaTitle: metaTitle,
      metaDescription: metaDescription,
      slug: slug,
      version: version,
      downloadLink: downloadLink,
      fileSize: fileSize,
      currency: currency,
      price: price,
      featuredImageId: featuredImageId,
      downloads: {
        connect: downloadIds.map((id) => ({ id })),
      },
      authors: {
        connect: authorIds.map((id) => ({ id })),
      },
    })
    return reply.code(201).send(updatedDownloadFile)
  } catch (e) {
    console.log(e)
    return reply.code(500).send(e)
  }
}

export async function deleteDownloadFileHandler(
  request: FastifyRequest<{ Params: { downloadFileId: string } }>,
  reply: FastifyReply,
) {
  try {
    const { downloadFileId } = request.params
    const deleteDownloadFile = await deleteDownloadFileById(downloadFileId)
    return reply.code(201).send(deleteDownloadFile)
  } catch (e) {
    console.log(e)
    return reply.code(500).send(e)
  }
}

export async function getDownloadFileByIdHandler(
  request: FastifyRequest<{
    Params: { downloadFileId: string }
  }>,
  reply: FastifyReply,
) {
  try {
    const { downloadFileId } = request.params
    const downloadFile = await getDownloadFileById(downloadFileId)
    return reply.code(201).send(downloadFile)
  } catch (e) {
    console.log(e)
    return reply.code(500).send(e)
  }
}

export async function getDownloadFilesHandler(
  request: FastifyRequest<{ Params: { downloadFilePage: number } }>,
  reply: FastifyReply,
) {
  try {
    const perPage = 10
    const downloadFilePage = Number(request.params.downloadFilePage || 1)

    const downloadFiles = await getDownloadFiles(downloadFilePage, perPage)
    return reply.code(201).send(downloadFiles)
  } catch (e) {
    return reply.code(500).send(e)
  }
}

export async function getDownloadFilesSitemapHandler(
  request: FastifyRequest<{ Params: { downloadFilePage: number } }>,
  reply: FastifyReply,
) {
  try {
    const perPage = 10
    const downloadFilePage = Number(request.params.downloadFilePage || 1)

    const downloads = await getDownloadFilesSitemap(downloadFilePage, perPage)
    return reply.code(201).send(downloads)
  } catch (e) {
    return reply.code(500).send(e)
  }
}

export async function getDownloadFileBySlugHandler(
  request: FastifyRequest<{
    Params: { downloadFileSlug: string }
  }>,
  reply: FastifyReply,
) {
  try {
    const { downloadFileSlug } = request.params
    const downloadFile = await getDownloadFileBySlug(downloadFileSlug)
    return reply.code(201).send(downloadFile)
  } catch (e) {
    console.log(e)
    return reply.code(500).send(e)
  }
}

export async function getDownloadFileByAuthorUsernameHandler(
  request: FastifyRequest<{
    Params: { authorUsername: string; downloadFilePage: number }
  }>,
  reply: FastifyReply,
) {
  try {
    const { authorUsername } = request.params

    const perPage = 10
    const downloadFilePage = Number(request.params.downloadFilePage || 1)

    const downloadFile = await getDownloadFileByAuthorUsername(
      authorUsername,
      downloadFilePage,
      perPage,
    )
    return reply.code(201).send(downloadFile)
  } catch (e) {
    console.log(e)
    return reply.code(500).send(e)
  }
}

export async function getTotalDownloadFilesHandler(
  _request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    const downloadFiles = await getTotalDownloadFiles()
    return reply.code(201).send(downloadFiles)
  } catch (e) {
    console.log(e)
    return reply.code(500).send(e)
  }
}

export async function searchDownloadFilesHandler(
  request: FastifyRequest<{ Params: { searchDownloadFileQuery: string } }>,
  reply: FastifyReply,
) {
  try {
    const searchQuery = request.params.searchDownloadFileQuery

    const downloadFiles = await searchDownloadFiles(searchQuery)
    return reply.code(201).send(downloadFiles)
  } catch (e) {
    console.log(e)
    return reply.code(500).send(e)
  }
}
