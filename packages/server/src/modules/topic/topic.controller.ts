import { FastifyReply, FastifyRequest } from "fastify"

import { uniqueSlug, slugify } from "../../utils/slug"
import {
  CreateTopicInput,
  CreateTopicTranslationInput,
  UpdateTopicInput,
  UpdateTopicTranslationInput,
} from "./topic.schema"
import {
  createTopic,
  deleteTopicById,
  getTopicTranslationById,
  getTopicTranslationBySlug,
  getTopicsByLang,
  searchTopicsByLang,
  updateTopic,
  getTotalTopics,
  getTopicsSitemapByLang,
  getTopicsByTypeAndLang,
  getTopicsDashboardByLang,
  searchTopicsDashboardByLang,
  deleteTopicTranslationById,
  updateTopicTranslation,
  createTopicTranslation,
} from "./topic.service"

export async function createTopicHandler(
  request: FastifyRequest<{
    Body: CreateTopicInput
  }>,
  reply: FastifyReply,
) {
  try {
    const {
      title,
      description,
      meta_title,
      meta_description,
      type,
      language,
      featuredImageId,
    } = request.body
    const user = request.user

    const slug = slugify(title.toLowerCase()) + "_" + uniqueSlug()

    if (user.role !== "ADMIN" && user.role !== "AUTHOR") {
      return reply.code(403).send({ message: "Unauthorized" })
    }

    const topic = await createTopic({
      title,
      description,
      meta_title,
      meta_description,
      type,
      language,
      slug,
      featuredImageId,
    })
    return reply.code(201).send(topic)
  } catch (e) {
    console.log(e)
    return reply.code(500).send(e)
  }
}

export async function createTopicTranslationHandler(
  request: FastifyRequest<{
    Body: CreateTopicTranslationInput
  }>,
  reply: FastifyReply,
) {
  try {
    const {
      topicId,
      title,
      description,
      meta_title,
      meta_description,
      language,
    } = request.body
    const user = request.user

    if (user.role !== "ADMIN" && user.role !== "AUTHOR") {
      return reply.code(403).send({ message: "Unauthorized" })
    }

    const topicTranslation = await createTopicTranslation({
      topicId,
      title,
      description,
      meta_title,
      meta_description,
      language,
    })
    return reply.code(201).send(topicTranslation)
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
    const { slug, type, featuredImageId } = request.body
    const user = request.user
    const topicId = request.params.topicId

    if (user.role !== "ADMIN" && user.role !== "AUTHOR") {
      return reply.code(403).send({ message: "Unauthorized" })
    }

    const topic = await updateTopic(topicId, {
      slug,
      type,
      featuredImageId,
    })
    return reply.code(201).send(topic)
  } catch (e) {
    console.log(e)
    return reply.code(500).send(e)
  }
}

export async function updateTopicTranslationHandler(
  request: FastifyRequest<{
    Params: { topicId: string }
    Body: UpdateTopicTranslationInput & { slug: string }
  }>,
  reply: FastifyReply,
) {
  try {
    const { title, description, meta_title, meta_description, language } =
      request.body
    const user = request.user
    const topicId = request.params.topicId

    if (user.role !== "ADMIN" && user.role !== "AUTHOR") {
      return reply.code(403).send({ message: "Unauthorized" })
    }

    const topic = await updateTopicTranslation(topicId, {
      title,
      description,
      meta_title,
      meta_description,
      language,
    })

    return reply.code(201).send(topic)
  } catch (e) {
    console.log(e)
    return reply.code(500).send(e)
  }
}

export async function getTopicTranslationByIdHandler(
  request: FastifyRequest<{
    Params: { topicId: string }
  }>,
  reply: FastifyReply,
) {
  try {
    const { topicId } = request.params
    const topic = await getTopicTranslationById(topicId)
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

    const topic = await getTopicTranslationBySlug(topicSlug)
    return reply.code(201).send(topic)
  } catch (e) {
    console.log(e)
    return reply.code(500).send(e)
  }
}

//TODO: create getTopicArticlesBySlugHandler

export async function deleteTopicHandler(
  request: FastifyRequest<{ Params: { topicId: string } }>,
  reply: FastifyReply,
) {
  try {
    const { topicId } = request.params
    const user = request.user
    const deleteTopic = await deleteTopicById(topicId)

    if (user.role !== "ADMIN") {
      return reply.code(403).send({ message: "Unauthorized" })
    }

    return reply.code(201).send(deleteTopic)
  } catch (e) {
    console.log(e)
    return reply.code(500).send(e)
  }
}

export async function deleteTopicTranslationHandler(
  request: FastifyRequest<{ Params: { topicTranslationId: string } }>,
  reply: FastifyReply,
) {
  try {
    const { topicTranslationId } = request.params
    const user = request.user
    const deleteTopic = await deleteTopicTranslationById(topicTranslationId)

    if (user.role !== "ADMIN") {
      return reply.code(403).send({ message: "Unauthorized" })
    }

    return reply.code(201).send(deleteTopic)
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
    Params: { topicPage: number }
  }>,
  reply: FastifyReply,
) {
  try {
    const perPage = 100
    const topicPage = Number(request.params.topicPage || 1)
    const topics = await getTopicsSitemapByLang(topicPage, perPage)
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

//TODO: create getalltopics

export async function searchTopicsByLangHandler(
  request: FastifyRequest<{
    Params: { topicLanguage: "id_ID" | "en_US"; searchTopicQuery: string }
  }>,
  reply: FastifyReply,
) {
  try {
    const topicLanguage = request.params.topicLanguage
    const searchQuery = request.params.searchTopicQuery

    const topics = await searchTopicsByLang(topicLanguage, searchQuery)
    return reply.code(201).send(topics)
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
