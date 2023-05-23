import db from "@/utils/db"
import { CreateWpCommentInput, UpdateWpCommentInput } from "./wp-comment.schema"

export async function createWpComment(
  data: CreateWpCommentInput & {
    authorId: string
  },
) {
  return await db.wpComment.create({
    data,
  })
}

export async function getWpComments(wpCommentPage: number, perPage: number) {
  return await db.wpComment.findMany({
    orderBy: {
      createdAt: "desc",
    },
    skip: (wpCommentPage - 1) * perPage,
    take: perPage,
    select: {
      content: true,
      wpPostSlug: true,
      id: true,
      createdAt: true,
      updatedAt: true,
      author: {
        select: {
          id: true,
          name: true,
          profilePicture: {
            select: {
              url: true,
            },
          },
        },
      },
    },
  })
}

export async function getWpCommentById(wpCommentId: string) {
  return await db.wpComment.findUnique({
    where: { id: wpCommentId },
    select: {
      content: true,
      wpPostSlug: true,
      id: true,
      createdAt: true,
      updatedAt: true,
      author: {
        select: {
          id: true,
          name: true,
          profilePicture: {
            select: {
              url: true,
            },
          },
        },
      },
    },
  })
}

export async function getWpCommentByWpPostSlug(wpPostSlug: string) {
  return await db.wpComment.findMany({
    where: { wpPostSlug: wpPostSlug },
    select: {
      content: true,
      wpPostSlug: true,
      id: true,
      createdAt: true,
      updatedAt: true,
      author: {
        select: {
          id: true,
          name: true,
          profilePicture: {
            select: {
              url: true,
            },
          },
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  })
}

export async function updateWpComment(
  wpCommentId: string,
  data: UpdateWpCommentInput,
) {
  return await db.wpComment.update({
    where: { id: wpCommentId },
    data,
  })
}

export async function searchWpComments(searchWpCommentQuery: string) {
  return await db.wpComment.findMany({
    where: {
      content: {
        search: searchWpCommentQuery.split(" ").join(" & "),
      },
    },
    select: {
      content: true,
      wpPostSlug: true,
      id: true,
      createdAt: true,
      updatedAt: true,
      author: {
        select: {
          id: true,
          name: true,
          profilePicture: {
            select: {
              url: true,
            },
          },
        },
      },
    },
  })
}

export async function deleteWpCommentById(wpCommentId: string) {
  return await db.wpComment.delete({
    where: {
      id: wpCommentId,
    },
  })
}

export async function getTotalWpComments() {
  return await db.wpComment.count()
}
