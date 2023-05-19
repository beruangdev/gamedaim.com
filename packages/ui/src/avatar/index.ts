"use client"

import * as React from "react"

import {
  Avatar as InternalAvatar,
  AvatarProps,
  AvatarImage,
  AvatarFallback,
} from "./avatar"

interface Avatar
  extends React.ForwardRefExoticComponent<
    AvatarProps & React.RefAttributes<HTMLDivElement>
  > {
  Image: typeof AvatarImage
  Fallback: typeof AvatarFallback
}

const Avatar = InternalAvatar as Avatar

Avatar.Image = AvatarImage
Avatar.Fallback = AvatarFallback

export { Avatar, AvatarImage, AvatarFallback }
export type { AvatarProps }
