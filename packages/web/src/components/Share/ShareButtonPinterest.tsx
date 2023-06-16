import * as React from "react"

import { Icon } from "@/components/UI/Icon"
import { ShareButton, ShareButtonProps } from "./ShareButton"

export const ShareButtonPinterest = React.forwardRef<
  HTMLDivElement,
  ShareButtonProps
>((props, ref) => {
  const { url, onClick, text, sharetext, mediaSrc, ...rest } = props

  return (
    <ShareButton
      className="bg-[#C61F26]"
      onClick={onClick}
      icon={<Icon.Pinterest aria-label="Telegram" />}
      text={text || "Pinterest"}
      url={`https://pinterest.com/pin/create/button/?url=${encodeURI(
        url as string,
      )}&media=${encodeURI(mediaSrc as string)}&description=${encodeURI(
        sharetext as string,
      )}`}
      ref={ref}
      {...rest}
    />
  )
})
