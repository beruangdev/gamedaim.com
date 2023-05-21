import { FastifyInstance } from "fastify"

import {
  createOrUpdateViewCounterHandler,
  getViewCounterBySlugHandler,
  getViewCountersHandler,
} from "./view-counter.controller"

import { $ref } from "./view-counter.schema"

async function viewCounterRoutes(server: FastifyInstance) {
  server.post(
    "/",
    {
      preHandler: [server.authenticate],
      schema: {
        body: $ref("createViewCounterSchema"),
        response: {
          201: $ref("viewCounterResponseSchema"),
        },
      },
    },
    createOrUpdateViewCounterHandler,
  )

  server.get(
    "/:viewCounterSlug",
    {
      schema: {
        response: {
          200: $ref("viewCountersResponseSchema"),
        },
      },
    },
    getViewCounterBySlugHandler,
  )

  server.get(
    "/",
    {
      preHandler: [server.authenticate],
      schema: {
        response: {
          201: $ref("viewCountersResponseSchema"),
        },
      },
    },
    getViewCountersHandler,
  )
}

export default viewCounterRoutes
