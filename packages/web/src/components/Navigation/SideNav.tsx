"use client"

import * as React from "react"
import NextLink from "next/link"

import { Icon } from "@/components/UI/Icon"
import { Image } from "@/components/Image"
import { MenuDataProps } from "@/lib/data-types"

interface SideNavProps {
  isMain: boolean
  menuSideBarAll?: MenuDataProps[] | null
  menuSideBarByLang?: MenuDataProps[] | null
  menuSideBarShopAll?: MenuDataProps[] | null
  menuSideBarShopByLang?: MenuDataProps[] | null
}

export function SideNav(props: SideNavProps) {
  const {
    isMain,
    menuSideBarAll,
    menuSideBarByLang,
    menuSideBarShopAll,
    menuSideBarShopByLang,
    ...rest
  } = props

  const stylesIcons = "inline-block text-base mr-2"

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
        {isMain && (
          <>
            {menuSideBarAll?.map((menu) => {
              if (menu.active) {
                return (
                  <li key={menu.id}>
                    <NextLink
                      aria-label={menu.title}
                      href={menu.link}
                      className="flex transform flex-row items-center transition-transform duration-200 ease-in hover:translate-x-2"
                    >
                      {menu.icon && menu.icon.includes("http") && (
                        <div className="relative mr-2 aspect-[1/1] h-5 w-5 overflow-hidden rounded bg-transparent">
                          <Image
                            src={menu.icon}
                            alt={menu.title}
                            sizes={`(max-width: 1200px) 16px, 16px`}
                          />
                        </div>
                      )}
                      <p className="hover:text-primary inline-flex items-center font-bold">
                        {menu.title}
                      </p>
                    </NextLink>
                  </li>
                )
              }
              return
            })}
          </>
        )}
        {!isMain && (
          <>
            {menuSideBarShopAll?.map((menu) => {
              if (menu.active) {
                return (
                  <li key={menu.id}>
                    <NextLink
                      aria-label={menu.title}
                      href={menu.link}
                      className="flex transform flex-row items-center transition-transform duration-200 ease-in hover:translate-x-2"
                    >
                      {menu.icon && menu.icon.includes("http") && (
                        <div className="relative mr-2 aspect-[1/1] h-5 w-5 overflow-hidden rounded bg-transparent">
                          <Image
                            src={menu.icon}
                            alt={menu.title}
                            sizes={`(max-width: 1200px) 16px, 16px`}
                          />
                        </div>
                      )}
                      <p className="hover:text-primary inline-flex items-center font-bold">
                        {menu.title}
                      </p>
                    </NextLink>
                  </li>
                )
              }
              return
            })}
          </>
        )}
        {isMain &&
          menuSideBarByLang?.map((menu) => {
            if (menu.active) {
              return (
                <li key={menu.id}>
                  <NextLink
                    aria-label={menu.title}
                    href={menu.link}
                    className="flex transform flex-row items-center transition-transform duration-200 ease-in hover:translate-x-2"
                  >
                    {menu.icon && menu.icon.includes("http") && (
                      <div className="relative mr-2 aspect-[1/1] h-5 w-5 overflow-hidden rounded bg-transparent">
                        <Image
                          src={menu.icon}
                          alt={menu.title}
                          sizes={`(max-width: 1200px) 16px, 16px`}
                        />
                      </div>
                    )}
                    <p className="hover:text-primary inline-flex items-center font-bold">
                      {menu.title}
                    </p>
                  </NextLink>
                </li>
              )
            }
            return
          })}
        {!isMain &&
          menuSideBarShopByLang?.map((menu) => {
            if (menu.active) {
              return (
                <li key={menu.id}>
                  <NextLink
                    aria-label={menu.title}
                    href={menu.link}
                    className="flex transform flex-row items-center transition-transform duration-200 ease-in hover:translate-x-2"
                  >
                    {menu.icon && menu.icon.includes("http") && (
                      <div className="relative mr-2 aspect-[1/1] h-5 w-5 overflow-hidden rounded bg-transparent">
                        <Image
                          src={menu.icon}
                          alt={menu.title}
                          sizes={`(max-width: 1200px) 16px, 16px`}
                        />
                      </div>
                    )}
                    <p className="hover:text-primary inline-flex items-center font-bold">
                      {menu.title}
                    </p>
                  </NextLink>
                </li>
              )
            }
            return
          })}
      </ul>
      <ul className="border-theme-100 dark:border-theme-700 flex flex-col space-y-3 border-b p-4">
        <li>
          <NextLink
            aria-label="Article"
            href="/article"
            className="flex transform flex-row items-center transition-transform duration-200 ease-in hover:translate-x-2"
          >
            <p className="hover:text-primary-400 inline-flex items-center font-bold">
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
