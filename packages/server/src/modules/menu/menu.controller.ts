import { FastifyReply, FastifyRequest } from "fastify"
import { MenuLocation } from "@prisma/client"

import { CreateMenuInput, UpdateMenuInput } from "./menu.schema"
import {
  createMenu,
  deleteMenuById,
  getMenuById,
  getMenus,
  getMenusByLocation,
  getTotalMenus,
  updateMenu,
} from "./menu.service"

export async function createMenuHandler(
  request: FastifyRequest<{
    Body: CreateMenuInput
  }>,
  reply: FastifyReply,
) {
  try {
    const { title, link, location, order, icon, active } = request.body
    const user = request.user

    if (user.role !== "ADMIN") {
      return reply.code(403).send({ message: "Unauthorized" })
    }

    const menu = await createMenu({
      title,
      link,
      location,
      order,
      icon,
      active,
    })
    return reply.code(201).send(menu)
  } catch (e) {
    console.log(e)
    return reply.code(500).send(e)
  }
}

export async function updateMenuHandler(
  request: FastifyRequest<{
    Params: { menuId: string }
    Body: UpdateMenuInput
  }>,
  reply: FastifyReply,
) {
  try {
    const { title, link, location, order, icon, active } = request.body
    const user = request.user
    const menuId = request.params.menuId

    if (user.role !== "ADMIN") {
      return reply.code(403).send({ message: "Unauthorized" })
    }

    const menu = await updateMenu(menuId, {
      title,
      link,
      location,
      order,
      icon,
      active,
    })
    return reply.code(201).send(menu)
  } catch (e) {
    console.log(e)
    return reply.code(500).send(e)
  }
}

export async function deleteMenuHandler(
  request: FastifyRequest<{ Params: { menuId: string } }>,
  reply: FastifyReply,
) {
  try {
    const { menuId } = request.params
    const user = request.user
    const deleteMenu = await deleteMenuById(menuId)

    if (user.role !== "ADMIN") {
      return reply.code(403).send({ message: "Unauthorized" })
    }

    return reply.code(201).send(deleteMenu)
  } catch (e) {
    console.log(e)
    return reply.code(500).send(e)
  }
}

export async function getMenusHandler(
  request: FastifyRequest<{ Params: { menuPage: number } }>,
  reply: FastifyReply,
) {
  try {
    const perPage = 10
    const menuPage = Number(request.params.menuPage || 1)
    const menus = await getMenus(menuPage, perPage)
    return reply.code(201).send(menus)
  } catch (e) {
    console.log(e)
    return reply.code(500).send(e)
  }
}

export async function getMenusByLocationHandler(
  request: FastifyRequest<{
    Params: { menuLocation: MenuLocation }
  }>,
  reply: FastifyReply,
) {
  try {
    const { menuLocation } = request.params
    const menu = await getMenusByLocation(menuLocation)
    return reply.code(201).send(menu)
  } catch (e) {
    console.log(e)
    return reply.code(500).send(e)
  }
}

export async function getMenuByIdHandler(
  request: FastifyRequest<{
    Params: { menuId: string }
  }>,
  reply: FastifyReply,
) {
  try {
    const { menuId } = request.params
    const menu = await getMenuById(menuId)
    return reply.code(201).send(menu)
  } catch (e) {
    console.log(e)
    return reply.code(500).send(e)
  }
}

export async function getTotalMenusHandler(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    const user = request.user

    if (user.role !== "ADMIN") {
      return reply.code(403).send({ message: "Unauthorized" })
    }

    const menus = await getTotalMenus()
    return reply.code(201).send(menus)
  } catch (e) {
    console.log(e)
    return reply.code(500).send(e)
  }
}
