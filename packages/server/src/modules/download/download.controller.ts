import { FastifyReply, FastifyRequest } from "fastify"
import { DownloadType, LanguageType } from "@prisma/client"

import { slugify, uniqueSlug } from "@/utils/slug"
import { trimText } from "@/utils/trim"
import {
  CreateDownloadInput,
  CreateDownloadPrimaryInput,
  UpdateDownloadInput,
} from "./download.schema"
import {
  createDownload,
  createDownloadWithPrimary,
  deleteDownloadById,
  deleteDownloadWithPrimaryById,
  getDownloadByAuthorUsernameAndLang,
  getDownloadById,
  getDownloadBySlug,
  getDownloadPrimaryById,
  getDownloadsByLang,
  getDownloadsByTypeAndLang,
  getDownloadsDashboardByLang,
  getDownloadsSitemapByLang,
  getTotalDownloadPrimaries,
  getTotalDownloads,
  getTotalDownloadsByLang,
  searchDownloads,
  searchDownloadsDashboardByLang,
  updateDownload,
} from "./download.service"

export async function createDownloadWithPrimaryHandler(
  request: FastifyRequest<{ Body: CreateDownloadPrimaryInput }>,
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
      developer,
      operatingSystem,
      license,
      officialWeb,
      schemaType,
      type,
      topicIds,
      downloadFileIds,
      authorIds,
    } = request.body
    const user = request.user
    const downloadSlug = slugify(title.toLowerCase() + "_" + uniqueSlug())

    if (user.role !== "ADMIN") {
      return reply.code(403).send({ message: "Unauthorized" })
    }

    const generatedExcerpt = !excerpt ? trimText(content, 160) : excerpt
    const generatedMetaTitle = !metaTitle ? title : metaTitle
    const generatedMetaDescription = !metaDescription
      ? generatedExcerpt
      : metaDescription

    const downloadWithPrimary = await createDownloadWithPrimary({
      title: title,
      language: language,
      content: content,
      excerpt: generatedExcerpt,
      metaTitle: generatedMetaTitle,
      metaDescription: generatedMetaDescription,
      slug: downloadSlug,
      featuredImageId: featuredImageId,
      developer: developer,
      operatingSystem: operatingSystem,
      license: license,
      officialWeb: officialWeb,
      schemaType: schemaType,
      type: type,
      topics: {
        connect: topicIds.map((id) => ({ id })),
      },
      downloadFiles: {
        connect: downloadFileIds.map((id) => ({ id })),
      },
      authors: {
        connect: authorIds.map((id) => ({ id })),
      },
    })

    return reply.code(201).send(downloadWithPrimary)
  } catch (e) {
    return reply.code(500).send(e)
  }
}

export async function createDownloadHandler(
  request: FastifyRequest<{
    Body: CreateDownloadInput
  }>,
  reply: FastifyReply,
) {
  try {
    const {
      downloadPrimaryId,
      title,
      language,
      content,
      excerpt,
      metaTitle,
      metaDescription,
      featuredImageId,
      developer,
      operatingSystem,
      license,
      officialWeb,
      schemaType,
      type,
      topicIds,
      downloadFileIds,
      authorIds,
    } = request.body
    const user = request.user
    const downloadSlug = slugify(title.toLowerCase() + "_" + uniqueSlug())

    if (user.role !== "ADMIN") {
      return reply.code(403).send({ message: "Unauthorized" })
    }

    const generatedExcerpt = !excerpt ? trimText(content, 160) : excerpt
    const generatedMetaTitle = !metaTitle ? title : metaTitle
    const generatedMetaDescription = !metaDescription
      ? generatedExcerpt
      : metaDescription

    const download = await createDownload({
      downloadPrimaryId: downloadPrimaryId,
      language: language,
      title: title,
      content: content,
      excerpt: generatedExcerpt,
      metaTitle: generatedMetaTitle,
      metaDescription: generatedMetaDescription,
      slug: downloadSlug,
      featuredImageId: featuredImageId,
      developer: developer,
      operatingSystem: operatingSystem,
      license: license,
      officialWeb: officialWeb,
      schemaType: schemaType,
      type: type,
      topics: {
        connect: topicIds.map((id) => ({ id })),
      },
      downloadFiles: {
        connect: downloadFileIds.map((id) => ({ id })),
      },
      authors: {
        connect: authorIds.map((id) => ({ id })),
      },
    })

    return reply.code(201).send(download)
  } catch (e) {
    return reply.code(500).send(e)
  }
}

