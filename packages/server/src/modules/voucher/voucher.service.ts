import db from "@/utils/db"

import { CreateVoucherInput, UpdateVoucherInput } from "./voucher.schema"

export async function createVoucher(data: CreateVoucherInput) {
  return await db.voucher.create({
    data,
  })
}

export async function getVouchers(voucherPage: number, perPage: number) {
  return await db.voucher.findMany({
    orderBy: {
      createdAt: "desc",
    },
    skip: (voucherPage - 1) * perPage,
    take: perPage,
    select: {
      id: true,
      name: true,
      voucherCode: true,
      discountPercentage: true,
      discountMax: true,
      voucherAmount: true,
      description: true,
      expiration: true,
      active: true,
      createdAt: true,
      updatedAt: true,
    },
  })
}

export async function getVoucherById(voucherId: string) {
  return await db.voucher.findUnique({
    where: { id: voucherId },
    select: {
      id: true,
      name: true,
      voucherCode: true,
      discountPercentage: true,
      discountMax: true,
      voucherAmount: true,
      description: true,
      expiration: true,
      active: true,
      createdAt: true,
      updatedAt: true,
    },
  })
}

export async function getVoucherByVoucherCode(voucherCode: string) {
  return await db.voucher.findMany({
    where: { voucherCode: voucherCode },
    select: {
      id: true,
      name: true,
      voucherCode: true,
      discountPercentage: true,
      discountMax: true,
      voucherAmount: true,
      description: true,
      expiration: true,
      active: true,
      createdAt: true,
      updatedAt: true,
    },
  })
}

export async function updateVoucher(
  voucherId: string,
  data: UpdateVoucherInput,
) {
  return await db.voucher.update({
    where: { id: voucherId },
    data,
  })
}

export async function searchVouchers(searchVoucherQuery: string) {
  return await db.voucher.findMany({
    where: {
      name: {
        search: searchVoucherQuery.split(" ").join(" & "),
      },
      voucherCode: {
        search: searchVoucherQuery.split(" ").join(" & "),
      },
    },
    select: {
      id: true,
      name: true,
      voucherCode: true,
      discountPercentage: true,
      discountMax: true,
      voucherAmount: true,
      description: true,
      expiration: true,
      active: true,
      createdAt: true,
      updatedAt: true,
    },
  })
}

export async function deleteVoucherById(voucherId: string) {
  return await db.voucher.delete({
    where: {
      id: voucherId,
    },
  })
}

export async function getTotalVouchers() {
  return await db.voucher.count()
}
