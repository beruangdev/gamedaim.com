"use client"

import * as React from "react"
import dynamic from "next/dynamic"
import NextLink from "next/link"

import { Button, IconButton } from "@/components/UI/Button"
import { Icon } from "@/components/UI/Icon"
import { Table, Tbody, Td, Th, Thead, Tr } from "@/components/UI/Table"
import { TopicDataProps } from "@/lib/data-types"
import { formatDate } from "@/utils/date"
import { handleDeleteTopic } from "./actions"
import { useGetTopics, useGetTopicsCount } from "@/lib/api/client/topic"

const ActionDashboard = dynamic(() =>
  import("@/components/Action").then((mod) => mod.ActionDashboard),
)

export default function TopicDashboard() {
  const { topicsCount } = useGetTopicsCount()
  const lastPage = topicsCount && Math.ceil(topicsCount / 10)
  const [isLoading, setIsLoading] = React.useState<boolean>(true)
  const [page, setPage] = React.useState<number>(1)
  const { topics, updatedTopics } = useGetTopics("id_ID", page)

  React.useEffect(() => {
    setIsLoading(false)
    if (page > lastPage) {
      setPage((old) => Math.max(old - 1, 0))
    }
  }, [lastPage, page])

  return (
    <>
      <div className="mt-4 flex items-end justify-between">
        <div>
          <NextLink href="/dashboard/user/new">
            <Button variant="ghost">
              <Icon.Add />
              Add New
            </Button>
          </NextLink>
        </div>
      </div>
      <div className="mb-[80px] mt-6 rounded">
        {!isLoading &&
          (topics !== undefined && topics.length > 0 ? (
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
                            handleDeleteTopic(topic.id, updatedTopics)
                          }}
                          editLink={`/dashboard/topic/edit/${topic.id}`}
                        />
                      </Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
              {page && (
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
                Topics Not found
              </h3>
            </div>
          ))}
      </div>
    </>
  )
}
