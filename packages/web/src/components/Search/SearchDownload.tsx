"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { Input } from "@/components/UI/Form"
import { Icon } from "@/components/UI/Icon"
import { Button } from "../UI/Button"

interface SearchDownloadProps extends React.HTMLAttributes<HTMLDivElement> {
  onSearch?: (query: string) => void
}

export const SearchDownload = React.forwardRef<
  HTMLDivElement,
  SearchDownloadProps
>((props, ref) => {
  const { onSearch, ...rest } = props

  const [query, setQuery] = React.useState<string>("")

  const router = useRouter()

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value)
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (onSearch) {
      onSearch(query)
    } else {
      router.push(`/download/search?q=${encodeURIComponent(query)}`)
    }
  }

  return (
    <div ref={ref} {...rest}>
      <form onSubmit={handleSubmit} autoComplete="off">
        <Input.Group>
          <Input.LeftElement className="text-muted/80">
            <Button type="button" variant={null}>
              <Icon.Search aria-label="Search" />
            </Button>
          </Input.LeftElement>
          <Input
            type="search"
            name="q"
            onChange={handleChange}
            autoComplete="off"
            placeholder="Search..."
          />
        </Input.Group>
      </form>
    </div>
  )
})
