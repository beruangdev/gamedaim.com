"use client"

import * as React from "react"
import dynamic from "next/dynamic"
import NextLink from "next/link"

import { Badge } from "@/components/UI/Badge"
import { Button, IconButton } from "@/components/UI/Button"
import { Input } from "@/components/UI/Form"
import { Icon } from "@/components/UI/Icon"
import { Table, Tbody, Td, Th, Thead, Tr } from "@/components/UI/Table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/UI/Tabs"
import {
  useGetArticles,
  useGetArticlesCountByLang,
  useSearchDashboardArticles,
} from "@/lib/api/client/article"
import { ArticleDataProps } from "@/lib/data-types"
import { formatDate } from "@/utils/date"
import { handleDeleteArticle } from "./actions"

const ActionDashboard = dynamic(() =>
  import("@/components/Action").then((mod) => mod.ActionDashboard),
)
export function ArticleDashboardContent() {
  const [isLoading, setIsLoading] = React.useState<boolean>(true)
  const [searchQuery, setSearchQuery] = React.useState<string>("")
  const [searchQueryEn, setSearchQueryEn] = React.useState<string>("")
  const [searchType, setSearchType] = React.useState("id")
  const [pageLangId, setPageLangId] = React.useState<number>(1)
  const [pageLangEn, setPageLangEn] = React.useState<number>(1)
  const [articlesDataLangId, setArticlesDataLangId] = React.useState<
    ArticleDataProps[]
  >([])
  const [articlesDataLangEn, setArticlesDataLangEn] = React.useState<
    ArticleDataProps[]
  >([])

  // Hooks get Articles by Lang

  const { articlesCount: articlesCountLangId } = useGetArticlesCountByLang("id")
  const { articlesCount: articlesCounLangtEn } = useGetArticlesCountByLang("en")
  const lastPageLangId =
    articlesCountLangId && Math.ceil(articlesCountLangId / 10)
  const lastPageLangEn =
    articlesCounLangtEn && Math.ceil(articlesCounLangtEn / 10)
  const { articles, updatedArticles } = useGetArticles("id", pageLangId)
  const {
    articles: resultArticlesLangId,
    updatedArticles: updatedResultArticlesLangId,
  } = useSearchDashboardArticles("id", searchQuery)

  const { articles: articlesLangEn, updatedArticles: updatedArticlesLangEn } =
    useGetArticles("en", pageLangEn)
  const {
    articles: resultArticlesLangEn,
    updatedArticles: updatedResultArticlesLangEn,
  } = useSearchDashboardArticles("en", searchQuery)

  const handleSearchOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    if (searchType === "id") {
      setSearchQuery(e.target.value)
    } else {
      setSearchQueryEn(e.target.value)
    }
  }

  React.useEffect(() => {
    if (searchQuery) {
      setArticlesDataLangId(resultArticlesLangId)
    } else {
      setArticlesDataLangId(articles)
    }
    if (searchQueryEn) {
      setArticlesDataLangEn(resultArticlesLangEn)
    } else {
      setArticlesDataLangEn(articlesLangEn)
    }
  }, [
    articles,
    articlesLangEn,
    resultArticlesLangEn,
    resultArticlesLangId,
    searchQuery,
    searchQueryEn,
  ])

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
          <Input
            value={searchType === "id" ? searchQuery : searchQueryEn}
            onChange={handleSearchOnChange}
            type="text"
          />
          <Input.RightElement>
            <Button variant={null}>
              <Icon.Search />
            </Button>
          </Input.RightElement>
        </Input.Group>
      </div>
      <div className="mb-[80px] mt-6 rounded">
        {!isLoading && (
          <Tabs defaultValue="id">
            <TabsList>
              <TabsTrigger onClick={() => setSearchType("id")} value="id">
                Indonesia
              </TabsTrigger>
              <TabsTrigger onClick={() => setSearchType("en")} value="en">
                English
              </TabsTrigger>
            </TabsList>
            <TabsContent value="id">
              {articlesDataLangId !== undefined &&
              articlesDataLangId.length > 0 ? (
                <TableArticle
                  articles={articlesDataLangId}
                  searchQuery={searchQuery}
                  updateResultArticles={updatedResultArticlesLangId}
                  updateArticles={updatedArticles}
                  page={pageLangId}
                  lastPage={lastPageLangId}
                  handleBack={() =>
                    setPageLangId((old) => Math.max(old - 1, 0))
                  }
                  handleNext={() => {
                    setPageLangId((old) => old + 1)
                  }}
                />
              ) : (
                <div className="my-48 flex items-center justify-center">
                  <h3 className="text-center text-4xl font-bold">
                    Articles Not found
                  </h3>
                </div>
              )}
            </TabsContent>
            <TabsContent value="en">
              {articlesDataLangEn !== undefined &&
              articlesDataLangEn.length > 0 ? (
                <TableArticle
                  articles={articlesDataLangEn}
                  searchQuery={searchQueryEn}
                  updateResultArticles={updatedResultArticlesLangEn}
                  updateArticles={updatedArticlesLangEn}
                  page={pageLangEn}
                  lastPage={lastPageLangEn}
                  handleBack={() =>
                    setPageLangEn((old) => Math.max(old - 1, 0))
                  }
                  handleNext={() => {
                    setPageLangEn((old) => old + 1)
                  }}
                />
              ) : (
                <div className="my-48 flex items-center justify-center">
                  <h3 className="text-center text-4xl font-bold">
                    Articles Not found
                  </h3>
                </div>
              )}
            </TabsContent>
          </Tabs>
        )}
      </div>
    </>
  )
}

