"use client"

import * as React from "react"
import NextLink from "next/link"
import { Icon, IconButton } from "ui"

import { Logo } from "@/components/Brand"
import { SearchNavbar } from "@/components/Search"
import { UserMenu } from "@/components/Menu"
import { ThemeSwitcher } from "@/components/Theme"

interface TopNavProps extends React.HTMLAttributes<HTMLDivElement> {}

export const TopNav = React.forwardRef<HTMLDivElement, TopNavProps>(
  ({ ...rest }, ref) => {
    const [searchVisibility, setSearchVisibility] = React.useState(false)

    React.useEffect(() => {
      if (searchVisibility) {
        const el: HTMLInputElement | null = document.querySelector(
          'input[type="search"]',
        )
        if (el) {
          el.focus()
        }
      }
    }, [searchVisibility])

    return (
      <>
        <nav
          className="bg-background border-border opacity-1 z-90 fixed left-auto top-0 -my-0 mx-auto box-border flex h-16 w-full items-center border-none px-4 py-0 align-baseline shadow-sm outline-none"
          ref={ref}
          {...rest}
        >
          <div className="container mx-auto flex flex-wrap items-center justify-between">
            <div className="flex flex-row">
              <NextLink
                aria-label="Home"
                href="/"
                className="text-foreground flex items-center"
              >
                <Logo />
              </NextLink>
            </div>
            <div className="flex justify-center">
              <IconButton
                variant="ghost"
                aria-label="Search"
                onClick={() => setSearchVisibility((prev) => !prev)}
              >
                <Icon.Search className="h-5 w-5" />
              </IconButton>
              <UserMenu />
              <ThemeSwitcher />
            </div>
          </div>
          <SearchNavbar
            hideSearchVisibility={() => {
              setSearchVisibility(false)
            }}
            searchVisibility={searchVisibility}
          />
        </nav>
      </>
    )
  },
)
