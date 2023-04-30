//TODO: handle move to trash

import db from "../../utils/db"
import {
  CreateTopicInput,
  CreateTopicTranslationInput,
  UpdateTopicInput,
  UpdateTopicTranslationInput,
} from "./topic.schema"

export async function createTopic({
  slug,
  type,
  featuredImageId,
  language,
  title,
  description,
  meta_title,
  meta_description,
}: CreateTopicInput & { slug: string }) {
  return await db.topic.create({
    data: {
      slug: slug,
      type: type,
      featuredImageId: featuredImageId,
      translations: {
        create: {
          language: language,
          title: title,
          description: description,
          meta_title: meta_title,
          meta_description: meta_description,
        },
      },
    },
  })
}

export async function createTopicTranslation({
  topicId,
  title,
  description,
  meta_title,
  meta_description,
  language,
}: CreateTopicTranslationInput) {
  return await db.topicTranslation.create({
    data: {
      topicId: topicId,
      title: title,
      description: description,
      meta_title: meta_title,
      meta_description: meta_description,
      language: language,
    },
  })
}

export async function getTopicsByLang(
  topicLanguage: "id_ID" | "en_US",
  topicPage: number,
  perPage: number,
) {
  return await db.topic.findMany({
    orderBy: {
      createdAt: "desc",
    },
    where: { translations: { some: { language: topicLanguage } } },
    select: {
      id: true,
      slug: true,
      type: true,
      featuredImage: {
        select: {
          url: true,
        },
      },
      translations: {
        where: { language: topicLanguage },
        select: {
          title: true,
          description: true,
          meta_title: true,
          meta_description: true,
        },
      },
    },
    skip: (topicPage - 1) * perPage,
    take: perPage,
  })
}

export async function getTopicsDashboardByLang(
  topicLanguage: "id_ID" | "en_US",
  topicPage: number,
  perPage: number,
) {
  return await db.topic.findMany({
    where: { translations: { some: { language: topicLanguage } } },
    orderBy: {
      createdAt: "desc",
    },
    skip: (topicPage - 1) * perPage,
    take: perPage,
    select: {
      id: true,
      slug: true,
      type: true,
      translations: {
        where: { language: topicLanguage },
        select: {
          title: true,
        },
      },
      createdAt: true,
      updatedAt: true,
    },
  })
}

export async function getTopicsSitemapByLang(
  topicPage: number,
  perPage: number,
) {
  return await db.topic.findMany({
    orderBy: {
      createdAt: "desc",
    },
    skip: (topicPage - 1) * perPage,
    take: perPage,
    select: {
      slug: true,
      updatedAt: true,
    },
  })
}

// TODO: create getAllTopics

export async function getTopicTranslationById(topicTranslationId: string) {
  return await db.topicTranslation.findUnique({
    where: { id: topicTranslationId },
    select: {
      id: true,
      title: true,
      description: true,
      meta_title: true,
      meta_description: true,
      topic: {
        select: {
          id: true,
          slug: true,
          type: true,
          featuredImage: {
            select: {
              id: true,
              url: true,
            },
          },
        },
      },
      createdAt: true,
      updatedAt: true,
    },
  })
}

export async function getTopicsByTypeAndLang(
  topicLanguage: "id_ID" | "en_US",
  topicType: "ALL" | "ARTICLE" | "MOVIE" | "TV" | "REVIEW" | "TUTORIAL",
  topicPage: number,
  perPage: number,
) {
  return await db.topic.findMany({
    where: {
      AND: [
        {
          type: topicType,
          translations: { some: { language: topicLanguage } },
        },
      ],
    },
    orderBy: {
      createdAt: "desc",
    },
    skip: (topicPage - 1) * perPage,
    take: perPage,
    select: {
      id: true,
      slug: true,
      type: true,
      featuredImage: {
        select: {
          url: true,
        },
      },
      translations: {
        select: {
          title: true,
          description: true,
          meta_title: true,
          meta_description: true,
        },
      },
      createdAt: true,
      updatedAt: true,
    },
  })
}

//TODO: create getTopicArticles

export async function getTopicBySlug(topicSlug: string) {
  return await db.topic.findUnique({
    where: {
      slug: topicSlug,
    },
    select: {
      id: true,
      slug: true,
      type: true,
      featuredImage: {
        select: {
          url: true,
        },
      },
      translations: {
        select: {
          title: true,
          description: true,
          meta_title: true,
          meta_description: true,
        },
      },
      createdAt: true,
      updatedAt: true,
    },
  })
}

export async function updateTopic(
  topicId: string,
  { slug, type, featuredImageId }: UpdateTopicInput,
) {
  return await db.topic.update({
    where: { id: topicId },
    data: {
      slug: slug,
      type: type,
      featuredImageId: featuredImageId,
    },
  })
}

export async function updateTopicTranslation(
  topicTranslationId: string,
  {
    language,
    title,
    description,
    meta_title,
    meta_description,
  }: UpdateTopicTranslationInput,
) {
  return await db.topicTranslation.update({
    where: { id: topicTranslationId },
    data: {
      language: language,
      title: title,
      description: description,
      meta_title: meta_title,
      meta_description: meta_description,
    },
  })
}

export async function searchTopicsByLang(
  topicLanguage: "id_ID" | "en_US",
  searchTopicQuery: string,
) {
  return await db.topic.findMany({
    where: {
      AND: [
        {
          translations: { some: { language: topicLanguage } },
        },
      ],
      OR: [
        {
          slug: { contains: searchTopicQuery },
        },
        { translations: { some: { title: { contains: searchTopicQuery } } } },
        {
          translations: {
            some: { description: { contains: searchTopicQuery } },
          },
        },
      ],
    },
    select: {
      id: true,
      slug: true,
      type: true,
      featuredImage: {
        select: {
          url: true,
        },
      },
      translations: {
        select: {
          title: true,
        },
      },
    },
  })
}

export async function searchTopicsDashboardByLang(
  topicLanguage: "id_ID" | "en_US",
  searchTopicQuery: string,
) {
  return await db.topic.findMany({
    where: {
      AND: [
        {
          translations: { some: { language: topicLanguage } },
        },
      ],
      OR: [
        {
          slug: { contains: searchTopicQuery },
        },
        { translations: { some: { title: { contains: searchTopicQuery } } } },
        {
          translations: {
            some: { description: { contains: searchTopicQuery } },
          },
        },
      ],
    },
    select: {
      id: true,
      slug: true,
      type: true,
      translations: {
        select: {
          title: true,
        },
      },
      createdAt: true,
      updatedAt: true,
    },
  })
}

export async function deleteTopicById(topicId: string) {
  return await db.$transaction([
    db.topicTranslation.deleteMany({
      where: {
        topicId: topicId,
      },
    }),
    db.topic.delete({
      where: {
        id: topicId,
      },
    }),
  ])
}

export async function deleteTopicTranslationById(topicTranslationId: string) {
  return await db.topicTranslation.delete({
    where: {
      id: topicTranslationId,
    },
  })
}

export async function getTotalTopics() {
  return await db.topic.count()
}
