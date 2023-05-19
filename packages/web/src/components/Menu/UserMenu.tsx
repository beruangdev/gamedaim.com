"use client"

import * as React from "react"
import NextLink from "next/link"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  IconButton,
  Icon,
} from "ui"

import { useAuthStore } from "@/store/auth"

export const UserMenu = () => {
  const { isAuthenticated, logout, auth } = useAuthStore()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <IconButton aria-label="User Menu" variant="ghost">
          <Icon.Person className="h-5 w-5" />
        </IconButton>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="bg-background w-56">
        {isAuthenticated ? (
          <>
            <DropdownMenuItem asChild>
              <NextLink href={`/user/${auth.user?.username}`}>
                <Icon.Person className="mr-2 h-5 w-5" /> Profile
              </NextLink>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <NextLink href="/setting/user/profile">
                <Icon.Settings className="mr-2 h-5 w-5" /> Setting
              </NextLink>
            </DropdownMenuItem>
            {auth.user?.role !== "USER" && (
              <DropdownMenuItem asChild>
                <NextLink href="/dashboard">
                  <Icon.Dashboard className="mr-2 h-5 w-5" />
                  Dashboard
                </NextLink>
              </DropdownMenuItem>
            )}
            <DropdownMenuItem asChild>
              <div aria-label="Log Out" onClick={() => logout()}>
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
