"use client"

import * as React from "react"
import dynamic from "next/dynamic"
import NextLink from "next/link"

import { Button, IconButton } from "@/components/UI/Button"
import { Input } from "@/components/UI/Form"
import { Icon } from "@/components/UI/Icon"
import { Table, Tbody, Td, Th, Thead, Tr } from "@/components/UI/Table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/UI/Tabs"
import {
  useGetTopics,
  useGetTopicsCountByLang,
  useSearchDashboardTopics,
} from "@/lib/api/client/topic"
import { TopicDataProps } from "@/lib/data-types"
import { formatDate } from "@/utils/date"
import { handleDeleteTopic } from "./actions"

const ActionDashboard = dynamic(() =>
  import("@/components/Action").then((mod) => mod.ActionDashboard),
)
export function TopicDashboardContent() {
  const [isLoading, setIsLoading] = React.useState<boolean>(true)
  const [searchQuery, setSearchQuery] = React.useState<string>("")
  const [searchQueryEn, setSearchQueryEn] = React.useState<string>("")
  const [searchType, setSearchType] = React.useState("id")
  const [pageLangId, setPageLangId] = React.useState<number>(1)
  const [pageLangEn, setPageLangEn] = React.useState<number>(1)
  const [topicsDataLangId, setTopicsDataLangId] = React.useState<
    TopicDataProps[]
  >([])
  const [topicsDataLangEn, setTopicsDataLangEn] = React.useState<
    TopicDataProps[]
  >([])

  // Hooks get Topics by Lang

  const { topicsCount: topicsCountLangId } = useGetTopicsCountByLang("id")
  const { topicsCount: topicsCounLangtEn } = useGetTopicsCountByLang("en")
  const lastPageLangId = topicsCountLangId && Math.ceil(topicsCountLangId / 10)
  const lastPageLangEn = topicsCounLangtEn && Math.ceil(topicsCounLangtEn / 10)
  const { topics, updatedTopics } = useGetTopics("id", pageLangId)
  const {
    topics: resultTopicsLangId,
    updatedTopics: updatedResultTopicsLangId,
  } = useSearchDashboardTopics("id", searchQuery)

  const { topics: topicsLangEn, updatedTopics: updatedTopicsLangEn } =
    useGetTopics("en", pageLangEn)
  const {
    topics: resultTopicsLangEn,
    updatedTopics: updatedResultTopicsLangEn,
  } = useSearchDashboardTopics("en", searchQuery)

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
      setTopicsDataLangId(resultTopicsLangId)
    } else {
      setTopicsDataLangId(topics)
    }
    if (searchQueryEn) {
      setTopicsDataLangEn(resultTopicsLangEn)
    } else {
      setTopicsDataLangEn(topicsLangEn)
    }
  }, [
    topics,
    topicsLangEn,
    resultTopicsLangEn,
    resultTopicsLangId,
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
          <NextLink href="/dashboard/topic/new">
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
              {topicsDataLangId !== undefined && topicsDataLangId.length > 0 ? (
                <TableTopic
                  topics={topicsDataLangId}
                  searchQuery={searchQuery}
                  updateResultTopics={updatedResultTopicsLangId}
                  updateTopics={updatedTopics}
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
                    Topics Not found
                  </h3>
                </div>
              )}
            </TabsContent>
            <TabsContent value="en">
              {topicsDataLangEn !== undefined && topicsDataLangEn.length > 0 ? (
                <TableTopic
                  topics={topicsDataLangEn}
                  searchQuery={searchQueryEn}
                  updateResultTopics={updatedResultTopicsLangEn}
                  updateTopics={updatedTopicsLangEn}
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
                    Topics Not found
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

interface TableTopicProps {
  topics: TopicDataProps[]
  searchQuery: string
  updateResultTopics: () => void
  updateTopics: () => void
  page: number
  lastPage: number
  handleBack: () => void
  handleNext: () => void
}
const TableTopic = (props: TableTopicProps) => {
  const {
    topics,
    searchQuery,
    updateResultTopics,
    updateTopics,
    page,
    lastPage,
    handleBack,
    handleNext,
  } = props

  return (
    <>
      <Table className="table-fixed border-collapse border-spacing-0">
        <Thead>
          <Tr isTitle>
            <Th>Title</Th>
            <Th>Type</Th>
            <Th>Slug</Th>
            <Th className="hidden md:table-cell">Published Date</Th>
            <Th className="hidden md:table-cell">Last Modified</Th>
            <Th align="center">Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {topics.map((topic: TopicDataProps) => (
            <Tr key={topic.id}>
              <Td className="line-clamp-3 max-w-[120px]">
                <div className="flex">
                  <span className="font-medium">{topic.title}</span>
                </div>
              </Td>
              <Td className="white-space-nowrap">
                <div className="flex">
                  <span className="font-medium">{topic.type}</span>
                </div>
              </Td>
              <Td className="whitespace-nowrap">
                <div className="flex">
                  <span className="font-medium">{topic.slug}</span>
                </div>
              </Td>
              <Td className="hidden whitespace-nowrap md:table-cell">
                <div className="flex">
                  <span className="font-medium">
                    {formatDate(topic.createdAt, "LL")}
                  </span>
                </div>
              </Td>
              <Td className="hidden whitespace-nowrap md:table-cell">
                <div className="flex">
                  <span className="font-medium">
                    {formatDate(topic.createdAt, "LL")}
                  </span>
                </div>
              </Td>
              <Td align="right">
                <ActionDashboard
                  viewLink={`/topic/${topic.slug}`}
                  onDelete={() => {
                    handleDeleteTopic(
                      topic.id,
                      searchQuery ? updateResultTopics : updateTopics,
                    )
                  }}
                  editLink={`/dashboard/topic/edit/${topic.id}`}
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
                className="rounded-full px-0"
              >
                <Icon.ChevronLeft />
              </IconButton>
            )}
            {page !== lastPage && (
              <IconButton
                variant="ghost"
                onClick={handleNext}
                className="rounded-full px-0"
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
