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
  useGetDownloads,
  useGetDownloadsCountByLang,
  useSearchDashboardDownloads,
} from "@/lib/api/client/download"
import { DownloadDataProps } from "@/lib/data-types"
import { formatDate } from "@/utils/date"
import { handleDeleteDownload } from "./actions"

const ActionDashboard = dynamic(() =>
  import("@/components/Action").then((mod) => mod.ActionDashboard),
)
export function DownloadDashboardContent() {
  const [isLoading, setIsLoading] = React.useState<boolean>(true)
  const [searchQuery, setSearchQuery] = React.useState<string>("")
  const [searchQueryEn, setSearchQueryEn] = React.useState<string>("")
  const [searchType, setSearchType] = React.useState("id")
  const [pageId, setPageId] = React.useState<number>(1)
  const [pageEn, setPageEn] = React.useState<number>(1)
  const [downloadsDataId, setDownloadsDataId] = React.useState<[]>([])
  const [downloadsDataEn, setDownloadsDataEn] = React.useState<[]>([])

  const { downloadsCount: downloadsCountId } = useGetDownloadsCountByLang("id")
  const { downloadsCount: downloadsCountEn } = useGetDownloadsCountByLang("en")
  const lastPageId = downloadsCountId && Math.ceil(downloadsCountId / 10)
  const lastPageEn = downloadsCountEn && Math.ceil(downloadsCountEn / 10)
  const { downloads, updatedDownloads } = useGetDownloads("id", pageId)
  const {
    downloads: resultDownloadsId,
    updatedDownloads: updatedResultDownloadsId,
  } = useSearchDashboardDownloads("id", searchQuery)
  const { downloads: downloadsEn, updatedDownloads: updatedDownloadsEn } =
    useGetDownloads("en", pageEn)
  const {
    downloads: resultDownloadsEn,
    updatedDownloads: updatedResultDownloadsEn,
  } = useSearchDashboardDownloads("en", searchQueryEn)

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
      setDownloadsDataId(resultDownloadsId)
    } else {
      setDownloadsDataId(downloads)
    }
    if (searchQueryEn) {
      setDownloadsDataEn(resultDownloadsEn)
    } else {
      setDownloadsDataEn(downloadsEn)
    }
  }, [
    downloads,
    downloadsEn,
    resultDownloadsEn,
    resultDownloadsId,
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
          <NextLink href="/dashboard/download/new">
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
              {downloadsDataId !== undefined && downloadsDataId.length > 0 ? (
                <TableDownload
                  downloads={downloadsDataId}
                  searchQuery={searchQuery}
                  updateResultDownloads={updatedResultDownloadsId}
                  updateDownloads={updatedDownloads}
                  page={pageId}
                  lastPage={lastPageId}
                  handleBack={() => setPageId((old) => Math.max(old - 1, 0))}
                  handleNext={() => {
                    setPageId((old) => old + 1)
                  }}
                />
              ) : (
                <div className="my-48 flex items-center justify-center">
                  <h3 className="text-center text-4xl font-bold">
                    Downloads Not found
                  </h3>
                </div>
              )}
            </TabsContent>
            <TabsContent value="en">
              {downloadsDataEn !== undefined && downloadsDataEn.length > 0 ? (
                <TableDownload
                  downloads={downloadsDataEn}
                  searchQuery={searchQueryEn}
                  updateResultDownloads={updatedResultDownloadsEn}
                  updateDownloads={updatedDownloadsEn}
                  page={pageEn}
                  lastPage={lastPageEn}
                  handleBack={() => setPageEn((old) => Math.max(old - 1, 0))}
                  handleNext={() => {
                    setPageEn((old) => old + 1)
                  }}
                />
              ) : (
                <div className="my-48 flex items-center justify-center">
                  <h3 className="text-center text-4xl font-bold">
                    Downloads Not found
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

interface TableDownloadProps {
  downloads: DownloadDataProps[]
  searchQuery: string
  updateResultDownloads: () => void
  updateDownloads: () => void
  page: number
  lastPage: number
  handleBack: () => void
  handleNext: () => void
}
const TableDownload = (props: TableDownloadProps) => {
  const {
    downloads,
    searchQuery,
    updateResultDownloads,
    updateDownloads,
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
            {/* <Th>Author</Th> */}
            <Th className="hidden md:table-cell">Published Date</Th>
            <Th className="hidden md:table-cell">Last Modified</Th>
            <Th className="hidden md:table-cell">Status</Th>
            <Th>Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {downloads.map((download: DownloadDataProps) => (
            <Tr key={download.id}>
              <Td className="line-clamp-3 max-w-[120px]">
                <div>
                  <span className="font-medium">{download.title}</span>
                </div>
              </Td>
              {/* <Td className="whitespace-nowrap">
            <div className="flex">
              <span className="font-medium">
                {download.author.name}
              </span>
            </div>
          </Td> */}
              <Td className="hidden md:table-cell">
                {formatDate(download.createdAt, "LL")}
              </Td>
              <Td className="hidden md:table-cell">
                {formatDate(download.updatedAt, "LL")}
              </Td>
              <Td className="hidden whitespace-nowrap md:table-cell">
                <div className="flex">
                  <span className="font-medium">
                    <Badge variant="outline">{download.status}</Badge>
                  </span>
                </div>
              </Td>
              <Td align="right">
                <ActionDashboard
                  viewLink={`/download/${download.type}/${download.slug}`}
                  onDelete={() =>
                    handleDeleteDownload(
                      download.id,
                      searchQuery ? updateResultDownloads : updateDownloads,
                    )
                  }
                  editLink={`/dashboard/download/edit/${download.id}`}
                  content={download.title}
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
