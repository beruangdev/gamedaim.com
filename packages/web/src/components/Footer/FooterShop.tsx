// TODO: get address, logo url, site title, support email, etc from db.

import * as React from "react"
import NextLink from "next/link"

import env from "env"
import { Icon } from "@/components/UI/Icon"

interface FooterProps {
  className?: string
}

export const FooterShop = React.forwardRef<HTMLDivElement, FooterProps>(
  (props, ref) => {
    const { className, ...rest } = props

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
                <div className="relative h-[23px] w-[120px]">
                  <Icon.GamedaimShop />
                </div>
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
                  <h2 className="text-foreground mb-6 text-sm font-semibold uppercase">
                    Sitemap
                  </h2>
                  <ul className="text-foreground/80 space-y-2 font-medium">
                    <li>
                      <NextLink href="/" className="hover:underline">
                        Home
                      </NextLink>
                    </li>
                    <li>
                      <NextLink href="/auth/login" className="hover:underline">
                        Login
                      </NextLink>
                    </li>
                    <li>
                      <NextLink href="/auth/signup" className="hover:underline">
                        Signup
                      </NextLink>
                    </li>
                    <li>
                      <NextLink href="/article" className="hover:underline">
                        Article
                      </NextLink>
                    </li>
                    <li>
                      <NextLink href="/download" className="hover:underline">
                        Download
                      </NextLink>
                    </li>
                    <li>
                      <NextLink href="/shop" className="hover:underline">
                        Shop
                      </NextLink>
                    </li>
                    <li>
                      <NextLink
                        href="/shop/top-up/transactions"
                        className="hover:underline"
                      >
                        Check Transaction
                      </NextLink>
                    </li>
                  </ul>
                </div>
                <div>
                  <h2 className="text-foreground mb-6 text-sm font-semibold uppercase">
                    Support
                  </h2>
                  <ul className="text-foreground/80 space-y-2 font-medium">
                    <li>
                      <NextLink
                        href={`mailto:${env.SUPPORT_EMAIL}`}
                        className="hover:underline"
                      >
                        Email
                      </NextLink>
                    </li>
                    <li>
                      <NextLink
                        href={`https://api.whatsapp.com/send?phone=${env.WHATSAPP_NUMBER}`}
                        className="hover:underline"
                      >
                        WhatsApp
                      </NextLink>
                    </li>
                  </ul>
                </div>
                <div>
                  <h2 className="text-foreground mb-6 text-sm font-semibold uppercase">
                    Legal
                  </h2>
                  <ul className="text-foreground/80 space-y-2 font-medium">
                    <li>
                      <NextLink href="/contact" className="hover:underline">
                        Contact
                      </NextLink>
                    </li>
                    <li>
                      <NextLink href="/privacy" className="hover:underline">
                        Privacy Policy
                      </NextLink>
                    </li>
                    <li>
                      <a href="/tos" className="hover:underline">
                        Terms &amp; Conditions
                      </a>
                    </li>
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
