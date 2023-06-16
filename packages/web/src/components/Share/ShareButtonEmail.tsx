import * as React from "react"

import { Icon } from "@/components/UI/Icon"
import { ShareButton, ShareButtonProps } from "./ShareButton"

export const ShareButtonEmail = React.forwardRef<
  HTMLDivElement,
  ShareButtonProps
>((props, ref) => {
  const { url, onClick, subject, text, ...rest } = props

  return (
    <ShareButton
      className="bg-foreground/80"
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
