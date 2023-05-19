import * as React from "react"

import env from "env"
import { Image } from "@/components/Image"

interface LogoProps extends React.HTMLAttributes<HTMLDivElement> {}

export const Logo = React.forwardRef<HTMLDivElement, LogoProps>(() => {
  return (
    <div className="relative h-[23px] w-[120px]">
      <Image
        fill
        sizes="(max-width: 768px) 30vw, (max-width: 1200px) 20vw, 33vw"
        alt={env.SITE_TITLE as string}
        src={env.LOGO_URL as string}
        quality={60}
      />
    </div>
  )
})
