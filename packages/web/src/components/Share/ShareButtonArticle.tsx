import * as React from "react"

import {
  ShareButtonFacebook,
  ShareButtonTwitter,
  ShareButtonWhatsApp,
  ShareButtonEmail,
} from "."

interface ShareButtonArticleProps {
  url: string
  text?: string | null
  media?: string | null
}

export const ShareButtonArticle = (props: ShareButtonArticleProps) => {
  const { url, text } = props
  return (
    <>
      <ShareButtonFacebook url={url} />
      <ShareButtonTwitter url={url} sharetext={text} />
      <ShareButtonEmail url={url} subject={text} />
      <ShareButtonWhatsApp message={text} url={url} />
    </>
  )
}
