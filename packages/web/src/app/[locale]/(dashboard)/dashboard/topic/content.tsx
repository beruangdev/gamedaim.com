"use client"

import * as React from "react"
import dynamic from "next/dynamic"
import NextLink from "next/link"

import { Image } from "@/components/Image"
import { Button, IconButton } from "@/components/UI/Button"
import { Input } from "@/components/UI/Form"
import { Icon } from "@/components/UI/Icon"
import { AddLanguageAction } from "@/components/Action"
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
            <Th>
              <div className="relative h-3 w-4">
                <Image
                  src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAALCAMAAABBPP0LAAAARVBMVEXfAgDPAADskYrvh4Dsd27qa2PoYVi9AADmV03kTULiQzfeMyf2vrryq6ftoJvMGA/8/Pz5+fn39/fz8/Pm5ubg4ODt7u3lScs2AAAAR0lEQVR4AQXBsRGDQBAAMe39e0gcuP86CTEgBSAgIwipzYiMdBmJjITNMJJYd58jhBPf+kEiaCARaFIiWEyA58Gf3bJwI3gBwHkHZeHbupcAAAAASUVORK5CYII="
                  alt="Indonesia"
                />
              </div>
            </Th>
            <Th>
              <div className="relative h-3 w-4">
                <Image
                  src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAALCAMAAABBPP0LAAAAmVBMVEViZsViZMJiYrf9gnL8eWrlYkjgYkjZYkj8/PujwPybvPz4+PetraBEgfo+fvo3efkydfkqcvj8Y2T8UlL8Q0P8MzP9k4Hz8/Lu7u4DdPj9/VrKysI9fPoDc/EAZ7z7IiLHYkjp6ekCcOTk5OIASbfY/v21takAJrT5Dg6sYkjc3Nn94t2RkYD+y8KeYkjs/v7l5fz0dF22YkjWvcOLAAAAgElEQVR4AR2KNULFQBgGZ5J13KGGKvc/Cw1uPe62eb9+Jr1EUBFHSgxxjP2Eca6AfUSfVlUfBvm1Ui1bqafctqMndNkXpb01h5TLx4b6TIXgwOCHfjv+/Pz+5vPRw7txGWT2h6yO0/GaYltIp5PT1dEpLNPL/SdWjYjAAZtvRPgHJX4Xio+DSrkAAAAASUVORK5CYII="
                  alt="English"
                />
              </div>
            </Th>
            <Th>Type</Th>
            <Th>Slug</Th>
            <Th className="hidden md:table-cell">Published Date</Th>
            <Th className="hidden md:table-cell">Last Modified</Th>
            <Th align="center">Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {topics.map((topic: TopicDataProps) => {
            const topicIndo = topic.topicPrimary.topics.find(
              (lang) => lang.language === "id",
            )
            const topicEnglish = topic.topicPrimary.topics.find(
              (lang) => lang.language === "en",
            )
            return (
              <Tr key={topic.id}>
                <Td className="max-w-[120px]">
                  <div className="flex">
                    <span className="line-clamp-3 font-medium">
                      {topic.title}
                    </span>
                  </div>
                </Td>
                <Td className="whitespace-nowrap">
                  <div className="flex justify-between gap-2">
                    <AddLanguageAction
                      language={topicIndo?.language}
                      triggerLink={`/dashboard/topic/edit/lang/id/${topic.topicPrimary.id}`}
                      content={
                        <>
                          {topicIndo ? (
                            <p>{topicIndo.title}</p>
                          ) : (
                            <p>Add Translations</p>
                          )}
                        </>
                      }
                    />
                  </div>
                </Td>
                <Td className="whitespace-nowrap">
                  <div className="flex justify-between gap-2">
                    <AddLanguageAction
                      language={topicEnglish?.language}
                      triggerLink={`/dashboard/topic/edit/lang/en/${topic.topicPrimary.id}`}
                      content={
                        <>
                          {topicEnglish ? (
                            <p>{topicEnglish.title}</p>
                          ) : (
                            <p>Add Translations</p>
                          )}
                        </>
                      }
                    />
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
            )
          })}
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
