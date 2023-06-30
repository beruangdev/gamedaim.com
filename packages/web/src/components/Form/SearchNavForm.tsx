"use client"

import * as React from "react"
import { Input } from "@/components/UI/Form"
import { Icon } from "@/components/UI/Icon"

interface SearchFromProps {
  handleSearch: (e: React.ChangeEvent<HTMLInputElement>) => void
}
export const SearchNavForm = (props: SearchFromProps) => {
  const { handleSearch } = props
  return (
    <>
      <form
        className="bg-background"
        onSubmit={(e) => e.preventDefault()}
        autoComplete="off"
      >
        <Input.Group className="bg-background relative flex min-w-full lg:w-[400px]">
          <Input
            type="text"
            onChange={(e) => handleSearch(e)}
            autoComplete="off"
            placeholder="Search..."
          />
          <Input.RightElement>
            <Icon.Search aria-label="Search" />
          </Input.RightElement>
        </Input.Group>
      </form>
    </>
  )
}