export async function updateDownloadHandler(
  request: FastifyRequest<{
    Params: { downloadId: string }
    Body: UpdateDownloadInput & {
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
      developer,
      operatingSystem,
      license,
      officialWeb,
      schemaType,
      type,
      topicIds,
      authorIds,
      downloadFileIds,
    } = request.body
    const user = request.user
    const downloadId = request.params.downloadId

    const allowedRoles = ["ADMIN", "AUTHOR"]

    if (!allowedRoles.includes(user.role)) {
      return reply
        .code(403)
        .send({ message: "Only Author and Admin can update download" })
    }

    const updatedDownload = await updateDownload(downloadId, {
      title: title,
      content: content,
      language: language,
      excerpt: excerpt,
      metaTitle: metaTitle,
      metaDescription: metaDescription,
      slug: slug,
      featuredImageId: featuredImageId,
      developer: developer,
      operatingSystem: operatingSystem,
      license: license,
      officialWeb: officialWeb,
      schemaType: schemaType,
      type: type,
      topics: {
        connect: topicIds.map((id) => ({ id })),
      },
      downloadFiles: {
        connect: downloadFileIds.map((id) => ({ id })),
      },
      authors: {
        connect: authorIds.map((id) => ({ id })),
      },
    })
    return reply.code(201).send(updatedDownload)
  } catch (e) {
    console.log(e)
    return reply.code(500).send(e)
  }
}

export async function deleteDownloadWithPrimaryHandler(
  request: FastifyRequest<{ Params: { downloadPrimaryId: string } }>,
  reply: FastifyReply,
) {
  try {
    const { downloadPrimaryId } = request.params
    const user = request.user
    const deletedDownloadWithPrimary = await deleteDownloadWithPrimaryById(
      downloadPrimaryId,
    )

    if (user.role !== "ADMIN") {
      return reply.code(403).send({ message: "Unauthorized" })
    }

    return reply.code(201).send(deletedDownloadWithPrimary)
  } catch (e) {
    console.log(e)
    return reply.code(500).send(e)
  }
}

export async function deleteDownloadHandler(
  request: FastifyRequest<{ Params: { downloadId: string } }>,
  reply: FastifyReply,
) {
  try {
    const { downloadId } = request.params
    const deleteDownload = await deleteDownloadById(downloadId)
    return reply.code(201).send(deleteDownload)
  } catch (e) {
    console.log(e)
    return reply.code(500).send(e)
  }
}

export async function getDownloadPrimaryByIdHandler(
  request: FastifyRequest<{
    Params: { downloadPrimaryId: string }
  }>,
  reply: FastifyReply,
) {
  try {
    const { downloadPrimaryId } = request.params
    const downloadPrimary = await getDownloadPrimaryById(downloadPrimaryId)
    return reply.code(201).send(downloadPrimary)
  } catch (e) {
    console.log(e)
    return reply.code(500).send(e)
  }
}

export async function getDownloadByIdHandler(
  request: FastifyRequest<{
    Params: { downloadId: string }
  }>,
  reply: FastifyReply,
) {
  try {
    const { downloadId } = request.params
    const download = await getDownloadById(downloadId)
    return reply.code(201).send(download)
  } catch (e) {
    console.log(e)
    return reply.code(500).send(e)
  }
}

export async function getDownloadsByLangHandler(
  request: FastifyRequest<{
    Params: { downloadLanguage: LanguageType; downloadPage: number }
  }>,
  reply: FastifyReply,
) {
  try {
    const perPage = 10
    const downloadLanguage = request.params.downloadLanguage
    const downloadPage = Number(request.params.downloadPage || 1)

    const downloads = await getDownloadsByLang(
      downloadLanguage,
      downloadPage,
      perPage,
    )
    return reply.code(201).send(downloads)
  } catch (e) {
    return reply.code(500).send(e)
  }
}

export async function getDownloadsDashboardByLangHandler(
  request: FastifyRequest<{
    Params: { downloadLanguage: LanguageType; downloadPage: number }
  }>,
  reply: FastifyReply,
) {
  try {
    const perPage = 10
    const downloadLanguage = request.params.downloadLanguage
    const downloadPage = Number(request.params.downloadPage || 1)

    const downloads = await getDownloadsDashboardByLang(
      downloadLanguage,
      downloadPage,
      perPage,
    )
    return reply.code(201).send(downloads)
  } catch (e) {
    return reply.code(500).send(e)
  }
}

