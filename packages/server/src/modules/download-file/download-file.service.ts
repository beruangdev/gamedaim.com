import db from "@/utils/db"
import {
  CreateDownloadFileInput,
  UpdateDownloadFileInput,
} from "./download-file.schema"

type CreateDownloadFileInputService = Omit<
  CreateDownloadFileInput,
  "authorIds"
> & {
  slug: string
  authors: { connect: { id: string }[] }
}

type UpdateDownloadFileInputService = Omit<
  UpdateDownloadFileInput,
  "authorIds"
> & {
  slug: string
  authors: { connect: { id: string }[] }
}

export async function createDownloadFile(data: CreateDownloadFileInputService) {
  return await db.downloadFile.create({
    data,
  })
}

export async function updateDownloadFile(
  downloadFileId: string,
  data: UpdateDownloadFileInputService,
) {
  return await db.downloadFile.update({
    where: { id: downloadFileId },
    data,
  })
}

export async function deleteDownloadFileById(downloadFileId: string) {
  return await db.downloadFile.delete({
    where: {
      id: downloadFileId,
    },
  })
}

export async function getDownloadFiles(
  downloadFilePage: number,
  perPage: number,
) {
  return await db.downloadFile.findMany({
    orderBy: {
      createdAt: "desc",
    },
    skip: (downloadFilePage - 1) * perPage,
    take: perPage,
    select: {
      title: true,
      metaTitle: true,
      metaDescription: true,
      slug: true,
      id: true,
      featuredImage: {
        select: {
          id: true,
          url: true,
        },
      },
      authors: {
        select: {
          name: true,
          username: true,
          profilePicture: true,
        },
      },
      downloads: {
        select: {
          title: true,
          slug: true,
          developer: true,
          operatingSystem: true,
          license: true,
          officialWeb: true,
          schemaType: true,
          type: true,
        },
      },
      version: true,
      downloadLink: true,
      fileSize: true,
      currency: true,
      price: true,
      status: true,
      createdAt: true,
      updatedAt: true,
    },
  })
}

export async function getDownloadFilesSitemap(
  downloadFilePage: number,
  perPage: number,
) {
  return await db.downloadFile.findMany({
    orderBy: {
      createdAt: "desc",
    },
    skip: (downloadFilePage - 1) * perPage,
    take: perPage,
    select: {
      slug: true,
      updatedAt: true,
      downloads: {
        select: {
          type: true,
          slug: true,
        },
      },
    },
  })
}

export async function getDownloadFileById(downloadFileId: string) {
  return await db.downloadFile.findUnique({
    where: { id: downloadFileId },
    select: {
      title: true,
      metaTitle: true,
      metaDescription: true,
      slug: true,
      id: true,
      featuredImage: {
        select: {
          id: true,
          url: true,
        },
      },
      authors: {
        select: {
          name: true,
          username: true,
          profilePicture: true,
        },
      },
      downloads: {
        select: {
          title: true,
          slug: true,
          developer: true,
          operatingSystem: true,
          license: true,
          officialWeb: true,
          schemaType: true,
          type: true,
        },
      },
      version: true,
      downloadLink: true,
      fileSize: true,
      currency: true,
      price: true,
      status: true,
      createdAt: true,
      updatedAt: true,
    },
  })
}

export async function getDownloadFileByAuthorUsername(
  authorUsername: string,
  downloadFilePage: number,
  perPage: number,
) {
  return await db.downloadFile.findMany({
    where: {
      authors: { some: { username: authorUsername } },
    },
    orderBy: {
      createdAt: "desc",
    },
    skip: (downloadFilePage - 1) * perPage,
    take: perPage,
    select: {
      title: true,
      metaTitle: true,
      metaDescription: true,
      slug: true,
      id: true,
      featuredImage: {
        select: {
          id: true,
          url: true,
        },
      },
      downloads: {
        select: {
          title: true,
          slug: true,
          developer: true,
          operatingSystem: true,
          license: true,
          officialWeb: true,
          schemaType: true,
          type: true,
        },
      },
      version: true,
      downloadLink: true,
      fileSize: true,
      currency: true,
      price: true,
      status: true,
      createdAt: true,
      updatedAt: true,
    },
  })
}

export async function getDownloadFileBySlug(downloadFileSlug: string) {
  return await db.downloadFile.findUnique({
    where: { slug: downloadFileSlug },
    select: {
      title: true,
      metaTitle: true,
      metaDescription: true,
      slug: true,
      id: true,
      featuredImage: {
        select: {
          id: true,
          url: true,
        },
      },
      authors: {
        select: {
          name: true,
          username: true,
          profilePicture: true,
        },
      },
      downloads: {
        select: {
          title: true,
          slug: true,
          developer: true,
          operatingSystem: true,
          license: true,
          officialWeb: true,
          schemaType: true,
          type: true,
        },
      },
      version: true,
      downloadLink: true,
      fileSize: true,
      currency: true,
      price: true,
      status: true,
      createdAt: true,
      updatedAt: true,
    },
  })
}

export async function getTotalDownloadFiles() {
  return await db.downloadFile.count()
}

export async function searchDownloadFiles(searchDownloadFileQuery: string) {
  return await db.downloadFile.findMany({
    where: {
      OR: [
        {
          title: {
            search: searchDownloadFileQuery.split(" ").join(" & "),
          },
          version: {
            search: searchDownloadFileQuery.split(" ").join(" & "),
          },
          downloadLink: {
            search: searchDownloadFileQuery.split(" ").join(" & "),
          },
        },
      ],
    },
    select: {
      title: true,
      metaTitle: true,
      metaDescription: true,
      slug: true,
      id: true,
      featuredImage: {
        select: {
          id: true,
          url: true,
        },
      },
      authors: {
        select: {
          name: true,
          username: true,
          profilePicture: true,
        },
      },
      downloads: {
        select: {
          title: true,
          slug: true,
          developer: true,
          operatingSystem: true,
          license: true,
          officialWeb: true,
          schemaType: true,
          type: true,
        },
      },
      version: true,
      downloadLink: true,
      fileSize: true,
      currency: true,
      price: true,
      status: true,
      createdAt: true,
      updatedAt: true,
    },
  })
}
