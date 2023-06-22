"use client"

import * as React from "react"

import NextLink from "next/link"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/UI/Tooltip"
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
                  <Icon.USAFlag />
                ) : language === "id" ? (
                  <Icon.IndonesiaFlag />
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
