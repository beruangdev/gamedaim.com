import { FastifyReply, FastifyRequest } from "fastify"

import { uniqueSlug, slugify } from "../../utils/slug"
import { CreateTopicInput, UpdateTopicInput } from "./topic.schema"
import {
  createTopicWithParent,
  deleteTopicWithParentById,
  getTopicById,
  getTopicBySlug,
  getTopicsByLang,
  searchTopicsByLang,
  getTotalTopics,
  getTopicsSitemapByLang,
  getTopicsByTypeAndLang,
  getTopicsDashboardByLang,
  searchTopicsDashboardByLang,
  deleteTopicById,
  updateTopic,
  createTopic,
  getTopicParentById,
  getTotalTopicParents,
  getTopicArticlesHandler,
} from "./topic.service"

export async function createTopicWithParentHandler(
  request: FastifyRequest<{
    Body: Omit<CreateTopicInput, "topicParentId">
  }>,
  reply: FastifyReply,
) {
  try {
    const {
      title,
      description,
      metaTitle,
      metaDescription,
      type,
      language,
      featuredImageId,
    } = request.body
    const user = request.user

    const slug = slugify(title.toLowerCase()) + "_" + uniqueSlug()

    if (user.role !== "ADMIN" && user.role !== "AUTHOR") {
      return reply.code(403).send({ message: "Unauthorized" })
    }

    const topicWithParent = await createTopicWithParent({
      title,
      slug,
      description,
      metaTitle,
      metaDescription,
      type,
      language,
      featuredImageId,
    })
    return reply.code(201).send(topicWithParent)
  } catch (e) {
    console.log(e)
    return reply.code(500).send(e)
  }
}

export async function createTopicHandler(
  request: FastifyRequest<{
    Body: CreateTopicInput
  }>,
  reply: FastifyReply,
) {
  try {
    const {
      topicParentId,
      title,
      description,
      metaTitle,
      metaDescription,
      language,
    } = request.body
    const user = request.user

    if (user.role !== "ADMIN" && user.role !== "AUTHOR") {
      return reply.code(403).send({ message: "Unauthorized" })
    }

    const slug = slugify(title.toLowerCase()) + "_" + uniqueSlug()

    const topic = await createTopic({
      topicParentId,
      slug,
      title,
      description,
      metaTitle,
      metaDescription,
      language,
    })
    return reply.code(201).send(topic)
  } catch (e) {
    console.log(e)
    return reply.code(500).send(e)
  }
}

export async function updateTopicHandler(
  request: FastifyRequest<{
    Params: { topicId: string }
    Body: UpdateTopicInput
  }>,
  reply: FastifyReply,
) {
  try {
    const {
      topicParentId,
      language,
      title,
      slug,
      description,
      metaTitle,
      metaDescription,
      type,
      featuredImageId,
    } = request.body
    const user = request.user
    const topicId = request.params.topicId

    if (user.role !== "ADMIN" && user.role !== "AUTHOR") {
      return reply.code(403).send({ message: "Unauthorized" })
    }

    const updatedTopic = await updateTopic(topicId, {
      topicParentId,
      language,
      title,
      slug,
      description,
      metaTitle,
      metaDescription,
      type,
      featuredImageId,
    })
    return reply.code(201).send(updatedTopic)
  } catch (e) {
    console.log(e)
    return reply.code(500).send(e)
  }
}

export async function deleteTopicWithParentHandler(
  request: FastifyRequest<{ Params: { topicParentId: string } }>,
  reply: FastifyReply,
) {
  try {
    const { topicParentId } = request.params
    const user = request.user
    const deletedTopicWithParent = await deleteTopicWithParentById(
      topicParentId,
    )

    if (user.role !== "ADMIN") {
      return reply.code(403).send({ message: "Unauthorized" })
    }

    return reply.code(201).send(deletedTopicWithParent)
  } catch (e) {
    console.log(e)
    return reply.code(500).send(e)
  }
}

export async function deleteTopicHandler(
  request: FastifyRequest<{ Params: { topicId: string } }>,
  reply: FastifyReply,
) {
  try {
    const { topicId } = request.params
    const user = request.user
    const deletedTopic = await deleteTopicById(topicId)

    if (user.role !== "ADMIN") {
      return reply.code(403).send({ message: "Unauthorized" })
    }

    return reply.code(201).send(deletedTopic)
  } catch (e) {
    console.log(e)
    return reply.code(500).send(e)
  }
}

export async function getTopicParentByIdHandler(
  request: FastifyRequest<{
    Params: { topicParentId: string }
  }>,
  reply: FastifyReply,
) {
  try {
    const { topicParentId } = request.params
    const topicParent = await getTopicParentById(topicParentId)
    return reply.code(201).send(topicParent)
  } catch (e) {
    console.log(e)
    return reply.code(500).send(e)
  }
}

export async function getTopicByIdHandler(
  request: FastifyRequest<{
    Params: { topicId: string }
  }>,
  reply: FastifyReply,
) {
  try {
    const { topicId } = request.params
    const topic = await getTopicById(topicId)
    return reply.code(201).send(topic)
  } catch (e) {
    console.log(e)
    return reply.code(500).send(e)
  }
}

