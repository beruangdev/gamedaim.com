import * as React from "react"
import NextLink from "next/link"
import { Icon } from "@/components/UI/Icon"

interface SideNavProps {
  isMain: boolean
}

export const SideNav = React.forwardRef<HTMLDivElement, SideNavProps>(
  (props, ref) => {
    const { isMain, ...rest } = props

    const stylesIcons = "inline-block text-base mr-2"

    return (
      <nav className="relative flex w-full flex-col" ref={ref} {...rest}>
        <ul className="border-muted flex flex-col space-y-3 border-b p-4">
          {!isMain && (
            <li>
              <NextLink
                aria-label="Go To Homepage"
                href="/"
                className="flex transform flex-row items-center transition-transform duration-200 ease-in hover:translate-x-2"
              >
                <p className="hover:text-primary inline-flex items-center font-bold">
                  {<Icon.Home aria-label="Home" className={stylesIcons} />}{" "}
                  {"Home"}
                </p>
              </NextLink>
            </li>
          )}
        </ul>
        <ul className="border-muted flex flex-col space-y-3 border-b p-4">
          <li>
            <NextLink
              aria-label="Article"
              href="/article"
              className="flex transform flex-row items-center transition-transform duration-200 ease-in hover:translate-x-2"
            >
              <p className="hover:text-primary inline-flex items-center font-bold">
                <Icon.Article aria-label="Article" className={stylesIcons} />{" "}
                Article
              </p>
            </NextLink>
          </li>
          <li>
            <NextLink
              aria-label="Download"
              href="/download"
              className="flex transform flex-row items-center transition-transform duration-200 ease-in hover:translate-x-2"
            >
              <p className="hover:text-primary inline-flex items-center font-bold">
                <Icon.Download aria-label="Download" className={stylesIcons} />
                Download
              </p>
            </NextLink>
          </li>
          <li>
            <NextLink
              aria-label="Shop"
              href="/shop"
              className="flex transform flex-row items-center transition-transform duration-200 ease-in hover:translate-x-2"
            >
              <p className="hover:text-primary inline-flex items-center font-bold">
                <Icon.Shop aria-label="Shop" className={stylesIcons} /> Shop
              </p>
            </NextLink>
          </li>
        </ul>
      </nav>
    )
  },
)
