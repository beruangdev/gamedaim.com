import db from "@/utils/db"
import { CreateViewCounterInput } from "./view-counter.schema"

export async function createOrUpdateViewCounter(data: CreateViewCounterInput) {
  const { slug } = data
  return await db.viewCounter.upsert({
    where: { slug: slug },
    update: {
      views: { increment: 1 },
    },
    create: {
      slug: slug,
      views: 1,
    },
  })
}

export async function getViewCounters() {
  return await db.viewCounter.findMany({
    orderBy: {
      createdAt: "asc",
    },
  })
}

export async function getViewCounterBySlug(viewCounterSlug: string) {
  return await db.viewCounter.findUnique({
    where: { slug: viewCounterSlug },
  })
}
