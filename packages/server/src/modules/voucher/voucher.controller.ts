import { FastifyReply, FastifyRequest } from "fastify"

import { uniqueSlug } from "@/utils/slug"
import { CreateVoucherInput, UpdateVoucherInput } from "./voucher.schema"
import {
  createVoucher,
  deleteVoucherById,
  findVoucherById,
  getVouchers,
  getTotalVouchers,
  searchVouchers,
  updateVoucher,
  findVoucherByVoucherCode,
} from "./voucher.service"

export async function createVoucherHandler(
  request: FastifyRequest<{ Body: CreateVoucherInput & { articleId: string } }>,
  reply: FastifyReply,
) {
  try {
    const {
      name,
      discountPercentage,
      discountMax,
      voucherCode,
      voucherAmount,
      description,
      expiration,
      active,
    } = request.body

    const generatedVoucherCode = JSON.stringify(
      !voucherCode ? uniqueSlug : voucherCode,
    )

    const voucher = await createVoucher({
      name,
      voucherCode: generatedVoucherCode,
      discountPercentage,
      discountMax,
      voucherAmount,
      description,
      expiration,
      active,
    })
    return reply.code(201).send(voucher)
  } catch (e) {
    console.log(e)
    return reply.code(500).send(e)
  }
}

export async function updateVoucherHandler(
  request: FastifyRequest<{
    Params: { voucherId: string }
    Body: UpdateVoucherInput
  }>,
  reply: FastifyReply,
) {
  try {
    const {
      name,
      voucherCode,
      discountPercentage,
      discountMax,
      voucherAmount,
      description,
      expiration,
      active,
    } = request.body
    const voucherId = request.params.voucherId

    const voucher = await updateVoucher(voucherId, {
      name,
      voucherCode,
      discountPercentage,
      discountMax,
      voucherAmount,
      description,
      expiration,
      active,
    })
    return reply.code(201).send(voucher)
  } catch (e) {
    console.log(e)
    return reply.code(500).send(e)
  }
}

export async function getVoucherByIdHandler(
  request: FastifyRequest<{
    Params: { voucherId: string }
  }>,
  reply: FastifyReply,
) {
  try {
    const { voucherId } = request.params
    const voucher = await findVoucherById(voucherId)
    return reply.code(201).send(voucher)
  } catch (e) {
    console.log(e)
    return reply.code(500).send(e)
  }
}

export async function getVoucherByVoucherCodeHandler(
  request: FastifyRequest<{
    Params: { voucherCode: string }
  }>,
  reply: FastifyReply,
) {
  try {
    const { voucherCode } = request.params
    const voucher = await findVoucherByVoucherCode(voucherCode)
    return reply.code(201).send(voucher)
  } catch (e) {
    console.log(e)
    return reply.code(500).send(e)
  }
}

export async function deleteVoucherHandler(
  request: FastifyRequest<{ Params: { voucherId: string } }>,
  reply: FastifyReply,
) {
  try {
    const { voucherId } = request.params
    const user = request.user
    const deleteVoucher = await deleteVoucherById(voucherId)

    if (user.role !== "ADMIN") {
      return reply.code(403).send({ message: "Unauthorized" })
    }

    return reply.code(201).send(deleteVoucher)
  } catch (e) {
    console.log(e)
    return reply.code(500).send(e)
  }
}

export async function getVouchersHandler(
  request: FastifyRequest<{ Params: { voucherPage: number } }>,
  reply: FastifyReply,
) {
  try {
    const perPage = 10
    const voucherPage = Number(request.params.voucherPage || 1)
    const vouchers = await getVouchers(voucherPage, perPage)
    return reply.code(201).send(vouchers)
  } catch (e) {
    console.log(e)
    return reply.code(500).send(e)
  }
}

export async function searchVouchersHandler(
  request: FastifyRequest<{ Params: { searchVoucherQuery: string } }>,
  reply: FastifyReply,
) {
  try {
    const searchQuery = request.params.searchVoucherQuery

    const vouchers = await searchVouchers(searchQuery)
    return reply.code(201).send(vouchers)
  } catch (e) {
    console.log(e)
    return reply.code(500).send(e)
  }
}

export async function getTotalVouchersHandler(
  _request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    const vouchers = await getTotalVouchers()
    return reply.code(201).send(vouchers)
  } catch (e) {
    console.log(e)
    return reply.code(500).send(e)
  }
}
