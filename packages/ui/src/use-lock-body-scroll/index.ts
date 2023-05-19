import * as React from "react"

// Source: https://usehooks.com/useLockBodyScroll

export function useLockBodyScroll() {
  React.useLayoutEffect((): (() => void) => {
    const originalStyle: string = window.getComputedStyle(
      document.body,
    ).overflow
    document.body.style.overflow = "hidden"
    return () => (document.body.style.overflow = originalStyle)
  }, [])
}
