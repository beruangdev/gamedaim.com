import * as React from "react"
import { Metadata } from "next"
import { EditMediaDashboard } from "./form"
import { getMediaByIdAction } from "@/lib/api/server/media"
import { notFound } from "next/navigation"

export const metadata: Metadata = {
  title: "Media Dashboard",
  description: "Media Dashboard",
  robots: {
    index: false,
    follow: true,
    nocache: true,
    googleBot: {
      index: false,
      follow: false,
      noimageindex: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
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
