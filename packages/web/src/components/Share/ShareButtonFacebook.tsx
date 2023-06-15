import * as React from "react"

import { ShareButton, ShareButtonProps } from "./ShareButton"
import { Icon } from "@/components/UI/Icon"

export const ShareButtonFacebook = React.forwardRef<
  HTMLDivElement,
  ShareButtonProps
>((props, ref) => {
  const { url, onClick, text, ...rest } = props

  return (
    <ShareButton
      className="bg-[#314E89]"
      onClick={onClick}
      icon={<Icon.Facebook aria-label="Facebook" />}
      url={`https://facebook.com/sharer/sharer.php?u=${encodeURI(
        url as string,
      )}`}
      text={text || "Facebook"}
      ref={ref}
      {...rest}
    />
  )
})
