import db from "@/utils/db"
import { CreateAdInput } from "./ad.schema"
import { AdPosition } from "@prisma/client"


export async function createAd(data: CreateAdInput) {
  return await db.ad.create({
    data,
  })
}

export async function updateAd(adId: string, data: CreateAdInput) {
  return await db.ad.update({
    where: { id: adId },
    data,
  })
}

export async function deleteAdById(adId: string) {
  return await db.ad.delete({
    where: {
      id: adId,
    },
  })
}

export async function getAds(adPage: number, perPage: number) {
  return await db.ad.findMany({
    orderBy: {
      createdAt: "desc",
    },
    skip: (adPage - 1) * perPage,
    take: perPage,
    select: {
      id: true,
      title: true,
      content: true,
      position: true,
      type: true,
      active: true,
      createdAt: true,
      updatedAt: true,
    },
  })
}

export async function getAdById(adId: string) {
  return await db.ad.findUnique({
    where: { id: adId },
    select: {
      id: true,
      title: true,
      content: true,
      position: true,
      type: true,
      active: true,
      createdAt: true,
      updatedAt: true,
    },
  })
}

export async function getAdsByPosition(adPosition: AdPosition) {
  return await db.ad.findMany({
    where: { position: adPosition, active: true },
    orderBy: {
      createdAt: "desc",
    },
    select: {
      content: true,
      type: true,
    },
  })
}

export async function getTotalAds() {
  return await db.ad.count()
}
