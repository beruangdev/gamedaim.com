"use client"
import * as React from "react"
import { useRouter } from "next/router"
import { Input } from "@/components/UI/Form"
import { Icon } from "@/components/UI/Icon"

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
          <Input.LeftElement>
            <Icon.Search
              aria-label="Search"
              className="text-theme-800 dark:text-theme-200"
            />
          </Input.LeftElement>
          <Input
            type="search"
            className="rounded-lg border-none"
            name="q"
            onChange={handleChange}
            autoComplete="off"
            placeholder="Search..."
            required
          />
        </Input.Group>
      </form>
    </div>
  )
})
