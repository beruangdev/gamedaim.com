import * as React from "react"

import { Avatar } from "./Avatar"
import { cn } from "@/utils/classname"
import { getValidChildren } from "@/utils/children"

export interface AvatarGroupProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "children"> {
  children: React.ReactNode
  max?: number
}

export const AvatarGroup: React.FunctionComponent<AvatarGroupProps> = (
  props,
) => {
  const { children, max, className, ...rest } = props

  const validChildren = getValidChildren(children)
  const childrenWithinMax = max ? validChildren.slice(0, max) : validChildren
  const excess = max != null && validChildren.length - max
  const reversedChildren = childrenWithinMax.reverse()

  const clones = reversedChildren.map((child, index) => {
    let isFirstAvatar = index === 0
    return React.cloneElement(child, {
      className: cn(child.props.className, isFirstAvatar ? "mr-0" : "-mr-3"),
      bordered: true,
    })
  })

  return (
    <div role="group" className={className} {...rest}>
      {excess && <Avatar className="-ml-3" />}
      {clones}
    </div>
  )
}
