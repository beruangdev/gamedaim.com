import * as React from "react"
import { Metadata } from "next"
import { EditMediaDashboard } from "./form"
import { getMediaByIdAction } from "@/lib/api/server/media"
import { notFound } from "next/navigation"

export const metadata: Metadata = {
  title: "Media Dashboard",
  description: "Media Dashboard",
}

export default async function MediasDashboard({
  params,
}: {
  params: { id: string }
}) {
  const { id } = params
  const { data } = await getMediaByIdAction(id)
  if (!data) {
    notFound()
  }
  return (
    <>
      <EditMediaDashboard mediaId={id} />
    </>
  )
}
