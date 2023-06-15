import * as React from "react"

import { ShareButton, ShareButtonProps } from "./ShareButton"
import { Icon } from "../UI/Icon"

export const ShareButtonLinkedIn = React.forwardRef<
  HTMLDivElement,
  ShareButtonProps
>((props, ref) => {
  const { url, onClick, text, ...rest } = props

  return (
    <ShareButton
      className="bg-[#00A0DC]"
      onClick={onClick}
      icon={<Icon.Linkedin aria-label="LinkedIn" />}
      text={text || "LinkedIn"}
      url={
        "https://www.linkedin.com/shareArticle?mini=true&url=" +
        encodeURI(url as string) +
        "&title=" +
        encodeURI(text as string) +
        "&summary=" +
        encodeURI(text as string) +
        "&source=" +
        encodeURI(url as string)
      }
      ref={ref}
      {...rest}
    />
  )
})
