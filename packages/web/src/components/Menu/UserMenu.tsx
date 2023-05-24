"use client"

import * as React from "react"
import NextLink from "next/link"
import { useRouter } from "next/navigation"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/UI/DropdownMenu"
import { IconButton } from "@/components/UI/Button"
import { Icon } from "@/components/UI/Icon"
import { useCurrentUser } from "@/hooks/use-current-user"
import { useLogout } from "@/hooks/use-logout"

export const UserMenu = () => {
  const router = useRouter()
  const { user: currentUser } = useCurrentUser()
  const { logout } = useLogout()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <IconButton aria-label="User Menu" variant="ghost">
          <Icon.Person className="h-5 w-5" />
        </IconButton>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="bg-background w-56">
        {currentUser ? (
          <>
            <DropdownMenuItem asChild>
              <NextLink href={`/user/${currentUser.user?.username}`}>
                <Icon.Person className="mr-2 h-5 w-5" /> Profile
              </NextLink>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <NextLink href="/setting/user/profile">
                <Icon.Settings className="mr-2 h-5 w-5" /> Setting
              </NextLink>
            </DropdownMenuItem>
            {currentUser.user?.role !== "USER" && (
              <DropdownMenuItem asChild>
                <NextLink href="/dashboard">
                  <Icon.Dashboard className="mr-2 h-5 w-5" />
                  Dashboard
                </NextLink>
              </DropdownMenuItem>
            )}
            <DropdownMenuItem asChild>
              <div
                aria-label="Log Out"
                onClick={() => {
                  logout()

                  router.push("/auth/login")
                }}
              >
                <Icon.Logout className="mr-2 h-5 w-5" /> Log Out
              </div>
            </DropdownMenuItem>
          </>
        ) : (
          <DropdownMenuItem asChild>
            <NextLink href="/auth/login">
              <Icon.Login className="mr-2 h-5 w-5" /> Log In
            </NextLink>
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
