import db from "../../utils/db"
import { CreateArticleCommentInput } from "./article-comment.schema"

export async function createArticleComment(
  data: CreateArticleCommentInput & {
    authorId: string
    articleId: string
  },
) {
  return await db.articleComment.create({
    data,
  })
}

export async function updateArticleComment(
  articleCommentId: string,
  data: Omit<CreateArticleCommentInput, "articleId">,
) {
  return await db.articleComment.update({
    where: { id: articleCommentId },
    data,
  })
}

export async function deleteArticleCommentById(articleCommentId: string) {
  return await db.articleComment.delete({
    where: {
      id: articleCommentId,
    },
  })
}

export async function getArticleComments(commentPage: number, perPage: number) {
  return await db.articleComment.findMany({
    orderBy: {
      createdAt: "desc",
    },
    skip: (commentPage - 1) * perPage,
    take: perPage,
    select: {
      id: true,
      content: true,
      author: {
        select: {
          name: true,
          profilePicture: {
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

export async function getArticleCommentsDashboard(
  commentPage: number,
  perPage: number,
) {
  return await db.articleComment.findMany({
    orderBy: {
      createdAt: "desc",
    },
    skip: (commentPage - 1) * perPage,
    take: perPage,
    select: {
      id: true,
      content: true,
      author: {
        select: {
          name: true,
        },
      },
      article: {
        select: {
          slug: true,
        },
      },
      createdAt: true,
      updatedAt: true,
    },
  })
}

export async function getArticleCommentsByArticleId(
  articleId: string,
  commentPage: number,
  perPage: number,
) {
  return await db.articleComment.findMany({
    where: {
      articleId: articleId,
    },
    orderBy: {
      createdAt: "desc",
    },
    skip: (commentPage - 1) * perPage,
    take: perPage,
    select: {
      id: true,
      content: true,
      author: {
        select: {
          name: true,
          profilePicture: {
            select: {
              url: true,
            },
          },
        },
      },
      createdAt: true,
    },
  })
}

export async function getArticleCommentById(articleCommentId: string) {
  return await db.articleComment.findUnique({
    where: { id: articleCommentId },
    select: {
      id: true,
      content: true,
      author: {
        select: {
          name: true,
          profilePicture: {
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

export async function getTotalArticleCommentByArticle(articleId: string) {
  return await db.articleComment.count({
    where: {
      articleId: articleId,
    },
  })
}

export async function getTotalArticleComments() {
  return await db.articleComment.count()
}

export async function searchArticlecomments(searchArticleCommentQuery: string) {
  return await db.articleComment.findMany({
    where: {
      content: {
        search: searchArticleCommentQuery.split(" ").join(" & "),
      },
    },
    select: {
      id: true,
      content: true,
      author: {
        select: {
          name: true,
        },
      },
      article: {
        select: {
          slug: true,
        },
      },
      createdAt: true,
      updatedAt: true,
    },
  })
}
