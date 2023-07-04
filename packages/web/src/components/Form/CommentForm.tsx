"use client"

import * as React from "react"
import dayjs from "dayjs"
import relativeTime from "dayjs/plugin/relativeTime"
import { AxiosError } from "axios"

import { Button } from "@/components/UI/Button"
import { Image } from "@/components/Image"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/UI/DropdownMenu"
import { EditableParagraph } from "@/components/UI/Form/EditableParagraph"
import { CommentDataProps, CommentType, ErrorResponse } from "@/lib/data-types"
import { useCurrentUser } from "@/hooks/use-current-user"
import { toast } from "@/components/UI/Toast"
import { Icon } from "@/components/UI/Icon"
import { Textarea } from "@/components/UI/Textarea"
import { http } from "@/lib/http"

dayjs.extend(relativeTime)

export interface CommentProps extends CommentDataProps {
  wpPostSlug?: string
}

interface CommentFormProps extends React.HTMLAttributes<HTMLDivElement> {
  postId: string
  postType?: CommentType
}

export const CommentForm = React.forwardRef<HTMLDivElement, CommentFormProps>(
  (props, ref) => {
    const { postId, postType } = props

    const { user } = useCurrentUser()
    const [comments, setComments] = React.useState<CommentProps[] | []>([])
    const [showComments, setShowComments] = React.useState<boolean>(false)
    const commentRef = React.useRef<HTMLTextAreaElement>(null)
    const [editingId, setEditingId] = React.useState<string>("")

    const route_namespace =
      postType === "article"
        ? "article-comment"
        : postType === "download"
        ? "download-comment"
        : postType === "wp-post"
        ? "wp-comment"
        : "comment"

    const route = {
      get: `${route_namespace}/${postType}/${postId}`,
      post: route_namespace,
      delete: (commentId: string) => {
        return `${route_namespace}/${commentId}`
      },
      put: (commentId: string) => {
        return `${route_namespace}/${commentId}`
      },
    }

    const getComments = React.useCallback(async () => {
      try {
        const [data, error] = await http<CommentDataProps[] | null>("GET", {
          url: route.get,
        })

        if (error !== null) {
          toast({
            variant: "danger",
            description: (error as AxiosError<ErrorResponse>)?.response?.data
              ?.message as string,
          })
          console.log(error)
          return
        } else if (data) {
          setComments(data ?? [])
        }
      } catch (err) {
        console.log(err)
      }
    }, [route.get])

    React.useEffect(() => {
      getComments()
    }, [getComments])

    const resolveTypeIdName = () => {
      switch (postType) {
        case "wp-post":
          return "wpPostSlug"
        case "download":
          return "downloadId"
        default:
          return "articleId"
      }
    }

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
      e.preventDefault()
      const formData = new FormData(e.currentTarget)
      const { comment } = Object.fromEntries(formData.entries())

      const [data, error] = await http<CommentDataProps | null>("POST", {
        url: route.post,
        data: {
          content: comment,
          [resolveTypeIdName()]: postId,
        },
      })

      if (error !== null) {
        toast({
          variant: "danger",
          description: (error as AxiosError<ErrorResponse>)?.response?.data
            ?.message as string,
        })
        console.log(error)
        return
      } else if (data) {
        toast({
          variant: "success",
          description: "Comment is created",
        })
        if (commentRef.current) commentRef.current.value = ""
        setComments([
          {
            ...data,
            author: user,
          },
          ...comments,
        ])
      }
    }

    async function handleDeleteComment(comment: CommentProps) {
      if (!comment?.id) {
        return
      }

      try {
        const [data, error] = await http<CommentDataProps | null>("DELETE", {
          url: route.delete(comment.id),
          data: {
            postType,
          },
        })

        if (error != null) {
          toast({
            variant: "danger",
            description: (error as AxiosError<ErrorResponse>)?.response?.data
              ?.message as string,
          })
        } else if (data) {
          toast({
            variant: "success",
            description: "Komentar telah dihapus",
          })
          setComments((existingComments) =>
            existingComments.filter((c) => c.id !== comment.id),
          )
        }
      } catch (error) {
        console.error(error)
      }
    }

    async function handleUpdateComment(comment_id: string, content: string) {
      if (comment_id && content) {
        try {
          const [data, error] = await http<CommentDataProps | null>("PUT", {
            url: route.put(comment_id),
            data: {
              content,
              postType,
              [resolveTypeIdName()]: postId,
            },
          })

          if (error !== null) {
            toast({
              variant: "danger",
              description: (error as AxiosError<ErrorResponse>)?.response?.data
                ?.message as string,
            })
            console.log(error)
          } else if (data) {
            const newComments = comments.map((comment) =>
              comment.id === comment_id ? { ...comment, ...data } : comment,
            )
            setComments(newComments)
            setEditingId("")
            toast({
              variant: "success",
              description: "Komentar berhasil diperbarui",
            })
          }
        } catch (error) {
          console.error(error)
        }
      }
    }

    return (
      <div ref={ref}>
        <div className="flex items-center justify-center">
          <Button
            aria-label="Comments"
            onClick={() => {
              getComments()
              setShowComments(!showComments)
            }}
          >
            <Icon.Comment className="-ml-1 mr-2 h-4 w-4" /> Comments
          </Button>
        </div>

        {showComments && (
          <div
            className={`bg-foreground/60 fixed inset-0 z-[100] backdrop-blur-sm backdrop-filter`}
            onClick={() => {
              setShowComments(!showComments)
            }}
          ></div>
        )}

        <div
          className={`scrollbar bg-background fixed right-0 top-0 z-[999] h-screen w-full translate-x-full overflow-y-auto p-4 transition-transform md:max-w-[27rem] ${
            showComments && "transform-none"
          }`}
          tabIndex={-1}
        >
          <div className="mb-4">
            <h5
              id="drawer-label"
              className="text-foreground inline-flex items-center text-lg font-semibold"
            >
              <Icon.Comment
                aria-label="Comments"
                className="ml-1 mr-2 h-4 w-4"
              />
              Comments ({comments.length})
            </h5>
            <button
              aria-label="Close Menu"
              type="button"
              className="text-foreground hover:bg-background/20 hover:text-foreground/70 absolute right-2.5 top-2.5 inline-flex items-center rounded-lg bg-transparent p-1.5 text-sm"
              onClick={() => {
                setShowComments(!showComments)
              }}
            >
              <Icon.Close
                aria-label="Close Menu"
                className="h-5 w-5"
                aria-hidden="true"
              />
              <span className="sr-only">Close menu</span>
            </button>
          </div>
          <form onSubmit={handleSubmit}>
            <Textarea
              rows={3}
              name="comment"
              placeholder="Write comment…"
              ref={commentRef}
              autoComplete="off"
            />
            <Button
              type="submit"
              aria-label="Submit"
              className="ml-auto block"
              size="sm"
            >
              Submit
            </Button>
          </form>

          <hr className="bg-background/20 my-4 h-px border-0"></hr>

          <ul className="flex flex-col overscroll-auto">
            {comments.map((comment: CommentProps, index: number) => {
              let content = comment.content
              const created_at = dayjs(
                comment.createdAt,
                "YYYY-MM-DDTHH:mm:ss.sssZ",
              ).fromNow()

              return (
                <li className="flex flex-col" key={comment.id}>
                  <div className="flex justify-between">
                    <figcaption className="mb-2 flex items-center justify-start gap-2">
                      {comment.author?.profilePicture ? (
                        <Image
                          src={comment.author.profilePicture.url as string}
                          className="relative aspect-square h-10 w-10 overflow-hidden rounded-full"
                          alt={comment.author.name}
                        />
                      ) : (
                        <Icon.Account
                          aria-label={comment.author?.name}
                          className="text-foreground h-10 w-10"
                        />
                      )}

                      <div className="space-y-0.5 text-left text-sm font-medium">
                        <div>{comment.author?.name}</div>
                        <div className="text-foreground text-xs">
                          {created_at}
                        </div>
                      </div>
                    </figcaption>

                    {user?.role === "ADMIN" ||
                    user?.id === comment.author?.id ? (
                      <DropdownMenu>
                        <DropdownMenuTrigger>
                          <Button
                            aria-label="Show Menu"
                            id="dropdownMenuIconButton"
                            data-dropdown-toggle="dropdownDots"
                            type="button"
                            variant="ghost"
                          >
                            <Icon.MoreVert
                              aria-label="Show Menu"
                              className="h-5 w-5"
                            />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                          <DropdownMenuItem className="p-0">
                            <Button
                              variant="ghost"
                              aria-label="Edit"
                              onClick={() => {
                                setEditingId(comment.id)
                              }}
                              className="w-full justify-start"
                            >
                              <Icon.Edit
                                aria-label="Edit"
                                className="h-5 w-5"
                              />
                              Edit
                            </Button>
                          </DropdownMenuItem>
                          <DropdownMenuItem className="p-0">
                            <Button
                              variant="ghost"
                              aria-label="Delete"
                              onClick={() => {
                                handleDeleteComment(comment)
                              }}
                              className="w-full justify-start"
                            >
                              <Icon.Delete
                                aria-label="Delete"
                                className="h-5 w-5"
                              />
                              Delete
                            </Button>
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    ) : (
                      ""
                    )}
                  </div>

                  <div>
                    <div
                      className="mb-2 w-full"
                      onDoubleClick={() => {
                        setEditingId(comment.id)
                      }}
                    >
                      <EditableParagraph
                        id={comment.id}
                        text={content}
                        onSave={({ text }: { text: string }) => {
                          handleUpdateComment(comment.id, text)
                        }}
                        onCancel={() => {
                          setEditingId("")
                        }}
                        isEditing={
                          comment?.id && editingId === comment.id ? true : false
                        }
                      />
                    </div>
                  </div>

                  {index < comments.length && (
                    <hr className="bg-background/20 my-4 h-px border-0"></hr>
                  )}
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    )
  },
)
