import db from "../../utils/db"
import { UpdateMediaInput, UploadMediaInput } from "./media.schema"

export async function uploadMedia(
  data: UploadMediaInput & { authorId: string },
) {
  return await db.media.create({
    //@ts-ignore FIX: LATER
    data,
  })
}

export async function getMedias(mediaPage: number, perPage: number) {
  return await db.media.findMany({
    orderBy: {
      createdAt: "desc",
    },
    skip: (mediaPage - 1) * perPage,
    take: perPage,
    select: {
      id: true,
      name: true,
      description: true,
      url: true,
      author: {
        select: {
          username: true,
        },
      },
      createdAt: true,
      updatedAt: true,
    },
  })
}

export async function getMediasDashboard(mediaPage: number, perPage: number) {
  return await db.media.findMany({
    orderBy: {
      createdAt: "desc",
    },
    skip: (mediaPage - 1) * perPage,
    take: perPage,
    select: {
      id: true,
      url: true,
      name: true,
    },
  })
}

export async function findMediaById(mediaId: string) {
  return await db.media.findUnique({
    where: { id: mediaId },
    select: {
      id: true,
      name: true,
      description: true,
      url: true,
      author: {
        select: {
          name: true,
          username: true,
        },
      },
      createdAt: true,
      updatedAt: true,
    },
  })
}

export async function findMediaByAuthorId(
  authorId: string,
  mediaPage: number,
  perPage: number,
) {
  return await db.media.findMany({
    where: { authorId: authorId },
    orderBy: {
      createdAt: "desc",
    },
    skip: (mediaPage - 1) * perPage,
    take: perPage,
    select: {
      id: true,
      name: true,
      url: true,
    },
  })
}

export async function updateMedia(mediaId: string, data: UpdateMediaInput) {
  return await db.media.update({
    where: { id: mediaId },
    data,
  })
}

export async function searchMedias(searchMediaQuery: string) {
  return await db.media.findMany({
    where: {
      OR: [
        { name: { contains: searchMediaQuery } },
        { description: { contains: searchMediaQuery } },
      ],
    },
    select: {
      id: true,
      name: true,
      url: true,
    },
  })
}

export async function deleteMediaById(mediaId: string) {
  return await db.media.delete({
    where: {
      id: mediaId,
    },
  })
}

export async function deleteMediaByName(mediaName: string) {
  return await db.media.delete({
    where: {
      name: mediaName,
    },
  })
}

export async function getTotalMedias() {
  return await db.media.count()
}
