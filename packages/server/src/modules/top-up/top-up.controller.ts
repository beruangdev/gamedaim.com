import { FastifyReply, FastifyRequest } from "fastify"

import { digiflazz } from "@/utils/digiflazz"
import {
  TopUpDigiflazzCratePlnCheckInput,
  TopUpDigiflazzCreateDepositInput,
  TopUpDigiflazzCreateTransactionInput,
} from "./top-up.schema"
import { getPriceListByKey, savePriceList } from "./top-up.service"

export async function topUpDigiflazzCheckBalanceHandler(
  _request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    const balance = await digiflazz.cekSaldo()

    return reply.code(201).send(balance)
  } catch (e) {
    console.log(e)
    return reply.code(500).send(e)
  }
}

export async function topUpDigiflazzPriceListPrePaidHandler(
  _request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    const priceList = (await digiflazz.daftarHarga("prepaid")) as {
      data: string
    }

    if (Array.isArray(priceList.data)) {
      await savePriceList({
        key: "digiflazzTopUpListPricePrePaid",
        value: priceList.data,
      })
    }

    const savedPriceList = await getPriceListByKey(
      "digiflazzTopUpListPricePrePaid",
    )

    return reply.code(201).send(savedPriceList)
  } catch (e) {
    console.log(e)
    return reply.code(500).send(e)
  }
}

export async function topUpDigiflazzListPostPaidHandler(
  _request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    const priceList = (await digiflazz.daftarHarga("pasca")) as { data: string }

    if (Array.isArray(priceList.data)) {
      await savePriceList({
        key: "topUpListPricePostPaid",
        value: priceList.data,
      })
    }

    const savedPriceList = await getPriceListByKey("topUpListPricePostPaid")

    return reply.code(201).send(savedPriceList)
  } catch (e) {
    console.log(e)
    return reply.code(500).send(e)
  }
}

export async function topUpDigiflazzDepositHandler(
  request: FastifyRequest<{
    Body: TopUpDigiflazzCreateDepositInput
  }>,
  reply: FastifyReply,
) {
  try {
    const { amount, bank, name } = request.body

    const deposit = await digiflazz.deposit({ amount, bank, name })

    return reply.code(201).send(deposit)
  } catch (e) {
    console.log(e)
    return reply.code(500).send(e)
  }
}

export async function topUpDigiflazzTransactionHandler(
  request: FastifyRequest<{
    Body: TopUpDigiflazzCreateTransactionInput
  }>,
  reply: FastifyReply,
) {
  try {
    const { sku, customerNo, refId, cmd, testing, msg } = request.body

    const deposit = await digiflazz.transaksi({
      sku,
      customerNo,
      refId,
      cmd,
      testing,
      msg,
    })

    return reply.code(201).send(deposit)
  } catch (e) {
    console.log(e)
    return reply.code(500).send(e)
  }
}

export async function topUpDigiflazzPlnCheckHandler(
  request: FastifyRequest<{
    Body: TopUpDigiflazzCratePlnCheckInput
  }>,
  reply: FastifyReply,
) {
  try {
    const { customerNo } = request.body

    const deposit = await digiflazz.cekIdPln(customerNo)

    return reply.code(201).send(deposit)
  } catch (e) {
    console.log(e)
    return reply.code(500).send(e)
  }
}
