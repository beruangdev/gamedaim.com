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
      type: type,
      featuredImageId: featuredImageId,
      translations: {
        create: {
          slug: slug,
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
  slug,
  title,
  description,
  meta_title,
  meta_description,
  language,
}: CreateTopicTranslationInput & { slug: string }) {
  return await db.topicTranslation.create({
    data: {
      topicId: topicId,
      slug: slug,
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
  return await db.topicTranslation.findMany({
    orderBy: {
      createdAt: "desc",
    },
    where: { language: topicLanguage },
    select: {
      slug: true,
      title: true,
      description: true,
      meta_title: true,
      meta_description: true,
      main: {
        select: {
          id: true,
          type: true,
          featuredImage: {
            select: {
              url: true,
            },
          },
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
      type: true,
      translations: {
        where: { language: topicLanguage },
        select: {
          slug: true,
          title: true,
        },
      },
      createdAt: true,
      updatedAt: true,
    },
  })
}

export async function getTopicsSitemapByLang(
  topicLanguage: "id_ID" | "en_US",
  topicPage: number,
  perPage: number,
) {
  return await db.topicTranslation.findMany({
    where: { language: topicLanguage },
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
      slug: true,
      title: true,
      description: true,
      meta_title: true,
      meta_description: true,
      topic: {
        select: {
          id: true,
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
      type: true,
      featuredImage: {
        select: {
          url: true,
        },
      },
      translations: {
        select: {
          slug: true,
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

export async function getTopicTranslationBySlug(topicSlug: string) {
  return await db.topicTranslation.findUnique({
    where: { slug: topicSlug },
    select: {
      slug: true,
      title: true,
      description: true,
      meta_title: true,
      meta_description: true,
      topic: {
        select: {
          type: true,
          featuredImage: {
            select: {
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

export async function updateTopic(
  topicId: string,
  { type, featuredImageId }: UpdateTopicInput,
) {
  return await db.topic.update({
    where: { id: topicId },
    data: {
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
          translations: { some: { slug: { contains: searchTopicQuery } } },
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
      type: true,
      featuredImage: {
        select: {
          url: true,
        },
      },
      translations: {
        select: {
          slug: true,
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
          translations: { some: { slug: { contains: searchTopicQuery } } },
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
      type: true,
      translations: {
        select: {
          slug: true,
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
