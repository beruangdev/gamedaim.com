import { LanguageType } from "@prisma/client"

import db from "@/utils/db"
import {
  CreateArticleInput,
  CreateArticlePrimaryInput,
  UpdateArticleInput,
} from "./article.schema"

type CreateArticlePrimaryInputService = Omit<
  CreateArticlePrimaryInput,
  "articlePrimaryId" | "topicIds" | "authorIds" | "editorIds"
> & {
  slug: string
  excerpt: string
  topics: { connect: { id: string }[] }
  authors: { connect: { id: string }[] }
  editors: { connect: { id: string }[] }
}

type CreateArticleInputService = Omit<
  CreateArticleInput,
  "topicIds" | "authorIds" | "editorIds"
> & {
  slug: string
  excerpt: string
  topics: { connect: { id: string }[] }
  authors: { connect: { id: string }[] }
  editors: { connect: { id: string }[] }
}

type UpdateArticleInputService = Omit<
  UpdateArticleInput,
  "topicIds" | "authorIds" | "editorIds"
> & {
  excerpt: string
  topics: { connect: { id: string }[] }
  authors: { connect: { id: string }[] }
  editors: { connect: { id: string }[] }
}

export async function createArticleWithPrimary({
  title,
  content,
  excerpt,
  metaTitle,
  metaDescription,
  slug,
  featuredImageId,
  topics,
  authors,
  editors,
}: CreateArticlePrimaryInputService) {
  return await db.articlePrimary.create({
    data: {
      articles: {
        create: {
          title: title,
          content: content,
          excerpt: excerpt,
          metaTitle: metaTitle,
          metaDescription: metaDescription,
          slug: slug,
          featuredImageId: featuredImageId,
          topics: topics,
          authors: authors,
          editors: editors,
        },
      },
    },
  })
}

export async function createArticle(data: CreateArticleInputService) {
  return await db.article.create({
    data: data,
  })
}

export async function updateArticle(
  articleId: string,
  data: UpdateArticleInputService,
) {
  return await db.article.update({
    where: { id: articleId },
    data: data,
  })
}

export async function deleteArticleWithPrimaryById(articleParetId: string) {
  return await db.$transaction([
    db.article.deleteMany({
      where: {
        articlePrimaryId: articleParetId,
      },
    }),
    db.articlePrimary.delete({
      where: {
        id: articleParetId,
      },
    }),
  ])
}

export async function deleteArticleById(articleId: string) {
  return await db.article.delete({
    where: {
      id: articleId,
    },
  })
}

export async function getArticlesByLang(
  articleLanguage: LanguageType,
  articlePage: number,
  perPage: number,
) {
  return await db.article.findMany({
    where: {
      AND: [
        {
          language: articleLanguage,
          status: "PUBLISHED",
        },
      ],
    },
    orderBy: {
      updatedAt: "desc",
    },
    skip: (articlePage - 1) * perPage,
    take: perPage,
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
  })
}

export async function getArticlesDashboardByLang(
  articleLanguage: LanguageType,
  articlePage: number,
  perPage: number,
) {
  return await db.article.findMany({
    where: {
      language: articleLanguage,
    },
    orderBy: {
      updatedAt: "desc",
    },
    skip: (articlePage - 1) * perPage,
    take: perPage,
    select: {
      id: true,
      title: true,
      slug: true,
      status: true,
      createdAt: true,
      updatedAt: true,
      authors: {
        select: {
          name: true,
        },
      },
      editors: {
        select: {
          name: true,
        },
      },
    },
  })
}

export async function getArticlesSitemapByLang(
  articleLanguage: LanguageType,
  articlePage: number,
  perPage: number,
) {
  return await db.article.findMany({
    where: {
      AND: [
        {
          language: articleLanguage,
          status: "PUBLISHED",
        },
      ],
    },
    orderBy: {
      updatedAt: "desc",
    },
    skip: (articlePage - 1) * perPage,
    take: perPage,
    select: {
      slug: true,
      updatedAt: true,
    },
  })
}

