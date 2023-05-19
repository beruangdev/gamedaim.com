"use client"

import * as React from "react"

import {
  Avatar as InternalAvatar,
  AvatarProps,
  AvatarImage,
  AvatarFallback,
} from "./Avatar"

import { AvatarGroup } from "./AvatarGroup"

interface Avatar
  extends React.ForwardRefExoticComponent<
    AvatarProps & React.RefAttributes<HTMLDivElement>
  > {
  Image: typeof AvatarImage
  Fallback: typeof AvatarFallback
  Group: typeof AvatarGroup
}

const Avatar = InternalAvatar as Avatar

Avatar.Image = AvatarImage
Avatar.Fallback = AvatarFallback
Avatar.Group = AvatarGroup

export { Avatar, AvatarImage, AvatarFallback, AvatarGroup }
export type { AvatarProps }