export async function getTopicsByLangHandler(
  request: FastifyRequest<{
    Params: { topicLanguage: "id_ID" | "en_US"; topicPage: number }
  }>,
  reply: FastifyReply,
) {
  try {
    const perPage = 10
    const topicLanguage = request.params.topicLanguage
    const topicPage = Number(request.params.topicPage || 1)

    const topics = await getTopicsByLang(topicLanguage, topicPage, perPage)
    return reply.code(201).send(topics)
  } catch (e) {
    console.log(e)
    return reply.code(500).send(e)
  }
}

export async function getTopicsDashboardByLangHandler(
  request: FastifyRequest<{
    Params: { topicLanguage: "id_ID" | "en_US"; topicPage: number }
  }>,
  reply: FastifyReply,
) {
  try {
    const perPage = 10
    const topicLanguage = request.params.topicLanguage
    const topicPage = Number(request.params.topicPage || 1)

    const topics = await getTopicsDashboardByLang(
      topicLanguage,
      topicPage,
      perPage,
    )
    return reply.code(201).send(topics)
  } catch (e) {
    console.log(e)
    return reply.code(500).send(e)
  }
}

export async function getTopicsSitemapByLangHandler(
  request: FastifyRequest<{
    Params: { topicPage: number; topicLanguage: "id_ID" | "en_US" }
  }>,
  reply: FastifyReply,
) {
  try {
    const perPage = 100
    const topicPage = Number(request.params.topicPage || 1)
    const topicLanguage = request.params.topicLanguage

    const topics = await getTopicsSitemapByLang(
      topicPage,
      perPage,
      topicLanguage,
    )
    return reply.code(201).send(topics)
  } catch (e) {
    console.log(e)
    return reply.code(500).send(e)
  }
}

export async function getTopicsByTypeAndLangHandler(
  request: FastifyRequest<{
    Params: {
      topicLanguage: "id_ID" | "en_US"
      topicType: "ALL" | "ARTICLE" | "MOVIE" | "TV" | "REVIEW" | "TUTORIAL"
      topicPage: number
    }
  }>,
  reply: FastifyReply,
) {
  try {
    const topicLanguage = request.params.topicLanguage
    const topicType = request.params.topicType
    const perPage = 10
    const topicPage = Number(request.params.topicPage || 1)

    const topics = await getTopicsByTypeAndLang(
      topicLanguage,
      topicType,
      topicPage,
      perPage,
    )
    return reply.code(201).send(topics)
  } catch (e) {
    console.log(e)
    return reply.code(500).send(e)
  }
}

export async function getTopicArticlesBySlugHandler(
  request: FastifyRequest<{
    Params: { topicSlug: string; topicPage: number }
  }>,
  reply: FastifyReply,
) {
  try {
    const { topicSlug } = request.params

    const perPage = 10
    const topicPage = Number(request.params.topicPage || 1)

    const topic = await getTopicArticlesHandler(topicSlug, topicPage, perPage)
    return reply.code(201).send(topic)
  } catch (e) {
    console.log(e)
    return reply.code(500).send(e)
  }
}

export async function getTopicBySlugHandler(
  request: FastifyRequest<{
    Params: { topicSlug: string }
  }>,
  reply: FastifyReply,
) {
  try {
    const { topicSlug } = request.params

    const topic = await getTopicBySlug(topicSlug)
    return reply.code(201).send(topic)
  } catch (e) {
    console.log(e)
    return reply.code(500).send(e)
  }
}

export async function getTotalTopicsHandler(
  _request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    const topics = await getTotalTopics()
    return reply.code(201).send(topics)
  } catch (e) {
    console.log(e)
    return reply.code(500).send(e)
  }
}

export async function getTotalTopicParentsHandler(
  _request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    const topicParents = await getTotalTopicParents()
    return reply.code(201).send(topicParents)
  } catch (e) {
    console.log(e)
    return reply.code(500).send(e)
  }
}

export async function searchTopicsByLangHandler(
  request: FastifyRequest<{
    Params: { topicLanguage: "id_ID" | "en_US"; searchTopicQuery: string }
  }>,
  reply: FastifyReply,
) {
  try {
    const topicLanguage = request.params.topicLanguage
    const searchQuery = request.params.searchTopicQuery

    const searchedTopics = await searchTopicsByLang(topicLanguage, searchQuery)
    return reply.code(201).send(searchedTopics)
  } catch (e) {
    console.log(e)
    return reply.code(500).send(e)
  }
}

export async function searchTopicsDashboardHandler(
  request: FastifyRequest<{
    Params: { topicLanguage: "id_ID" | "en_US"; searchTopicQuery: string }
  }>,
  reply: FastifyReply,
) {
  try {
    const topicLanguage = request.params.topicLanguage
    const searchQuery = request.params.searchTopicQuery

    const topics = await searchTopicsDashboardByLang(topicLanguage, searchQuery)
    return reply.code(201).send(topics)
  } catch (e) {
    console.log(e)
    return reply.code(500).send(e)
  }
}
