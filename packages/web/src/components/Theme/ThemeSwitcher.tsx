"use client"

import * as React from "react"
import { useTheme } from "next-themes"
import { Icon, IconButton } from "ui"

export const ThemeSwitcher = () => {
  const [mounted, setMounted] = React.useState<boolean>(false)

  const { resolvedTheme, setTheme } = useTheme()

  const switchTheme = () => {
    if (mounted) {
      setTheme(resolvedTheme === "dark" ? "light" : "dark")
    }
  }

  React.useEffect(() => setMounted(true), [])

  return (
    <IconButton
      variant="ghost"
      aria-label="Toggle Dark Mode"
      onClick={switchTheme}
    >
      {mounted &&
        (resolvedTheme === "light" ? (
          <Icon.Moon aria-label="Toggle Dark Mode" className="h-5 w-5" />
        ) : (
          <Icon.Sun aria-label="Toggle Light Mode" className="h-5 w-5" />
        ))}
    </IconButton>
  )
}
