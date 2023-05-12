import db from "../../utils/db"
import { CreateArticleInput } from "./article.schema"

type CreateArticleWithParentInputService = Omit<
  CreateArticleInput,
  "articleParentId" | "topicIds" | "authorIds" | "editorIds"
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

export async function createArticleWithParent({
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
}: CreateArticleWithParentInputService) {
  return await db.articleParent.create({
    data: {
      locales: {
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

export async function getArticlesByLang(
  articleLanguage: "id_ID" | "en_US",
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
  articleLanguage: "id_ID" | "en_US",
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
  articleLanguage: "id_ID" | "en_US",
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

export async function getArticleParentById(articleParentId: string) {
  return await db.articleParent.findUnique({
    where: { id: articleParentId },
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
  articleLanguage: "id_ID" | "en_US",
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

export async function updateArticle(
  articleId: string,
  data: CreateArticleInputService,
) {
  return await db.article.update({
    where: { id: articleId },
    data: data,
  })
}

export async function searchArticlesByLang(
  articleLanguage: "id_ID" | "en_US",
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
        { title: { contains: searchArticleQuery } },
        { slug: { contains: searchArticleQuery } },
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
  articleLanguage: "id_ID" | "en_US",
  searchArticleQuery: string,
) {
  return await db.article.findMany({
    where: {
      language: articleLanguage,
      OR: [
        { title: { contains: searchArticleQuery } },
        { slug: { contains: searchArticleQuery } },
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

export async function deleteArticleWithParentById(articleParetId: string) {
  return await db.$transaction([
    db.article.deleteMany({
      where: {
        articleParentId: articleParetId,
      },
    }),
    db.articleParent.delete({
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

export async function getTotalArticles() {
  return await db.article.count()
}

export async function getTotalArticleParents() {
  return await db.articleParent.count()
}
