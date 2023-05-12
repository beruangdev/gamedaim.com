"use client"

import * as React from "react"
import { HiOutlineSearch } from "react-icons/hi"
import { Container, Input } from "ui"

import { ArticleCardVertical } from "@/components/Card"
import { searchArticles } from "@/lib/article"
import { ArticleDataProps } from "@/lib/data-types"

interface SearchNavbarProps extends React.HTMLAttributes<HTMLDivElement> {
  hideSearchVisibility: () => void
  searchVisibility: boolean
}

export const SearchNavbar = React.forwardRef<HTMLDivElement, SearchNavbarProps>(
  (props, ref) => {
    const { searchVisibility, hideSearchVisibility } = props

    const [searchResults, setSearchResults] = React.useState<
      ArticleDataProps[]
    >([])

    const [searched, setSearched] = React.useState<boolean>(false)

    const handleSearchChange = async (
      e: React.ChangeEvent<HTMLInputElement>,
    ) => {
      e.preventDefault()

      if (e.target.value.length > 1) {
        setSearched(true)
        const data = await searchArticles(e.target.value)

        setSearchResults(data as ArticleDataProps[])
      } else if (e.target.value.length < 1) {
        setSearched(false)
        setSearchResults([])
      }
    }

    return (
      <>
        <div
          className={`absolute inset-x-0 ${
            searchVisibility ? "top-0 h-[90vh]" : "top-[-100%] h-0"
          } z-20 transition-all duration-200`}
          onClick={hideSearchVisibility}
          ref={ref}
        >
          <Container className="my-0 px-2 md:px-0">
            <form onSubmit={(e) => e.preventDefault()} autoComplete="false">
              <div
                className="relative flex w-full min-w-full lg:w-[500px]"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="absolute bottom-0 left-0 top-[4px] flex items-center pl-3">
                  <span className="text-theme-4 h-5 w-5">
                    <HiOutlineSearch />
                  </span>
                </div>
                <Input
                  type="search"
                  name="q"
                  className="py-3"
                  onChange={handleSearchChange}
                  autoComplete="off"
                  placeholder="Search..."
                  required
                />
              </div>
            </form>

            <div
              className={`search-result`}
              onClick={hideSearchVisibility}
              aria-expanded={searchVisibility ? "true" : "false"}
            >
              {searched && searchResults.length > 0 ? (
                <div className="search-scroller dark:bg-theme-900 grid h-[87vh] grid-cols-1 gap-1 overflow-y-scroll rounded-sm bg-white px-2 py-5 shadow lg:h-[84vh] lg:grid-cols-4 lg:gap-5 lg:px-5">
                  {searchResults.map((article: ArticleDataProps) => {
                    return <ArticleCardVertical article={article} />
                  })}
                </div>
              ) : (
                searched && (
                  <h3 className="dark:bg-theme-900 bg-white p-5 text-center shadow">
                    No results.
                  </h3>
                )
              )}
            </div>
          </Container>
        </div>
      </>
    )
  },
)
