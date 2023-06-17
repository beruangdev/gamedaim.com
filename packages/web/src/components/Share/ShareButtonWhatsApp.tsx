import * as React from "react"

import { Icon } from "@/components/UI/Icon"

import { ShareButton, ShareButtonProps } from "./ShareButton"

export const ShareButtonWhatsApp = React.forwardRef<
  HTMLDivElement,
  ShareButtonProps
>((props, ref) => {
  const { url, onClick, text, message, ...rest } = props

  return (
    <ShareButton
      className="bg-[#22C35E]"
      onClick={onClick}
      icon={<Icon.WhatsApp aria-label="Whatsapp" />}
      message={message}
      text={text || "WhatsApp"}
      url={
        "whatsapp://send?text=" +
        encodeURI(message as string) +
        "%20" +
        encodeURI(url as string)
      }
      ref={ref}
      {...rest}
    />
  )
})
