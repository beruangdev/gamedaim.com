"use client"

import * as React from "react"
import NextLink from "next/link"
import {
  HiOutlineViewGrid,
  HiOutlineLogin,
  HiOutlineLogout,
  HiOutlineUser,
  HiOutlineCog,
} from "react-icons/hi"
import { Button } from "ui"

import { useAuthStore } from "@/store/auth"

export const UserMenu = () => {
  const { isAuthenticated, logout, auth } = useAuthStore()

  const [openUserMenu, setOpenUserMenu] = React.useState<boolean>(false)
  const [isHydrated, setIsHydrated] = React.useState<boolean>(false)

  React.useEffect(() => {
    setIsHydrated(true)
  }, [])

  function toggleMenu() {
    setOpenUserMenu((prev) => !prev)
  }

  return (
    <div className="dark:bg-inherit">
      <div className="relative">
        <Button
          aria-label="User Menu"
          onClick={toggleMenu}
          variant="ghost"
          className="flex items-center p-0 text-sm focus:outline-none"
        >
          <HiOutlineUser className="h-5 w-5" />
        </Button>
        {openUserMenu && (
          <div className="dark:bg-theme-800 absolute right-0 z-10 mt-2 w-48 rounded-md bg-white shadow-lg">
            {isHydrated && isAuthenticated ? (
              <>
                <NextLink
                  className="text-theme-700 hover:bg-theme-100 dark:hover:bg-theme-700 block px-4 py-2 text-sm"
                  href={`/user/${auth.user?.username}`}
                >
                  <Button aria-label="Profile" variant="ghost" className="p-0">
                    <HiOutlineUser className="mr-2 h-5 w-5" /> Profile
                  </Button>
                </NextLink>
                <NextLink
                  className="text-theme-700 hover:bg-theme-100 dark:hover:bg-theme-700 block px-4 py-2 text-sm"
                  href="/setting/user/profile"
                >
                  <Button aria-label="Setting" variant="ghost" className="p-0">
                    <HiOutlineCog className="mr-2 h-5 w-5" /> Setting
                  </Button>
                </NextLink>
                {auth.user?.role !== "USER" && (
                  <NextLink
                    className="text-theme-700 hover:bg-theme-100 dark:hover:bg-theme-700 block px-4 py-2 text-sm"
                    href="/dashboard"
                  >
                    <Button
                      aria-label="Dashboard"
                      variant="ghost"
                      className="p-0"
                    >
                      <HiOutlineViewGrid className="mr-2 h-5 w-5" />
                      Dashboard
                    </Button>
                  </NextLink>
                )}
                <div className="text-theme-700 hover:bg-theme-100 dark:hover:bg-theme-700 block cursor-pointer px-4 py-2 text-sm">
                  <Button
                    aria-label="Log Out"
                    className="p-0"
                    variant="ghost"
                    onClick={() => logout()}
                  >
                    <HiOutlineLogout className="mr-2 h-5 w-5" /> Log Out
                  </Button>
                </div>
              </>
            ) : (
              <NextLink
                className="text-theme-700 hover:bg-theme-100 dark:hover:bg-theme-700 block px-4 py-2 text-sm"
                href="/auth/login"
              >
                <Button aria-label="Log In" variant="ghost" className="p-0">
                  <HiOutlineLogin className="mr-2 h-5 w-5" /> Log In
                </Button>
              </NextLink>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
