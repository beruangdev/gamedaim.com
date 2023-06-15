import * as React from "react"

import { ShareButton, ShareButtonProps } from "./ShareButton"
import { Icon } from "../UI/Icon"

export const ShareButtonTwitter = React.forwardRef<
  HTMLDivElement,
  ShareButtonProps
>((props, ref) => {
  const { url, onClick, text, sharetext, ...rest } = props

  return (
    <ShareButton
      className="bg-[#1DA1F2]"
      onClick={onClick}
      icon={<Icon.Twitter aria-label="Twitter" />}
      text={text || "Twitter"}
      sharetext={sharetext}
      url={`https://twitter.com/intent/tweet/?text=${encodeURI(
        sharetext as string,
      )}&url=${encodeURI(url as string)}`}
      ref={ref}
      {...rest}
    />
  )
})
