import { FastifyReply, FastifyRequest } from "fastify"

import { CreateViewCounterInput } from "./view-counter.schema"
import {
  createOrUpdateViewCounter,
  getViewCounterBySlug,
  getViewCounters,
} from "./view-counter.service"

export async function createOrUpdateViewCounterHandler(
  request: FastifyRequest<{ Body: CreateViewCounterInput }>,
  reply: FastifyReply,
) {
  try {
    const { slug } = request.body

    const viewCounter = await createOrUpdateViewCounter({
      slug,
    })

    return reply.code(201).send(viewCounter)
  } catch (e) {
    console.log(e)
    return reply.code(500).send(e)
  }
}

export async function getViewCounterBySlugHandler(
  request: FastifyRequest<{ Params: { viewCounterSlug: string } }>,
  reply: FastifyReply,
) {
  try {
    const viewCounterSlug = request.params.viewCounterSlug
    const viewCounter = await getViewCounterBySlug(viewCounterSlug)
    return reply.code(201).send(viewCounter)
  } catch (e) {
    console.log(e)
    return reply.code(500).send(e)
  }
}

export async function getViewCountersHandler(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    const user = request.user
    if (user.role !== "ADMIN") {
      return reply.code(403).send({ message: "Unauthorized" })
    }

    const viewCounters = await getViewCounters()
    return reply.code(201).send(viewCounters)
  } catch (e) {
    console.log(e)
    return reply.code(500).send(e)
  }
}
