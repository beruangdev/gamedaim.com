"use client"

import * as React from "react"

import { ShareButton, ShareButtonProps } from "./ShareButton"
import { Icon } from "../UI/Icon"

export const ShareButtonEmail = React.forwardRef<
  HTMLDivElement,
  ShareButtonProps
>((props, ref) => {
  const { url, onClick, subject, text, ...rest } = props

  return (
    <ShareButton
      className="bg-secondary"
      onClick={onClick}
      icon={<Icon.Email aria-label="Email" />}
      subject={subject}
      text={text || "Email"}
      url={`mailto:?subject=${encodeURI(subject as string)}&body=${encodeURI(
        url as string,
      )}`}
      ref={ref}
      {...rest}
    />
  )
})
