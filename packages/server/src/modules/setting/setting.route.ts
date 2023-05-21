import { FastifyInstance } from "fastify"

import {
  createOrUpdateSettingHandler,
  getSettingByKeyHandler,
  getSettingsHandler,
} from "./setting.controller"

import { $ref } from "./setting.schema"

async function settingRoutes(server: FastifyInstance) {
  server.post(
    "/",
    {
      preHandler: [server.authenticate],
      schema: {
        body: $ref("createSettingSchema"),
        response: {
          201: $ref("settingResponseSchema"),
        },
      },
    },
    createOrUpdateSettingHandler,
  )

  server.get(
    "/:settingKey",
    {
      schema: {
        response: {
          200: $ref("settingsResponseSchema"),
        },
      },
    },
    getSettingByKeyHandler,
  )

  server.get(
    "/",
    {
      preHandler: [server.authenticate],
      schema: {
        response: {
          201: $ref("settingsResponseSchema"),
        },
      },
    },
    getSettingsHandler,
  )
}

export default settingRoutes
