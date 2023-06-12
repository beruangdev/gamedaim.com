import { DownloadType, LanguageType } from "@prisma/client"

import db from "@/utils/db"
import {
  CreateDownloadInput,
  CreateDownloadPrimaryInput,
  UpdateDownloadInput,
} from "./download.schema"

type CreateDownloadPrimaryInputService = Omit<
  CreateDownloadPrimaryInput,
  "downloadPrimaryId" | "topicIds" | "authorIds" | "downloadFileIds"
> & {
  slug: string
  excerpt: string
  topics: { connect: { id: string }[] }
  authors: { connect: { id: string }[] }
  downloadFiles: { connect: { id: string }[] }
}

type CreateDownloadInputService = Omit<
  CreateDownloadInput,
  "topicIds" | "authorIds" | "downloadFileIds"
> & {
  slug: string
  excerpt: string
  topics: { connect: { id: string }[] }
  authors: { connect: { id: string }[] }
  downloadFiles: { connect: { id: string }[] }
}

type UpdateDownloadInputService = Omit<
  UpdateDownloadInput,
  "topicIds" | "authorIds" | "downloadFileIds"
> & {
  excerpt: string
  topics: { connect: { id: string }[] }
  authors: { connect: { id: string }[] }
  downloadFiles: { connect: { id: string }[] }
}

export async function createDownloadWithPrimary({
  title,
  language,
  content,
  excerpt,
  metaTitle,
  metaDescription,
  slug,
  featuredImageId,
  developer,
  operatingSystem,
  license,
  officialWeb,
  schemaType,
  type,
  topics,
  downloadFiles,
  authors,
}: CreateDownloadPrimaryInputService) {
  return await db.downloadPrimary.create({
    data: {
      downloads: {
        create: {
          title: title,
          language: language,
          content: content,
          excerpt: excerpt,
          metaTitle: metaTitle,
          metaDescription: metaDescription,
          slug: slug,
          developer: developer,
          operatingSystem: operatingSystem,
          license: license,
          officialWeb: officialWeb,
          schemaType: schemaType,
          type: type,
          featuredImageId: featuredImageId,
          downloadFiles: downloadFiles,
          authors: authors,
          topics: topics,
        },
      },
    },
  })
}

export async function createDownload(data: CreateDownloadInputService) {
  return await db.download.create({
    data,
  })
}

export async function updateDownload(
  downloadId: string,
  data: UpdateDownloadInputService,
) {
  return await db.download.update({
    where: { id: downloadId },
    data,
  })
}

export async function deleteDownloadWithPrimaryById(downloadPrimaryId: string) {
  return await db.$transaction([
    db.download.deleteMany({
      where: {
        downloadPrimaryId: downloadPrimaryId,
      },
    }),
    db.downloadPrimary.delete({
      where: {
        id: downloadPrimaryId,
      },
    }),
  ])
}

export async function deleteDownloadById(downloadId: string) {
  return await db.download.delete({
    where: {
      id: downloadId,
    },
  })
}

export async function getDownloadsByLang(
  downloadLanguage: LanguageType,
  downloadPage: number,
  perPage: number,
) {
  return await db.download.findMany({
    where: {
      AND: [
        {
          language: downloadLanguage,
          status: "PUBLISHED",
        },
      ],
    },
    orderBy: {
      createdAt: "desc",
    },
    skip: (downloadPage - 1) * perPage,
    take: perPage,
    select: {
      id: true,
      title: true,
      content: true,
      excerpt: true,
      slug: true,
      metaTitle: true,
      metaDescription: true,
      topics: {
        select: {
          id: true,
          title: true,
          slug: true,
        },
      },
      featuredImage: {
        select: {
          id: true,
          url: true,
        },
      },
      developer: true,
      operatingSystem: true,
      license: true,
      officialWeb: true,
      schemaType: true,
      type: true,
      status: true,
      downloadFiles: {
        orderBy: {
          createdAt: "desc",
        },
        select: {
          title: true,
          slug: true,
          version: true,
          downloadLink: true,
          fileSize: true,
          currency: true,
          price: true,
        },
      },
      createdAt: true,
      updatedAt: true,
      authors: {
        select: {
          name: true,
          username: true,
          profilePicture: true,
        },
      },
    },
  })
}

