import { FastifyInstance } from "fastify"
import {
  createMenuHandler,
  deleteMenuHandler,
  getMenuByIdHandler,
  getMenusByLocationHandler,
  getMenusHandler,
  getTotalMenusHandler,
  updateMenuHandler,
} from "./menu.controller"
import { $ref } from "./menu.schema"

async function menuRoutes(server: FastifyInstance) {
  server.post(
    "/",
    {
      preHandler: [server.authenticate],
      schema: {
        body: $ref("createMenuSchema"),
        response: {
          201: $ref("menuResponseSchema"),
        },
      },
    },
    createMenuHandler,
  )

  server.put(
    "/:menuId",
    {
      preHandler: [server.authenticate],
      schema: {
        body: $ref("updateMenuSchema"),
        response: {
          201: $ref("menuResponseSchema"),
        },
      },
    },
    updateMenuHandler,
  )

  server.delete(
    "/:menuId",
    { preHandler: [server.authenticate] },
    deleteMenuHandler,
  )

  server.get(
    "/page/:menuPage",
    {
      schema: {
        response: {
          200: $ref("menusResponseSchema"),
        },
      },
    },
    getMenusHandler,
  )

  server.get(
    "/location/:menuLocation",
    {
      schema: {
        response: {
          200: $ref("menusResponseSchema"),
        },
      },
    },
    getMenusByLocationHandler,
  )

  server.get(
    "/:menuId",
    {
      schema: {
        response: {
          200: $ref("menusResponseSchema"),
        },
      },
    },
    getMenuByIdHandler,
  )

  server.get(
    "/count",
    { preHandler: [server.authenticate] },
    getTotalMenusHandler,
  )
}

export default menuRoutes
