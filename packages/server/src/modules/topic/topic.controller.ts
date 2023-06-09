import { FastifyReply, FastifyRequest } from "fastify"
import { LanguageType, TopicType } from "@prisma/client"

import { slugify, uniqueSlug } from "@/utils/slug"
import {
  CreateTopicInput,
  CreateTopicPrimaryInput,
  UpdateTopicInput,
} from "./topic.schema"
import {
  createTopic,
  createTopicWithPrimary,
  deleteTopicById,
  deleteTopicWithPrimaryById,
  getTopicArticlesHandler,
  getTopicById,
  getTopicBySlug,
  getTopicPrimaryById,
  getTopicsByLang,
  getTopicsByTypeAndLang,
  getTopicsDashboardByLang,
  getTopicsSitemapByLang,
  getTotalTopicPrimaries,
  getTotalTopics,
  getTotalTopicsByLang,
  searchTopicsByLang,
  searchTopicsByLangAndType,
  searchTopicsDashboardByLang,
  updateTopic,
} from "./topic.service"

export async function createTopicWithPrimaryHandler(
  request: FastifyRequest<{
    Body: CreateTopicPrimaryInput
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

    const topicWithPrimary = await createTopicWithPrimary({
      title: title,
      slug: slug,
      description: description,
      metaTitle: metaTitle,
      metaDescription: metaDescription,
      type: type,
      language: language,
      featuredImageId: featuredImageId,
    })
    return reply.code(201).send(topicWithPrimary)
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
      topicPrimaryId,
      title,
      description,
      metaTitle,
      metaDescription,
      language,
      type,
      featuredImageId,
    } = request.body
    const user = request.user

    if (user.role !== "ADMIN" && user.role !== "AUTHOR") {
      return reply.code(403).send({ message: "Unauthorized" })
    }

    const slug = slugify(title.toLowerCase()) + "_" + uniqueSlug()

    const topic = await createTopic({
      topicPrimaryId: topicPrimaryId,
      title: title,
      slug: slug,
      description: description,
      metaTitle: metaTitle,
      metaDescription: metaDescription,
      type: type,
      language: language,
      featuredImageId: featuredImageId,
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
      title: title,
      slug: slug,
      description: description,
      metaTitle: metaTitle,
      metaDescription: metaDescription,
      type: type,
      language: language,
      featuredImageId: featuredImageId,
    })
    return reply.code(201).send(updatedTopic)
  } catch (e) {
    console.log(e)
    return reply.code(500).send(e)
  }
}

export async function deleteTopicWithPrimaryHandler(
  request: FastifyRequest<{ Params: { topicPrimaryId: string } }>,
  reply: FastifyReply,
) {
  try {
    const { topicPrimaryId } = request.params
    const user = request.user
    const deletedTopicWithPrimary = await deleteTopicWithPrimaryById(
      topicPrimaryId,
    )

    if (user.role !== "ADMIN") {
      return reply.code(403).send({ message: "Unauthorized" })
    }

    return reply.code(201).send(deletedTopicWithPrimary)
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

export async function getTopicPrimaryByIdHandler(
  request: FastifyRequest<{
    Params: { topicPrimaryId: string }
  }>,
  reply: FastifyReply,
) {
  try {
    const { topicPrimaryId } = request.params
    const topicPrimary = await getTopicPrimaryById(topicPrimaryId)
    return reply.code(201).send(topicPrimary)
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
    Params: { topicLanguage: LanguageType; topicPage: number }
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
    Params: { topicLanguage: LanguageType; topicPage: number }
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
    Params: { topicPage: number; topicLanguage: LanguageType }
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
      topicLanguage: LanguageType
      topicType: TopicType
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

export async function getTotalTopicsByLangHandler(
  request: FastifyRequest<{ Params: { topicLanguage: LanguageType } }>,
  reply: FastifyReply,
) {
  try {
    const topicLanguage = request.params.topicLanguage

    const topics = await getTotalTopicsByLang(topicLanguage)
    return reply.code(201).send(topics)
  } catch (e) {
    console.log(e)
    return reply.code(500).send(e)
  }
}

export async function getTotalTopicPrimariesHandler(
  _request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    const topicPrimaries = await getTotalTopicPrimaries()
    return reply.code(201).send(topicPrimaries)
  } catch (e) {
    console.log(e)
    return reply.code(500).send(e)
  }
}

export async function searchTopicsByLangHandler(
  request: FastifyRequest<{
    Params: { topicLanguage: LanguageType; searchTopicQuery: string }
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
    Params: { topicLanguage: LanguageType; searchTopicQuery: string }
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

export async function searchTopicsByLangAndTypeHandler(
  request: FastifyRequest<{
    Params: {
      topicLanguage: LanguageType
      topicType: TopicType
      searchTopicQuery: string
    }
  }>,
  reply: FastifyReply,
) {
  try {
    const topicLanguage = request.params.topicLanguage
    const topicType = request.params.topicType
    const searchQuery = request.params.searchTopicQuery

    const topics = await searchTopicsByLangAndType(
      topicLanguage,
      topicType,
      searchQuery,
    )
    return reply.code(201).send(topics)
  } catch (e) {
    console.log(e)
    return reply.code(500).send(e)
  }
}