export async function getDownloadsDashboardByLang(
  downloadLanguage: LanguageType,
  downloadPage: number,
  perPage: number,
) {
  return await db.download.findMany({
    where: {
      language: downloadLanguage,
    },
    orderBy: {
      createdAt: "desc",
    },
    skip: (downloadPage - 1) * perPage,
    take: perPage,
    select: {
      id: true,
      title: true,
      slug: true,
      status: true,
      type: true,
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

export async function getDownloadsSitemapByLang(
  downloadLanguage: LanguageType,
  downloadPage: number,
  perPage: number,
) {
  return await db.download.findMany({
    where: {
      AND: [
        {
          language: downloadLanguage,
          status: "PUBLISHED",
        },
      ],
    },
    orderBy: {
      createdAt: "desc",
    },
    skip: (downloadPage - 1) * perPage,
    take: perPage,
    select: {
      slug: true,
      type: true,
      updatedAt: true,
    },
  })
}

export async function getDownloadPrimaryById(downloadPrimaryId: string) {
  return await db.downloadPrimary.findUnique({
    where: { id: downloadPrimaryId },
  })
}

export async function getDownloadById(downloadId: string) {
  return await db.download.findUnique({
    where: { id: downloadId },
    select: {
      id: true,
      title: true,
      language: true,
      content: true,
      excerpt: true,
      slug: true,
      metaTitle: true,
      metaDescription: true,
      topics: {
        select: {
          id: true,
          title: true,
          slug: true,
        },
      },
      featuredImage: {
        select: {
          id: true,
          url: true,
        },
      },
      developer: true,
      operatingSystem: true,
      license: true,
      officialWeb: true,
      schemaType: true,
      type: true,
      status: true,
      downloadFiles: {
        orderBy: {
          createdAt: "desc",
        },
        select: {
          id: true,
          title: true,
          slug: true,
          version: true,
          downloadLink: true,
          fileSize: true,
          currency: true,
          price: true,
        },
      },
      createdAt: true,
      updatedAt: true,
      authors: {
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

export async function getDownloadsByTypeAndLang(
  downloadLanguage: LanguageType,
  downloadType: DownloadType,
  downloadPage: number,
  perPage: number,
) {
  return await db.download.findMany({
    where: {
      AND: [
        {
          language: downloadLanguage,
          type: downloadType,
        },
      ],
    },
    orderBy: {
      createdAt: "desc",
    },
    skip: (downloadPage - 1) * perPage,
    take: perPage,
    select: {
      id: true,
      language: true,
      title: true,
      content: true,
      excerpt: true,
      slug: true,
      metaTitle: true,
      metaDescription: true,
      topics: {
        select: {
          id: true,
          title: true,
          slug: true,
        },
      },
      featuredImage: {
        select: {
          id: true,
          url: true,
        },
      },
      developer: true,
      operatingSystem: true,
      license: true,
      officialWeb: true,
      schemaType: true,
      type: true,
      status: true,
      downloadFiles: {
        orderBy: {
          createdAt: "desc",
        },
        select: {
          title: true,
          slug: true,
          version: true,
          downloadLink: true,
          fileSize: true,
          currency: true,
          price: true,
        },
      },
      createdAt: true,
      updatedAt: true,
      authors: {
        select: {
          name: true,
          username: true,
          profilePicture: true,
        },
      },
    },
  })
}

export async function getDownloadByAuthorUsernameAndLang(
  authorUsername: string,
  downloadLanguage: LanguageType,
  downloadPage: number,
  perPage: number,
) {
  return await db.download.findMany({
    where: {
      AND: [
        {
          language: downloadLanguage,
          authors: { some: { username: authorUsername } },
        },
      ],
    },
    orderBy: {
      createdAt: "desc",
    },
    skip: (downloadPage - 1) * perPage,
    take: perPage,
    select: {
      id: true,
      title: true,
      content: true,
      excerpt: true,
      slug: true,
      metaTitle: true,
      metaDescription: true,
      topics: {
        select: {
          id: true,
          title: true,
          slug: true,
        },
      },
      featuredImage: {
        select: {
          id: true,
          url: true,
        },
      },
      developer: true,
      operatingSystem: true,
      license: true,
      officialWeb: true,
      schemaType: true,
      type: true,
      status: true,
      downloadFiles: {
        orderBy: {
          createdAt: "desc",
        },
        select: {
          id: true,
          title: true,
          slug: true,
          version: true,
          downloadLink: true,
          fileSize: true,
          currency: true,
          price: true,
        },
      },
      createdAt: true,
      updatedAt: true,
      authors: {
        select: {
          name: true,
          username: true,
          profilePicture: true,
        },
      },
    },
  })
}

export async function getDownloadBySlug(
  downloadSlug: string,
  downloadFilesPage: number,
  perPage: number,
) {
  return await db.download.findUnique({
    where: { slug: downloadSlug },
    select: {
      id: true,
      title: true,
      content: true,
      excerpt: true,
      slug: true,
      metaTitle: true,
      metaDescription: true,
      topics: {
        select: {
          id: true,
          title: true,
          slug: true,
        },
      },
      featuredImage: {
        select: {
          id: true,
          url: true,
        },
      },
      developer: true,
      operatingSystem: true,
      license: true,
      officialWeb: true,
      schemaType: true,
      type: true,
      status: true,
      downloadFiles: {
        orderBy: {
          createdAt: "desc",
        },
        skip: (downloadFilesPage - 1) * perPage,
        take: perPage,
        select: {
          id: true,
          title: true,
          slug: true,
          version: true,
          downloadLink: true,
          fileSize: true,
          currency: true,
          price: true,
        },
      },
      authors: {
        select: {
          name: true,
          username: true,
          profilePicture: true,
        },
      },
      createdAt: true,
      updatedAt: true,
    },
  })
}

export async function getTotalDownloads() {
  return await db.download.count()
}

export async function getTotalDownloadsByLang(downloadLanguage: LanguageType) {
  return await db.download.count({
    where: {
      language: downloadLanguage,
    },
  })
}

export async function getTotalDownloadPrimaries() {
  return await db.downloadPrimary.count()
}

export async function searchDownloads(
  articleLanguage: LanguageType,
  searchDownloadQuery: string,
) {
  return await db.download.findMany({
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
            search: searchDownloadQuery.split(" ").join(" & "),
          },
          slug: {
            search: searchDownloadQuery.split(" ").join(" & "),
          },
        },
      ],
    },
    select: {
      id: true,
      title: true,
      content: true,
      excerpt: true,
      slug: true,
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

export async function searchDownloadsDashboardByLang(
  articleLanguage: LanguageType,
  searchDownloadQuery: string,
) {
  return await db.download.findMany({
    where: {
      language: articleLanguage,
      OR: [
        {
          title: {
            search: searchDownloadQuery.split(" ").join(" & "),
          },
          slug: {
            search: searchDownloadQuery.split(" ").join(" & "),
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
