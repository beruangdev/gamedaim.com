"use client"

import * as React from "react"
import NextLink from "next/link"
import { HiOutlineMenuAlt2, HiOutlineSearch } from "react-icons/hi"
import {
  Button,
  IconButton,
  Drawer,
  DrawerTrigger,
  DrawerContent,
} from "@dafunda-ui-test/react"

import { Logo } from "@/components/Brand"
import { SearchNavbar } from "@/components/Search"
import { UserMenu } from "@/components/Menu"

interface TopNavProps extends React.HTMLAttributes<HTMLDivElement> { }

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
          className="bg-background border-border opacity-1 fixed left-auto top-0 z-[99] -my-0 mx-auto box-border flex h-16 w-full items-center border-none px-4 py-0 align-baseline shadow-sm outline-none"
          ref={ref}
          {...rest}
        >
          <div className="container mx-auto flex flex-wrap items-center justify-between">
            <div className="flex lg:hidden">
              <Drawer>
                <DrawerTrigger asChild>
                  <Button>
                    <HiOutlineMenuAlt2 />
                  </Button>
                </DrawerTrigger>
                <DrawerContent position="left" size="sm">
                  <div className="my-4 flex flex-col pt-2">
                    <NextLink href="/">
                      <Button variant="ghost">Home</Button>
                    </NextLink>
                    <NextLink href="/article">
                      <Button variant="ghost">Article</Button>
                    </NextLink>
                    <NextLink href="/topic">
                      <Button variant="ghost">Topic</Button>
                    </NextLink>
                  </div>
                </DrawerContent>
              </Drawer>
            </div>
            <div className="flex flex-row">
              <NextLink
                aria-label="Home"
                href="/"
                className="text-foreground flex items-center"
              >
                <Logo />
              </NextLink>
              <div className="ml-4 hidden  md:flex">
                <NextLink href="/article">
                  <Button variant="ghost">Article</Button>
                </NextLink>
                <NextLink href="/topic">
                  <Button variant="ghost">Topic</Button>
                </NextLink>
              </div>
            </div>
            <div className="flex justify-center">
              <IconButton
                variant="ghost"
                aria-label="Search"
                onClick={() => setSearchVisibility((prev) => !prev)}
              >
                <HiOutlineSearch className="h-5 w-5" />
              </IconButton>
              <UserMenu />
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