interface TableArticleProps {
  articles: ArticleDataProps[]
  searchQuery: string
  updateResultArticles: () => void
  updateArticles: () => void
  page: number
  lastPage: number
  handleBack: () => void
  handleNext: () => void
}
const TableArticle = (props: TableArticleProps) => {
  const {
    articles,
    searchQuery,
    updateResultArticles,
    updateArticles,
    page,
    lastPage,
    handleBack,
    handleNext,
  } = props

  return (
    <>
      <Table className="table-fixed	border-collapse border-spacing-0">
        <Thead>
          <Tr isTitle>
            <Th>Title</Th>
            <Th>Language</Th>
            {/* <Th>Author</Th> */}
            <Th className="hidden md:table-cell">Published Date</Th>
            <Th className="hidden md:table-cell">Last Modified</Th>
            <Th className="hidden md:table-cell">Status</Th>
            <Th>Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {articles.map((article: ArticleDataProps) => (
            <Tr key={article.id}>
              <Td className="max-w-[120px]">
                <div>
                  <span className="line-clamp-3 font-medium">
                    {article.title}
                  </span>
                </div>
              </Td>
              <Td className="whitespace-nowrap">
                <div className="flex gap-2">
                  <NextLink
                    href={`/dashboard/article/edit/lang/en/${article.articlePrimary.id}`}
                  >
                    En
                  </NextLink>
                  <NextLink
                    href={`/dashboard/article/edit/lang/id/${article.articlePrimary.id}`}
                  >
                    Id
                  </NextLink>
                </div>
              </Td>
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
                      searchQuery ? updateResultArticles : updateArticles,
                    )
                  }
                  editLink={`/dashboard/article/edit/${article.id}`}
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
                onClick={handleBack}
                disabled={page === 1}
                className="rounded-full"
              >
                <Icon.ChevronLeft />
              </IconButton>
            )}
            {page !== lastPage && (
              <IconButton
                variant="ghost"
                onClick={handleNext}
                className="rounded-full"
              >
                <Icon.ChevronRight />
              </IconButton>
            )}
          </>
        </div>
      )}
    </>
  )
}
