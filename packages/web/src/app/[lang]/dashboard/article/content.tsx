"use client"

import * as React from "react"
import dynamic from "next/dynamic"
import NextLink from "next/link"

import { Badge } from "@/components/UI/Badge"
import { Button, IconButton } from "@/components/UI/Button"
import { Icon } from "@/components/UI/Icon"
import { Table, Tbody, Td, Th, Thead, Tr } from "@/components/UI/Table"
import { ArticleDataProps, LanguageTypeData } from "@/lib/data-types"
import {
  useGetArticles,
  useGetArticlesCount,
  useSearchDashboardArticles,
} from "@/lib/api/client/article"
import { formatDate } from "@/utils/date"
import { handleDeleteArticle } from "./actions"
import { Input } from "@/components/UI/Form"

const ActionDashboard = dynamic(() =>
  import("@/components/Action").then((mod) => mod.ActionDashboard),
)
export function ArticleDashboardContent(props: { lang: LanguageTypeData }) {
  const { lang } = props
  const { articlesCount } = useGetArticlesCount()
  const lastPage = articlesCount && Math.ceil(articlesCount / 10)
  const [isLoading, setIsLoading] = React.useState(true)
  const [searchQuery, setSearchQuery] = React.useState<string>("")
  const [page, setPage] = React.useState<number>(1)
  const [articlesData, setArticlesData] = React.useState([])
  const { articles, updatedArticles } = useGetArticles(lang, page)
  const { articles: resultArticles, updatedArticles: updatedResultArticles } =
    useSearchDashboardArticles(lang, searchQuery)

  const handleSearchOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    setSearchQuery(e.target.value)
  }

  React.useEffect(() => {
    if (searchQuery) {
      setArticlesData(resultArticles)
    } else {
      setArticlesData(articles)
    }
  }, [articles, resultArticles, searchQuery])

  React.useEffect(() => {
    setIsLoading(false)
  }, [])
  return (
    <>
      <div className="mt-4 flex items-end justify-between">
        <div>
          <NextLink href="/dashboard/article/new">
            <Button variant="ghost">
              <Icon.Add />
              Add New
            </Button>
          </NextLink>
        </div>

        <Input.Group className="max-w-[200px]">
          <Input onChange={handleSearchOnChange} type="text" />
          <Input.RightElement className="w-2">
            <button
              aria-label="Search"
              type="submit"
              className="inset-y-0 mr-3 flex items-center rounded-lg p-1 focus:outline-none"
            >
              Search
            </button>
          </Input.RightElement>
        </Input.Group>
      </div>
      <div className="mb-[80px] mt-6 rounded">
        {!isLoading &&
          (articlesData !== undefined && articlesData.length > 0 ? (
            <>
              <Table className="table-fixed	border-collapse border-spacing-0">
                <Thead>
                  <Tr isTitle>
                    <Th>Title</Th>
                    {/* <Th>Author</Th> */}
                    <Th className="hidden md:table-cell">Published Date</Th>
                    <Th className="hidden md:table-cell">Last Modified</Th>
                    <Th className="hidden md:table-cell">Status</Th>
                    <Th>Actions</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {articlesData.map((article: ArticleDataProps) => (
                    <Tr key={article.id}>
                      <Td className="line-clamp-3 max-w-[120px]">
                        <div>
                          <span className="font-medium">{article.title}</span>
                        </div>
                      </Td>
                      {/* <Td className="whitespace-nowrap">
                        <div className="flex">
                          <span className="font-medium">
                            {article.author.name}
                          </span>
                        </div>
                      </Td> */}
                      <Td className="hidden md:table-cell">
                        {formatDate(article.createdAt, "LL")}
                      </Td>
                      <Td className="hidden md:table-cell">
                        {formatDate(article.updatedAt, "LL")}
                      </Td>
                      <Td className="hidden whitespace-nowrap md:table-cell">
                        <div className="flex">
                          <span className="font-medium">
                            <Badge variant="outline">{article.status}</Badge>
                          </span>
                        </div>
                      </Td>
                      <Td align="right">
                        <ActionDashboard
                          viewLink={`/article/${article.slug}`}
                          onDelete={() =>
                            handleDeleteArticle(
                              article.id,
                              searchQuery
                                ? updatedResultArticles
                                : updatedArticles,
                            )
                          }
                          editLink={`/dashboard/articles/${article.id}`}
                          content={article.title}
                        />
                      </Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
              {page && !searchQuery && (
                <div className="align-center mt-2 flex items-center justify-center space-x-2">
                  <>
                    {page !== 1 && (
                      <IconButton
                        variant="ghost"
                        onClick={() => setPage((old) => Math.max(old - 1, 0))}
                        disabled={page === 1}
                        className="rounded-full px-0"
                      >
                        <Icon.ChevronLeft />
                      </IconButton>
                    )}
                    {page !== lastPage && (
                      <IconButton
                        variant="ghost"
                        onClick={() => {
                          setPage((old) => old + 1)
                        }}
                        className="rounded-full px-0"
                      >
                        <Icon.ChevronRight />
                      </IconButton>
                    )}
                  </>
                </div>
              )}
            </>
          ) : (
            <div className="my-48 flex items-center justify-center">
              <h3 className="text-center text-4xl font-bold">
                Articles Not found
              </h3>
            </div>
          ))}
      </div>
    </>
  )
}
