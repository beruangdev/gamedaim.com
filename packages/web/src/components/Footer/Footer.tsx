// TODO: get address, logo url, site title, support email, etc from db.

import * as React from "react"
import NextLink from "next/link"

import env from "env"
import { Icon } from "@/components/UI/Icon"
import { Logo } from "@/components/Brand"
import { MenuDataProps } from "@/lib/data-types"

interface FooterProps {
  className?: string
  menusFooterAll?: MenuDataProps[] | null
  menusFooterByLang?: MenuDataProps[] | null
}

export const Footer = React.forwardRef<HTMLDivElement, FooterProps>(
  (props, ref) => {
    const { menusFooterAll, menusFooterByLang, className, ...rest } = props

    const currentYear = new Date().getFullYear()

    return (
      <footer
        className={`${className} bg-background/70 border-border relative mt-12 flex flex-col border border-t`}
        ref={ref}
        {...rest}
      >
        <div className="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8">
          <div className="flex flex-col md:flex-row lg:px-8">
            <div className="mb-6 w-5/12 md:mb-0 lg:mr-3">
              <NextLink
                aria-label="Go To Homepage"
                className="self-center pl-4"
                href="/"
              >
                <Logo />
              </NextLink>
              <ul className="text-foreground/80 mt-8 flex flex-col space-y-2 font-medium">
                <li className="inline-flex">
                  <Icon.Location className="mr-2 h-6 w-6" />
                  <span>{env.ADDRESS}</span>
                </li>
                <li className="inline-flex">
                  <Icon.Email className="mr-2 h-4 w-4" />
                  <NextLink href={`mailto:${env.SUPPORT_EMAIL}`}>
                    <span>{env.SUPPORT_EMAIL}</span>
                  </NextLink>
                </li>
                <li className="inline-flex">
                  <Icon.WhatsApp className="mr-2 h-4 w-4" />
                  <NextLink
                    href={`https://api.whatsapp.com/send?phone=${env.WHATSAPP_NUMBER}`}
                  >
                    <span>{`+${env.WHATSAPP_NUMBER}`}</span>
                  </NextLink>
                </li>
              </ul>
            </div>
            <div className="w-7/12">
              <div className="grid grid-cols-1 gap-8 sm:grid-cols-4 sm:gap-6">
                <div>
                  <ul className="text-foreground/80 space-y-2 font-medium">
                    {menusFooterAll?.map((menu) => {
                      if (menu.active) {
                        return (
                          <li>
                            <NextLink
                              href={menu.link}
                              className="hover:underline"
                            >
                              {menu.title}
                            </NextLink>
                          </li>
                        )
                      }
                      return
                    })}
                  </ul>
                </div>
                <div>
                  <ul className="text-foreground/80 space-y-2 font-medium">
                    {menusFooterByLang?.map((menu) => {
                      if (menu.active) {
                        return (
                          <li>
                            <NextLink
                              href={menu.link}
                              className="hover:underline"
                            >
                              {menu.title}
                            </NextLink>
                          </li>
                        )
                      }
                      return
                    })}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="border-border flex min-h-[60px] border border-t">
          <div className="w-full self-center pl-4">{`© ${currentYear} ${env.SITE_TITLE}`}</div>
        </div>
      </footer>
    )
  },
)