export async function getDownloadsSitemapByLangHandler(
  request: FastifyRequest<{
    Params: { downloadLanguage: LanguageType; downloadPage: number }
  }>,
  reply: FastifyReply,
) {
  try {
    const perPage = 10
    const downloadLanguage = request.params.downloadLanguage
    const downloadPage = Number(request.params.downloadPage || 1)

    const downloads = await getDownloadsSitemapByLang(
      downloadLanguage,
      downloadPage,
      perPage,
    )
    return reply.code(201).send(downloads)
  } catch (e) {
    return reply.code(500).send(e)
  }
}

export async function getDownloadBySlugHandler(
  request: FastifyRequest<{
    Params: { downloadSlug: string; downloadFilesPage: number }
  }>,
  reply: FastifyReply,
) {
  try {
    const { downloadSlug } = request.params

    const perPage = 10
    const downloadFilesPage = Number(request.params.downloadFilesPage || 1)

    const download = await getDownloadBySlug(
      downloadSlug,
      downloadFilesPage,
      perPage,
    )
    return reply.code(201).send(download)
  } catch (e) {
    console.log(e)
    return reply.code(500).send(e)
  }
}

export async function getDownloadsByTypeAndLangHandler(
  request: FastifyRequest<{
    Params: {
      downloadLanguage: LanguageType
      downloadType: DownloadType
      downloadPage: number
    }
  }>,
  reply: FastifyReply,
) {
  try {
    const { downloadType } = request.params

    const perPage = 10
    const downloadLanguage = request.params.downloadLanguage
    const downloadPage = Number(request.params.downloadPage || 1)

    const download = await getDownloadsByTypeAndLang(
      downloadLanguage,
      downloadType,
      downloadPage,
      perPage,
    )

    return reply.code(201).send(download)
  } catch (e) {
    console.log(e)
    return reply.code(500).send(e)
  }
}

export async function getDownloadByAuthorUsernameAndLangHandler(
  request: FastifyRequest<{
    Params: {
      downloadLanguage: LanguageType
      authorUsername: string
      downloadPage: number
    }
  }>,
  reply: FastifyReply,
) {
  try {
    const { authorUsername } = request.params

    const perPage = 10
    const downloadLanguage = request.params.downloadLanguage
    const downloadPage = Number(request.params.downloadPage || 1)

    const download = await getDownloadByAuthorUsernameAndLang(
      authorUsername,
      downloadLanguage,
      downloadPage,
      perPage,
    )
    return reply.code(201).send(download)
  } catch (e) {
    console.log(e)
    return reply.code(500).send(e)
  }
}

export async function getTotalDownloadPrimariesHandler(
  _request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    const downloadPrimaries = await getTotalDownloadPrimaries()
    return reply.code(201).send(downloadPrimaries)
  } catch (e) {
    console.log(e)
    return reply.code(500).send(e)
  }
}

export async function getTotalDownloadsHandler(
  _request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    const downloads = await getTotalDownloads()
    return reply.code(201).send(downloads)
  } catch (e) {
    console.log(e)
    return reply.code(500).send(e)
  }
}

export async function getTotalDownloadsByLangHandler(
  request: FastifyRequest<{ Params: { downloadLanguage: LanguageType } }>,
  reply: FastifyReply,
) {
  try {
    const downloadLanguage = request.params.downloadLanguage

    const downloads = await getTotalDownloadsByLang(downloadLanguage)
    return reply.code(201).send(downloads)
  } catch (e) {
    console.log(e)
    return reply.code(500).send(e)
  }
}

export async function searchDownloadsByLangHandler(
  request: FastifyRequest<{
    Params: { downloadLanguage: LanguageType; searchDownloadQuery: string }
  }>,
  reply: FastifyReply,
) {
  try {
    const searchQuery = request.params.searchDownloadQuery
    const downloadLanguage = request.params.downloadLanguage

    const searchedDownloads = await searchDownloads(
      downloadLanguage,
      searchQuery,
    )
    return reply.code(201).send(searchedDownloads)
  } catch (e) {
    console.log(e)
    return reply.code(500).send(e)
  }
}

export async function searchDownloadsDashboardByLangHandler(
  request: FastifyRequest<{
    Params: { downloadLanguage: LanguageType; searchDownloadQuery: string }
  }>,
  reply: FastifyReply,
) {
  try {
    const searchQuery = request.params.searchDownloadQuery
    const downloadLanguage = request.params.downloadLanguage

    const searchedDownloads = await searchDownloadsDashboardByLang(
      downloadLanguage,
      searchQuery,
    )
    return reply.code(201).send(searchedDownloads)
  } catch (e) {
    console.log(e)
    return reply.code(500).send(e)
  }
}
