"use client"

import * as React from "react"
import NextLink from "next/link"
import useSWR from "swr"
import env from "env"

import { Icon } from "@/components/UI/Icon"
import { wpGetMenusByName } from "@/lib/api/server/wp-menus"
import { useParams } from "next/navigation"
import { splitUriMenuWP } from "@/utils/helper"

interface SideNavProps {
  isMain: boolean
}

export function SideNav(props: SideNavProps) {
  const { isMain, ...rest } = props
  const params = useParams()

  const stylesIcons = "inline-block text-base mr-2"
  const { data: primaryMenu } = useSWR("wp-primary-menu", () =>
    wpGetMenusByName(
      params.locale === "id" ? env.MENU_PRIMARY : env.EN_MENU_PRIMARY,
    ),
  )

  return (
    <nav className="relative flex w-full flex-col" {...rest}>
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
        {primaryMenu?.menu &&
          primaryMenu.menu.map((menu: { url: string; label: string }) => {
            const icon = getIcons(menu.label, stylesIcons)
            const url = splitUriMenuWP(menu.url)

            return (
              <li key={menu.label}>
                <NextLink
                  aria-label={menu.label}
                  href={url}
                  className="flex transform flex-row items-center transition-transform duration-200 ease-in hover:translate-x-2"
                >
                  <p className="hover:text-primary inline-flex items-center font-bold">
                    {icon} {menu.label}
                  </p>
                </NextLink>
              </li>
            )
          })}
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
}

function getIcons(item: string, styles: string | undefined) {
  switch (item) {
    case "Trending":
      return <Icon.Article aria-label="Trending" className={styles} />
    case "Popular":
      return <Icon.Update aria-label="Popular" className={styles} />
    case "Berita":
      return <Icon.News aria-label="Berita" className={styles} />
    case "Esports":
      return <Icon.Trophy aria-label="Esports" className={styles} />
    case "Tips":
      return <Icon.Coffe aria-label="Tips" className={styles} />
    case "Review":
      return <Icon.Star aria-label="Review" className={styles} />
    case "G List":
      return <Icon.ListOl aria-label="G List" className={styles} />
    case "Tutorial":
      return <Icon.CheckSquare aria-label="Tutorial" className={styles} />
    default:
      break
  }
}
