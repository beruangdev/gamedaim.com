"use client"
import * as React from "react"

import dayjs from "dayjs"
import relativeTime from "dayjs/plugin/relativeTime"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/UI/Tabs"

import { FetchWpComment, deleteWpComment } from "@/lib/api/client/wp-comments"
import {
  FetchArticleComment,
  deleteArticleComment,
} from "@/lib/api/client/article-comments"
import {
  FetchDownloadComment,
  deleteDownloadComment,
} from "@/lib/api/client/download-comments"

import { Button } from "@/components/UI/Button"
import { Icon } from "@/components/UI/Icon"
import { Table, Tbody, Td, Th, Thead, Tr } from "@/components/UI/Table"

import {
  CommentDataProps,
  CommentType,
  WpCommentDataProps,
} from "@/lib/data-types"

import { ActionDashboard } from "@/components/Action"
import { toast } from "@/components/UI/Toast"

type WpCommentDataWithoutAuthor = Omit<WpCommentDataProps, "author">
type CommentDataOrWpCommentDataWithoutAuthor =
  | CommentDataProps
  | WpCommentDataWithoutAuthor
export function CommentDashboardContent() {
  dayjs.extend(relativeTime)

  const [wpPage, setWpPage] = React.useState<number>(1)
  const [wpTotalComments, setWpTotalComments] = React.useState<number>(0)

  const [articlePage, setArticlePage] = React.useState<number>(1)
  const [articleTotalComments, setArticleTotalComments] =
    React.useState<number>(0)

  const [downloadPage, setDownloadPage] = React.useState<number>(1)
  const [downloadTotalComments, setDownloadTotalComments] =
    React.useState<number>(0)

  const [wpComments, setWpComments] = React.useState<
    CommentDataOrWpCommentDataWithoutAuthor[]
  >([])
  const [articleComments, setArticleComments] = React.useState<
    CommentDataOrWpCommentDataWithoutAuthor[]
  >([])
  const [downloadComments, setDownloadComment] = React.useState<
    CommentDataOrWpCommentDataWithoutAuthor[]
  >([])

  const {
    data: wpData,
    count: wpCount,
    lastPage: wpLastPage,
  } = FetchWpComment({
    addComment: setWpComments,
    setTotalComments: setWpTotalComments,
    page: wpPage,
    totalComments: wpTotalComments,
  })

  const {
    data: articleData,
    count: articleCount,
    lastPage: articleLastPage,
  } = FetchArticleComment({
    addComment: setArticleComments,
    setTotalComments: setArticleTotalComments,
    page: articlePage,
    totalComments: articleTotalComments,
  })

  const {
    data: downloadData,
    count: downloadCount,
    lastPage: downloadLastPage,
  } = FetchDownloadComment({
    addComment: setDownloadComment,
    setTotalComments: setDownloadTotalComments,
    page: downloadPage,
    totalComments: downloadTotalComments,
  })

  const tabs = [
    {
      label: "WP Comment",
      type: "wp-post",
      state: {
        comments: wpComments,
        removeComments: ({ id }: { id: string }) => {
          setWpComments(
            wpComments.filter((data: { id: string }) => data.id !== id),
          )
        },
      },
      data: wpData,
      count: wpCount,
      page: wpPage,
      setPage: setWpPage,
      totalComments: wpTotalComments,
      lastPage: wpLastPage,
    },
    {
      label: "Article",
      type: "article",
      state: {
        comments: articleComments,
        removeComments: ({ id }: { id: string }) => {
          setArticleComments(
            articleComments.filter((data: { id: string }) => data.id !== id),
          )
        },
      },
      data: articleData,
      count: articleCount,
      page: articlePage,
      setPage: setArticlePage,
      totalComments: articleTotalComments,
      lastPage: articleLastPage,
    },
    {
      label: "Download",
      type: "download",
      state: {
        comments: downloadComments,
        removeComments: ({ id }: { id: string }) => {
          setDownloadComment(
            downloadComments.filter((data: { id: string }) => data.id !== id),
          )
        },
      },
      data: downloadData,
      count: downloadCount,
      page: downloadPage,
      setPage: setDownloadPage,
      lastPage: downloadLastPage,
    },
  ]

  return (
    <div className="mt-4">
      <Tabs defaultValue={`tab-${tabs[0].type}`}>
        <TabsList aria-label="Comment Tabs">
          {tabs.map(({ label, type }, index) => (
            <TabsTrigger value={`tab-${type}`} key={index}>
              {label}
            </TabsTrigger>
          ))}
        </TabsList>
        {tabs.map((tab, index) => (
          <TabsContent value={`tab-${tab.type}`} key={index}>
            <TableComment
              type={tab.type}
              comments={tab.state.comments}
              removeComment={tab.state.removeComments}
              data={tab.data}
              count={tab.count}
              page={tab.page}
              setPage={tab.setPage}
              lastPage={tab.lastPage}
            ></TableComment>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}

function TableComment({
  type,
  comments,
  removeComment,
  data,
  count,
  page,
  setPage,
  lastPage,
}: {
  type: CommentType
  comments: CommentDataOrWpCommentDataWithoutAuthor[]
  removeComment: ({ id }: { id: string }) => void
  data: CommentDataOrWpCommentDataWithoutAuthor[]
  count: number
  page: number
  setPage: React.Dispatch<React.SetStateAction<number>>
  lastPage: number
}) {
  const handleDelete = async ({ id }: { id: string }) => {
    let data: CommentDataOrWpCommentDataWithoutAuthor | null | undefined
    if (type === "article") {
      data = await deleteArticleComment({
        commentId: id,
      })
    } else if (type === "download") {
      data = await deleteDownloadComment({
        commentId: id,
      })
    } else if (type === "wp-post") {
      data = await deleteWpComment({
        commentId: id,
      })
    }

    if (data) {
      removeComment(data)
      toast({
        variant: "success",
        description: "User deleted successfully",
      })
    }
  }

  return (
    <div>
      {comments.length > 0 ? (
        <>
          <Table>
            <Thead>
              <Tr isTitle>
                <Th>Content</Th>
                <Th>Published Date</Th>
                <Th>Last Modified</Th>
                <Th className="text-center">Actions</Th>
              </Tr>
            </Thead>
            <Tbody>
              {comments && (
                <>
                  {data &&
                    comments.map(
                      (comment: CommentDataOrWpCommentDataWithoutAuthor) => (
                        <Tr key={comment.id}>
                          <Td className="whitespace-nowrap">
                            <div className="flex">
                              <span className="font-medium">
                                {comment.content}
                              </span>
                            </div>
                          </Td>
                          <Td>{dayjs(comment.createdAt).fromNow()}</Td>
                          <Td>{dayjs(comment.updatedAt).fromNow()}</Td>
                          <Td align="center">
                            <ActionDashboard
                              onDelete={() => handleDelete(comment)}
                            />
                          </Td>
                        </Tr>
                      ),
                    )}
                </>
              )}
            </Tbody>
          </Table>

          {page && (
            <div className="align-center mt-2 flex items-center justify-center space-x-2">
              <>
                {page !== 1 && (
                  <Button
                    aria-label="Last Page"
                    onClick={() => setPage((old) => Math.max(old - 1, 0))}
                    disabled={page === 1}
                    className="!rounded-full !px-0"
                  >
                    <Icon.ChevronLeft aria-label="Last Page" />
                  </Button>
                )}
                {count && page !== lastPage && (
                  <Button
                    aria-label="Next Page"
                    onClick={() => {
                      setPage((old) => old + 1)
                    }}
                    className="!rounded-full !px-0"
                  >
                    <Icon.ChevronRight aria-label="Next Page" />
                  </Button>
                )}
              </>
            </div>
          )}
        </>
      ) : (
        <div className="my-48 flex items-center justify-center">
          <h3 className="text-center text-4xl font-bold">Comments Not found</h3>
        </div>
      )}
    </div>
  )
}
