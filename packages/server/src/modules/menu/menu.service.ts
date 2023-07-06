import db from "@/utils/db"
import { CreateMenuInput } from "./menu.schema"
import { MenuLocation } from "@prisma/client"

export async function createMenu(data: CreateMenuInput) {
  return await db.menu.create({
    data,
  })
}

export async function updateMenu(menuId: string, data: CreateMenuInput) {
  return await db.menu.update({
    where: { id: menuId },
    data,
  })
}

export async function deleteMenuById(menuId: string) {
  return await db.menu.delete({
    where: {
      id: menuId,
    },
  })
}

export async function getMenus(menuPage: number, perPage: number) {
  return await db.menu.findMany({
    orderBy: {
      createdAt: "desc",
    },
    skip: (menuPage - 1) * perPage,
    take: perPage,
    select: {
      id: true,
      title: true,
      link: true,
      location: true,
      order: true,
      icon: true,
      active: true,
      createdAt: true,
      updatedAt: true,
    },
  })
}

export async function getMenuById(menuId: string) {
  return await db.menu.findUnique({
    where: { id: menuId },
    select: {
      id: true,
      title: true,
      link: true,
      location: true,
      order: true,
      icon: true,
      active: true,
      createdAt: true,
      updatedAt: true,
    },
  })
}

export async function getMenusByLocation(menuLocation: MenuLocation) {
  return await db.menu.findMany({
    where: { location: menuLocation, active: true },
    orderBy: {
      createdAt: "desc",
    },
    select: {
      id: true,
      title: true,
      link: true,
      location: true,
      order: true,
      icon: true,
    },
  })
}

export async function getTotalMenus() {
  return await db.menu.count()
}
