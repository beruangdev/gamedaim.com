"use client"

import * as React from "react"

import { ShareButton, ShareButtonProps } from "./ShareButton"
import { Icon } from "@/components/UI/Icon"

export const ShareButtonTelegram = React.forwardRef<
  HTMLDivElement,
  ShareButtonProps
>((props, ref) => {
  const { url, onClick, text, message, ...rest } = props

  return (
    <ShareButton
      onClick={onClick}
      icon={<Icon.Telegram aria-label="Telegram" />}
      text={text || "Telegram"}
      url={
        "https://telegram.me/share/url?text=" +
        encodeURI(message as string) +
        "&url=" +
        encodeURI(url as string)
      }
      message={message}
      ref={ref}
      {...rest}
    />
  )
})
