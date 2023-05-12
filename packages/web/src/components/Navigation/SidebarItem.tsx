import * as React from "react"
import NextLink from "next/link"

export interface SidebarItemProps extends React.HTMLAttributes<HTMLLIElement> {
  icon?: React.ReactNode | undefined
  children?: React.ReactNode
  badge?: string
  href?: string
  onClick?: () => void
}

export const SidebarItem = React.forwardRef<HTMLLIElement, SidebarItemProps>(
  (props, ref) => {
    const { icon, badge, children, href, onClick, ...rest } = props

    return (
      <li ref={ref} {...rest}>
        {href ? (
          <NextLink
            href={href}
            className="text-theme-800 hover:bg-theme-100 dark:hover:bg-theme-700 flex items-center rounded-lg p-2 text-base font-normal dark:text-white"
          >
            {icon}
            <span className="ml-5 flex-1 whitespace-nowrap">{children}</span>
            {badge && (
              <span className="bg-theme-200 text-theme-800 dark:bg-theme-700 dark:text-theme-300 ml-3 inline-flex items-center justify-center rounded-full px-2 text-sm font-medium">
                {badge}
              </span>
            )}
          </NextLink>
        ) : (
          <div
            className="text-theme-800 hover:bg-theme-100 dark:hover:bg-theme-700 flex cursor-pointer items-center rounded-lg p-2 text-base font-normal dark:text-white"
            onClick={onClick}
          >
            {icon}
            <span className="ml-5 flex-1 whitespace-nowrap">{children}</span>
            {badge && (
              <span className="bg-theme-200 text-theme-800 dark:bg-theme-700 dark:text-theme-300 ml-3 inline-flex items-center justify-center rounded-full px-2 text-sm font-medium">
                {badge}
              </span>
            )}
          </div>
        )}
      </li>
    )
  },
)
