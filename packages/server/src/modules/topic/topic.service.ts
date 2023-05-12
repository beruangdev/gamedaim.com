//TODO: handle move to trash

import db from "../../utils/db"
import { CreateTopicInput, UpdateTopicInput } from "./topic.schema"

export async function createTopicWithParent({
  slug,
  type,
  featuredImageId,
  language,
  title,
  description,
  metaTitle,
  metaDescription,
}: Omit<CreateTopicInput, "topicParentId"> & { slug: string }) {
  return await db.topicParent.create({
    data: {
      locales: {
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
  topicLanguage: "id_ID" | "en_US",
  topicPage: number,
  perPage: number,
) {
  return await db.topic.findMany({
    orderBy: {
      createdAt: "desc",
    },
    where: { language: topicLanguage },
    select: {
      id: true,
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
  topicLanguage: "id_ID" | "en_US",
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
      id: true,
      title: true,
      slug: true,
      type: true,
      language: true,
      createdAt: true,
      updatedAt: true,
    },
  })
}

export async function getTopicsSitemapByLang(
  topicPage: number,
  perPage: number,
  topicLanguage: "id_ID" | "en_US",
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

export async function getTopicParentById(topicParentId: string) {
  return await db.topicParent.findUnique({
    where: { id: topicParentId },
  })
}

export async function getTopicById(topicId: string) {
  return await db.topic.findUnique({
    where: { id: topicId },
    select: {
      id: true,
      title: true,
      slug: true,
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
      id: true,
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

export async function searchTopicsByLang(
  topicLanguage: "id_ID" | "en_US",
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
          slug: { contains: searchTopicQuery },
        },
        { title: { contains: searchTopicQuery } },
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
  topicLanguage: "id_ID" | "en_US",
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
          slug: { contains: searchTopicQuery },
        },
        { title: { contains: searchTopicQuery } },
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

export async function deleteTopicWithParentById(topicParentId: string) {
  return await db.$transaction([
    db.topic.deleteMany({
      where: {
        topicParentId: topicParentId,
      },
    }),
    db.topicParent.delete({
      where: {
        id: topicParentId,
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

export async function getTotalTopicParents() {
  return await db.topicParent.count()
}
