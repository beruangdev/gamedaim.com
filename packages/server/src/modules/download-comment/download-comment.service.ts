import db from "@/utils/db"
import { CreateDownloadCommentInput } from "./download-comment.schema"

export async function createDownloadComment(
  data: CreateDownloadCommentInput & {
    authorId: string
    downloadId: string
  },
) {
  return await db.downloadComment.create({
    data,
  })
}

export async function updateDownloadComment(
  downloadCommentId: string,
  data: Omit<CreateDownloadCommentInput, "downloadId">,
) {
  return await db.downloadComment.update({
    where: { id: downloadCommentId },
    data,
  })
}

export async function deleteDownloadCommentById(downloadCommentId: string) {
  return await db.downloadComment.delete({
    where: {
      id: downloadCommentId,
    },
  })
}

export async function getDownloadComments(
  commentPage: number,
  perPage: number,
) {
  return await db.downloadComment.findMany({
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

export async function getDownloadCommentsDashboard(
  commentPage: number,
  perPage: number,
) {
  return await db.downloadComment.findMany({
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
      download: {
        select: {
          slug: true,
        },
      },
      createdAt: true,
      updatedAt: true,
    },
  })
}

export async function getDownloadCommentsByDownloadId(
  downloadId: string,
  commentPage: number,
  perPage: number,
) {
  return await db.downloadComment.findMany({
    where: {
      downloadId: downloadId,
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

export async function getDownloadCommentById(downloadCommentId: string) {
  return await db.downloadComment.findUnique({
    where: { id: downloadCommentId },
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

export async function getTotalDownloadCommentByDownload(downloadId: string) {
  return await db.downloadComment.count({
    where: {
      downloadId: downloadId,
    },
  })
}

export async function getTotalDownloadComments() {
  return await db.downloadComment.count()
}

export async function searchDownloadComments(
  searchDownloadCommentQuery: string,
) {
  return await db.downloadComment.findMany({
    where: {
      content: {
        search: searchDownloadCommentQuery.split(" ").join(" & "),
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
      download: {
        select: {
          slug: true,
        },
      },
      createdAt: true,
      updatedAt: true,
    },
  })
}
