"use client"

import * as React from "react"

import NextLink from "next/link"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/UI/Tooltip"
import { Image } from "@/components/Image"
import { Icon } from "@/components/UI/Icon"

import { LanguageTypeData } from "@/lib/data-types"

interface AddLanguageActionProps {
  triggerLink: string
  content: React.ReactNode
  language: LanguageTypeData | undefined | null
}

export function AddLanguageAction(props: AddLanguageActionProps) {
  const { triggerLink, content, language } = props
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          {
            <NextLink href={triggerLink}>
              <div className="relative h-3 w-4 cursor-pointer">
                {language === "en" ? (
                  <Image
                    src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAALCAMAAABBPP0LAAAAmVBMVEViZsViZMJiYrf9gnL8eWrlYkjgYkjZYkj8/PujwPybvPz4+PetraBEgfo+fvo3efkydfkqcvj8Y2T8UlL8Q0P8MzP9k4Hz8/Lu7u4DdPj9/VrKysI9fPoDc/EAZ7z7IiLHYkjp6ekCcOTk5OIASbfY/v21takAJrT5Dg6sYkjc3Nn94t2RkYD+y8KeYkjs/v7l5fz0dF22YkjWvcOLAAAAgElEQVR4AR2KNULFQBgGZ5J13KGGKvc/Cw1uPe62eb9+Jr1EUBFHSgxxjP2Eca6AfUSfVlUfBvm1Ui1bqafctqMndNkXpb01h5TLx4b6TIXgwOCHfjv+/Pz+5vPRw7txGWT2h6yO0/GaYltIp5PT1dEpLNPL/SdWjYjAAZtvRPgHJX4Xio+DSrkAAAAASUVORK5CYII="
                    alt="English"
                  />
                ) : language === "id" ? (
                  <Image
                    src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAALCAMAAABBPP0LAAAARVBMVEXfAgDPAADskYrvh4Dsd27qa2PoYVi9AADmV03kTULiQzfeMyf2vrryq6ftoJvMGA/8/Pz5+fn39/fz8/Pm5ubg4ODt7u3lScs2AAAAR0lEQVR4AQXBsRGDQBAAMe39e0gcuP86CTEgBSAgIwipzYiMdBmJjITNMJJYd58jhBPf+kEiaCARaFIiWEyA58Gf3bJwI3gBwHkHZeHbupcAAAAASUVORK5CYII="
                    alt="Indonesia"
                  />
                ) : (
                  <Icon.Add />
                )}
              </div>
            </NextLink>
          }
        </TooltipTrigger>
        <TooltipContent>
          <p>{content}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
