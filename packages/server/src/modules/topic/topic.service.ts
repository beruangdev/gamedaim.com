import { LanguageType, TopicType } from "@prisma/client"

import db from "@/utils/db"
import { CreateTopicInput, UpdateTopicInput } from "./topic.schema"

export async function createTopicWithPrimary({
  slug,
  type,
  featuredImageId,
  language,
  title,
  description,
  metaTitle,
  metaDescription,
}: Omit<CreateTopicInput, "topicPrimaryId"> & { slug: string }) {
  return await db.topicPrimary.create({
    data: {
      topics: {
        create: {
          title: title,
          slug: slug,
          description: description,
          metaTitle: metaTitle,
          metaDescription: metaDescription,
          type: type,
          featuredImageId: featuredImageId,
          language: language,
        },
      },
    },
  })
}

export async function createTopic(data: CreateTopicInput & { slug: string }) {
  return await db.topic.create({
    data: data,
  })
}

export async function getTopicsByLang(
  topicLanguage: LanguageType,
  topicPage: number,
  perPage: number,
) {
  return await db.topic.findMany({
    orderBy: {
      createdAt: "desc",
    },
    where: { language: topicLanguage },
    select: {
      topicPrimaryId: true,
      id: true,
      language: true,
      title: true,
      slug: true,
      description: true,
      metaTitle: true,
      metaDescription: true,
      type: true,
      featuredImage: {
        select: {
          url: true,
        },
      },
    },
    skip: (topicPage - 1) * perPage,
    take: perPage,
  })
}

export async function getTopicsDashboardByLang(
  topicLanguage: LanguageType,
  topicPage: number,
  perPage: number,
) {
  return await db.topic.findMany({
    where: { language: topicLanguage },
    orderBy: {
      createdAt: "desc",
    },
    skip: (topicPage - 1) * perPage,
    take: perPage,
    select: {
      topicPrimaryId: true,
      id: true,
      language: true,
      title: true,
      slug: true,
      type: true,
      createdAt: true,
      updatedAt: true,
    },
  })
}

export async function getTopicsSitemapByLang(
  topicPage: number,
  perPage: number,
  topicLanguage: LanguageType,
) {
  return await db.topic.findMany({
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

export async function getTopicPrimaryById(topicPrimaryId: string) {
  return await db.topicPrimary.findUnique({
    where: { id: topicPrimaryId },
  })
}

export async function getTopicById(topicId: string) {
  return await db.topic.findUnique({
    where: { id: topicId },
    select: {
      id: true,
      title: true,
      slug: true,
      language: true,
      description: true,
      metaTitle: true,
      metaDescription: true,
      type: true,
      featuredImage: {
        select: {
          id: true,
          url: true,
        },
      },
      createdAt: true,
      updatedAt: true,
    },
  })
}

export async function getTopicsByTypeAndLang(
  topicLanguage: LanguageType,
  topicType: TopicType,
  topicPage: number,
  perPage: number,
) {
  return await db.topic.findMany({
    where: {
      AND: [
        {
          type: topicType,
          language: topicLanguage,
        },
      ],
    },
    orderBy: {
      createdAt: "desc",
    },
    skip: (topicPage - 1) * perPage,
    take: perPage,
    select: {
      topicPrimaryId: true,
      id: true,
      title: true,
      language: true,
      slug: true,
      description: true,
      metaTitle: true,
      metaDescription: true,
      type: true,
      featuredImage: {
        select: {
          url: true,
        },
      },
      createdAt: true,
      updatedAt: true,
    },
  })
}

export async function getTopicArticlesHandler(
  topicSlug: string,
  topicPage: number,
  perPage: number,
) {
  return await db.topic.findUnique({
    where: { slug: topicSlug },
    select: {
      id: true,
      title: true,
      language: true,
      slug: true,
      description: true,
      metaTitle: true,
      metaDescription: true,
      type: true,
      articles: {
        skip: (topicPage - 1) * perPage,
        take: perPage,
        orderBy: {
          updatedAt: "desc",
        },
        select: {
          id: true,
          title: true,
          slug: true,
          metaTitle: true,
          metaDescription: true,
          excerpt: true,
          status: true,
          featuredImage: {
            select: {
              url: true,
            },
          },
        },
      },
      featuredImage: {
        select: {
          url: true,
        },
      },
      _count: {
        select: {
          articles: true,
        },
      },
      createdAt: true,
      updatedAt: true,
    },
  })
}

export async function getTopicBySlug(topicSlug: string) {
  return await db.topic.findUnique({
    where: {
      slug: topicSlug,
    },
    select: {
      id: true,
      title: true,
      language: true,
      slug: true,
      description: true,
      metaTitle: true,
      metaDescription: true,
      type: true,
      featuredImage: {
        select: {
          url: true,
        },
      },
      articles: {
        take: 6,
        orderBy: {
          updatedAt: "desc",
        },
        select: {
          id: true,
          excerpt: true,
          title: true,
          slug: true,
          status: true,
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

export async function updateTopic(topicId: string, data: UpdateTopicInput) {
  return await db.topic.update({
    where: { id: topicId },
    data: data,
  })
}

export async function deleteTopicWithPrimaryById(topicPrimaryId: string) {
  return await db.$transaction([
    db.topic.deleteMany({
      where: {
        topicPrimaryId: topicPrimaryId,
      },
    }),
    db.topicPrimary.delete({
      where: {
        id: topicPrimaryId,
      },
    }),
  ])
}

export async function deleteTopicById(topicId: string) {
  return await db.topic.delete({
    where: {
      id: topicId,
    },
  })
}

export async function getTotalTopics() {
  return await db.topic.count()
}

export async function getTotalTopicsByLang(topicLanguage: LanguageType) {
  return await db.topic.count({
    where: { language: topicLanguage },
  })
}

export async function getTotalTopicPrimaries() {
  return await db.topicPrimary.count()
}

export async function searchTopicsByLang(
  topicLanguage: LanguageType,
  searchTopicQuery: string,
) {
  return await db.topic.findMany({
    where: {
      AND: [
        {
          language: topicLanguage,
        },
      ],
      OR: [
        {
          title: {
            search: searchTopicQuery.split(" ").join(" & "),
          },
          slug: {
            search: searchTopicQuery.split(" ").join(" & "),
          },
        },
      ],
    },
    select: {
      id: true,
      type: true,
      slug: true,
      title: true,
      featuredImage: {
        select: {
          url: true,
        },
      },
    },
  })
}

export async function searchTopicsDashboardByLang(
  topicLanguage: LanguageType,
  searchTopicQuery: string,
) {
  return await db.topic.findMany({
    where: {
      AND: [
        {
          language: topicLanguage,
        },
      ],
      OR: [
        {
          title: {
            search: searchTopicQuery.split(" ").join(" & "),
          },
          slug: {
            search: searchTopicQuery.split(" ").join(" & "),
          },
        },
      ],
    },
    select: {
      id: true,
      slug: true,
      title: true,
      type: true,
      createdAt: true,
      updatedAt: true,
    },
  })
}
