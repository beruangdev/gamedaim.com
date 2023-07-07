"use client"

import * as React from "react"

import { TopNavShop, SideNav } from "@/components/Navigation"
import { FooterShop } from "@/components/Footer"
import { useDisclosure } from "@/hooks/use-disclosure"
import { MenuDataProps } from "@/lib/data-types"

interface MainContainerProps {
  children: React.ReactNode
  menusByLang?: MenuDataProps[] | null
  menus?: MenuDataProps[] | null
  menusFooterShopAll?: MenuDataProps[] | null
  menusFooterShopByLang?: MenuDataProps[] | null
}

export const ShopContainer = React.forwardRef<
  HTMLDivElement,
  MainContainerProps
>((props, ref) => {
  const { isOpen, onToggle } = useDisclosure()

  const {
    children,
    menus,
    menusByLang,
    menusFooterShopAll,
    menusFooterShopByLang,
    ...rest
  } = props

  return (
    <div ref={ref} {...rest}>
      <TopNavShop toggleSideNav={onToggle} />
      <div>
        <div
          className={`${
            isOpen
              ? "max-md:translate-x-0 max-md:opacity-100 md:!-translate-x-full md:opacity-0"
              : "max-md:-translate-x-full max-md:opacity-0 md:translate-x-0 md:opacity-100"
          } scrollbar border- bg-background fixed top-0 z-20 flex h-full w-[250px] flex-row overflow-x-auto border-r pt-20 transition-[transform] delay-150 ease-in-out`}
        >
          <SideNav
            menuSideBarShopByLang={menusByLang}
            menuSideBarShopAll={menus}
            isMain={false}
          />
        </div>
        <div
          onClick={onToggle}
          className={`${
            isOpen ? "max-md:block md:hidden" : "hidden"
          } bg-foreground fixed bottom-0 top-0 z-[19] w-full opacity-80`}
        />
      </div>
      <div
        id="container"
        className={`mt-20 flex w-full ${
          isOpen ? "md:pl-0" : "md:pl-[250px]"
        } delay-150 ease-in-out`}
      >
        {children}
      </div>
      <FooterShop
        menusFooterShopAll={menusFooterShopAll}
        menusFooterShopByLang={menusFooterShopByLang}
        className={isOpen ? "md:pl-0" : "md:pl-[250px]"}
      />
    </div>
  )
})
