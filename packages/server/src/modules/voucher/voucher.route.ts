//TODO: secure update voucher endpoint

import { FastifyInstance } from "fastify"
import {
  createVoucherHandler,
  deleteVoucherHandler,
  getVoucherByIdHandler,
  getVouchersHandler,
  getTotalVouchersHandler,
  searchVouchersHandler,
  updateVoucherHandler,
  getVoucherByVoucherCodeHandler,
} from "./voucher.controller"

import { $ref } from "./voucher.schema"

async function voucherRoutes(server: FastifyInstance) {
  server.post(
    "/",
    {
      preHandler: [server.authenticate],
      schema: {
        body: $ref("createVoucherSchema"),
        response: {
          201: $ref("voucherResponseSchema"),
        },
      },
    },
    createVoucherHandler,
  )

  server.get(
    "/page/:voucherPage",
    {
      schema: {
        response: {
          200: $ref("vouchersResponseSchema"),
        },
      },
    },

    getVouchersHandler,
  )

  server.get(
    "/search/:searchVoucherQuery",
    {
      schema: {
        response: {
          200: $ref("vouchersResponseSchema"),
        },
      },
    },

    searchVouchersHandler,
  )

  server.get(
    "/:voucherId",
    {
      schema: {
        response: {
          200: $ref("vouchersResponseSchema"),
        },
      },
    },
    getVoucherByIdHandler,
  )

  server.get(
    "/code/:voucherCode",
    {
      schema: {
        response: {
          200: $ref("vouchersResponseSchema"),
        },
      },
    },
    getVoucherByVoucherCodeHandler,
  )

  server.put(
    "/:voucherId",
    {
      schema: {
        body: $ref("updateVoucherSchema"),
        response: {
          201: $ref("voucherResponseSchema"),
        },
      },
    },
    updateVoucherHandler,
  )

  server.delete(
    "/:voucherId",
    { preHandler: [server.authenticate] },
    deleteVoucherHandler,
  )

  server.get("/count", getTotalVouchersHandler)
}

export default voucherRoutes