export async function getArticlePrimaryById(articlePrimaryId: string) {
  return await db.articlePrimary.findUnique({
    where: { id: articlePrimaryId },
  })
}

export async function getArticleById(articleId: string) {
  return await db.article.findUnique({
    where: { id: articleId },
    select: {
      content: true,
      excerpt: true,
      title: true,
      metaTitle: true,
      metaDescription: true,
      slug: true,
      id: true,
      status: true,
      featuredImage: {
        select: {
          id: true,
          name: true,
          url: true,
        },
      },
      createdAt: true,
      updatedAt: true,
      topics: {
        select: {
          id: true,
          title: true,
          slug: true,
        },
      },
      authors: {
        select: {
          id: true,
          name: true,
          username: true,
          profilePicture: true,
        },
      },
      editors: {
        select: {
          id: true,
          name: true,
          username: true,
          profilePicture: true,
        },
      },
    },
  })
}

export async function getArticlesByAuthorUsernameAndLang(
  authorUsername: string,
  articleLanguage: LanguageType,
  articlePage: number,
  perPage: number,
) {
  return await db.article.findMany({
    where: {
      AND: [
        {
          language: articleLanguage,
          authors: { some: { username: authorUsername } },
        },
      ],
    },
    orderBy: {
      updatedAt: "desc",
    },
    skip: (articlePage - 1) * perPage,
    take: perPage,
    select: {
      content: true,
      excerpt: true,
      title: true,
      metaTitle: true,
      metaDescription: true,
      slug: true,
      id: true,
      status: true,
      featuredImage: {
        select: {
          id: true,
          name: true,
          url: true,
        },
      },
      createdAt: true,
      updatedAt: true,
      topics: {
        select: {
          id: true,
          title: true,
          slug: true,
        },
      },
    },
  })
}

export async function getArticleBySlug(articleSlug: string) {
  return await db.article.findUnique({
    where: { slug: articleSlug },
    select: {
      id: true,
      content: true,
      excerpt: true,
      title: true,
      metaTitle: true,
      metaDescription: true,
      slug: true,
      status: true,
      featuredImage: {
        select: {
          url: true,
        },
      },
      createdAt: true,
      updatedAt: true,
      topics: {
        select: {
          title: true,
          slug: true,
        },
      },
      authors: {
        select: {
          name: true,
          username: true,
        },
      },
      editors: {
        select: {
          name: true,
          username: true,
        },
      },
    },
  })
}

export async function getTotalArticles() {
  return await db.article.count()
}

export async function getTotalArticlePrimaries() {
  return await db.articlePrimary.count()
}

export async function searchArticlesByLang(
  articleLanguage: LanguageType,
  searchArticleQuery: string,
) {
  return await db.article.findMany({
    where: {
      AND: [
        {
          language: articleLanguage,
          status: "PUBLISHED",
        },
      ],
      OR: [
        {
          title: {
            search: searchArticleQuery.split(" ").join(" & "),
          },
          slug: {
            search: searchArticleQuery.split(" ").join(" & "),
          },
        },
      ],
    },
    select: {
      id: true,
      title: true,
      slug: true,
      status: true,
      featuredImage: {
        select: {
          url: true,
        },
      },
    },
  })
}

export async function searchArticlesDashboardByLang(
  articleLanguage: LanguageType,
  searchArticleQuery: string,
) {
  return await db.article.findMany({
    where: {
      language: articleLanguage,
      OR: [
        {
          title: {
            search: searchArticleQuery.split(" ").join(" & "),
          },
          slug: {
            search: searchArticleQuery.split(" ").join(" & "),
          },
        },
      ],
    },
    select: {
      id: true,
      title: true,
      slug: true,
      status: true,
      createdAt: true,
      updatedAt: true,
      authors: {
        select: {
          name: true,
        },
      },
    },
  })
}
