import React from "react"
import { http } from "@/lib/http"
import { ErrorResponse, UserDataProps } from "@/lib/data-types"
import { useCurrentUser } from "@/hooks/use-current-user"
import dayjs from "dayjs"
import relativeTime from "dayjs/plugin/relativeTime"
dayjs.extend(relativeTime)

import { AxiosError } from "axios"
import { TopUpEditableParagraph } from "./TopUpEditableParagraph"
import { Button } from "../Button"
import { Textarea } from "../Textarea"
import { toast } from "../Toast"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../DropdownMenu"
import { Icon } from "../Icon"

interface TopUpReviewProps {
  id: string
  content: string
  brand: string
  authorId: string
  author?: UserDataProps | null
  ratings: TopUpRatingProps[]
  replies: TopUpReplyProps[]
  createdAt: Date
  updatedAt: Date
}

interface TopUpReplyProps {
  id: string
  content: string
  reviewId: string
  review: TopUpReviewProps
  author?: UserDataProps | null
  authorId?: string
  createdAt?: Date
  updatedAt?: Date
}

export interface TopUpRatingProps {
  id: string
  reviewId?: string | null
  authorId: string
  author?: UserDataProps | null
  rating: number
  brand: string
  createdAt: Date
  updatedAt: Date
  topUpCommentId?: string | null
}

interface TotalTopUpRatingsProps {
  like: number
  dislike: number
  total: number
  likePercentage: number
  dislikePercentage: number
  totalComments: number
}

interface HandleStoreTopUpReplyProps {
  reviewId: string
  content: string
  topUpReplyRef: React.RefObject<HTMLTextAreaElement>
}

interface HandleUpdateTopUpReplyProps {
  reviewId: string
  replyId: string
  content: string
}

interface HandleDeleteTopUpReplyProps {
  reviewId: string
  replyId: string
}

const TopUpReviewItem = ({
  topUpReview,
  handleDeleteTopUpReview,
  handleStoreTopUpReply,
  handleDeleteTopUpReply,
  handleUpdateTopUpReview,
  handleUpdateTopUpReply,
}: {
  topUpReview: TopUpReviewProps
  handleDeleteTopUpReview: (reviewId: string) => void
  handleStoreTopUpReply: (topUpReply: HandleStoreTopUpReplyProps) => void
  handleDeleteTopUpReply: (replyId: HandleDeleteTopUpReplyProps) => void
  handleUpdateTopUpReply: (props: HandleUpdateTopUpReplyProps) => void
  handleUpdateTopUpReview: ({
    reviewId,
    content,
  }: {
    reviewId: string
    content: string
  }) => void
}) => {
  const { user } = useCurrentUser()
  const [isEditing, setIsEditing] = React.useState(false)
  const created_at = dayjs(
    topUpReview.createdAt,
    "YYYY-MM-DDTHH:mm:ss.sssZ",
  ).fromNow()

  let rating = 0
  if (
    topUpReview?.ratings &&
    Array.isArray(topUpReview?.ratings) &&
    topUpReview?.ratings.length
  ) {
    rating = topUpReview.ratings[0].rating
  }

  return (
    <div className="mb-6 flex gap-2">
      <Icon.Account className="h-8 w-8 text-gray-400" />
      <div className="flex flex-1 flex-col">
        <div className="mb-2 rounded-lg bg-gray-100 px-3 py-2 dark:bg-gray-700">
          <div className="flex items-center gap-3">
            <h5 className="text-base font-bold">{topUpReview.author?.name}</h5>
            {Number(rating) === 5 && (
              <div className="flex items-center gap-1">
                <div className="h-fit rounded-full bg-gray-200 p-1">
                  <Icon.ThumbUp className="h-3 w-3 text-green-500" />
                </div>
                <p>puas</p>
              </div>
            )}
            {Number(rating) === -5 && (
              <div className="flex items-center gap-1">
                <div className="h-fit rounded-full bg-gray-200 p-1">
                  <Icon.ThumbDown className="h-3 w-3 text-red-500" />
                </div>
                <p>tidak puas</p>
              </div>
            )}

            <div className="ml-auto">
              {" "}
              {user?.role === "ADMIN" || user?.id === topUpReview.authorId ? (
                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <Button
                      aria-label="Show Menu"
                      id="dropdownMenuIconButton"
                      data-dropdown-toggle="dropdownDots"
                      className="text-theme-900 focus:ring-theme-50 dark:focus:ring-theme-600 inline-flex items-center rounded-lg p-2 text-center text-sm font-medium focus:outline-none focus:ring-4 dark:text-white"
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
                    <div className="devide-y divide-theme-100 dark:divide-theme-600">
                      <div className="text-theme-700 dark:text-theme-200 flex flex-col py-1 text-sm">
                        <DropdownMenuItem className="">
                          <Button
                            variant="ghost"
                            aria-label="Edit"
                            onClick={() => {
                              setIsEditing(true)
                            }}
                            className="text-theme-700 hover:bg-theme-100 dark:text-theme-200 dark:hover:bg-theme-600 flex w-full items-center justify-start gap-2 px-4 py-2 text-sm dark:hover:text-white"
                          >
                            <Icon.Edit aria-label="Edit" className="h-5 w-5" />
                            Edit
                          </Button>
                        </DropdownMenuItem>
                        <DropdownMenuItem className="">
                          <Button
                            variant="ghost"
                            aria-label="Delete"
                            onClick={() => {
                              handleDeleteTopUpReview(topUpReview.id)
                            }}
                            className="text-theme-700 hover:bg-theme-100 dark:text-theme-200 dark:hover:bg-theme-600 flex items-center justify-start gap-2 px-4 py-2 text-sm  dark:hover:text-white"
                          >
                            <Icon.Delete
                              aria-label="Delete"
                              className="h-5 w-5"
                            />
                            Delete
                          </Button>
                        </DropdownMenuItem>
                      </div>
                    </div>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                ""
              )}
            </div>
          </div>
          <div
            className="mb-2 w-full"
            onDoubleClick={() => {
              setIsEditing(true)
            }}
          >
            <TopUpEditableParagraph
              id={topUpReview.id}
              text={topUpReview.content}
              onSave={({ text }) => {
                handleUpdateTopUpReview({
                  reviewId: topUpReview.id,
                  content: text,
                })
              }}
              onCancel={() => {
                setIsEditing(false)
              }}
              isEditing={isEditing}
            />
          </div>
        </div>
        <div
          className={`flex items-center gap-3 ${
            topUpReview?.replies?.length > 0 ? "mb-4" : "mb-0"
          }`}
        >
          <Icon.AccessTime />
          <p>{created_at}</p>
        </div>
        <div className="mb-3">
          {topUpReview?.replies?.map((topUpReply: TopUpReplyProps) => (
            <div className="border-l-2 pl-2 dark:border-gray-600">
              <TopUpReplyItem
                key={topUpReply.id}
                reviewId={topUpReview.id}
                topUpReply={topUpReply}
                handleUpdateTopUpReply={handleUpdateTopUpReply}
                handleDeleteTopUpReply={handleDeleteTopUpReply}
              />
            </div>
          ))}
        </div>
        <div className="mb-4">
          <TopUpReplyForm
            reviewId={topUpReview.id}
            handleStoreTopUpReply={handleStoreTopUpReply}
          />
        </div>
      </div>
    </div>
  )
}

function TopUpReplyItem({
  reviewId,
  topUpReply,
  handleDeleteTopUpReply,
  handleUpdateTopUpReply,
}: {
  reviewId: string
  topUpReply: TopUpReplyProps
  handleDeleteTopUpReply: (props: HandleDeleteTopUpReplyProps) => void
  handleUpdateTopUpReply: (props: HandleUpdateTopUpReplyProps) => void
}) {
  const { user } = useCurrentUser()
  const [isEditing, setIsEditing] = React.useState(false)
  return (
    <div className="flex">
      <div className="flex basis-1/12 justify-center py-2">
        <Icon.Account className="h-8 w-8 text-gray-400" />
      </div>
      <div className="flex-1">
        <div className="mb-2 rounded-lg bg-gray-100 px-3 py-2 dark:bg-gray-700">
          <div className="flex items-start gap-3">
            <h5 className="text-base font-bold">{topUpReply.author?.name}</h5>
            <div className="ml-auto">
              {" "}
              {user?.role === "ADMIN" || user?.id === topUpReply.authorId ? (
                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <Button
                      aria-label="Show Menu"
                      id="dropdownMenuIconButton"
                      data-dropdown-toggle="dropdownDots"
                      className="text-theme-900 focus:ring-theme-50 dark:focus:ring-theme-600 inline-flex items-center rounded-lg p-2 text-center text-sm font-medium focus:outline-none focus:ring-4 dark:text-white"
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
                    <div className="devide-y divide-theme-100 dark:divide-theme-600">
                      <div className="text-theme-700 dark:text-theme-200 flex flex-col py-1 text-sm">
                        <DropdownMenuItem className="">
                          <Button
                            variant="ghost"
                            aria-label="Edit"
                            onClick={() => {
                              setIsEditing(true)
                            }}
                            className="text-theme-700 hover:bg-theme-100 dark:text-theme-200 dark:hover:bg-theme-600 flex w-full items-center justify-start gap-2 px-4 py-2 text-sm dark:hover:text-white"
                          >
                            <Icon.Edit aria-label="Edit" className="h-5 w-5" />
                            Edit
                          </Button>
                        </DropdownMenuItem>
                        <DropdownMenuItem className="">
                          <Button
                            variant="ghost"
                            aria-label="Delete"
                            onClick={() => {
                              handleDeleteTopUpReply({
                                reviewId,
                                replyId: topUpReply.id,
                              })
                            }}
                            className="flex items-center justify-start gap-2 px-4 py-2 text-sm"
                          >
                            <Icon.Delete
                              aria-label="Delete"
                              className="h-5 w-5"
                            />
                            Delete
                          </Button>
                        </DropdownMenuItem>
                      </div>
                    </div>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                ""
              )}
            </div>
          </div>
          <div>
            <div
              className="mb-2 w-full"
              onDoubleClick={() => {
                setIsEditing(true)
              }}
            >
              <TopUpEditableParagraph
                id={topUpReply.id}
                text={topUpReply.content}
                onSave={({ text }) => {
                  handleUpdateTopUpReply({
                    reviewId,
                    replyId: topUpReply.id,
                    content: text,
                  })
                }}
                onCancel={() => {
                  setIsEditing(false)
                }}
                isEditing={isEditing}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const ReviewForm = ({
  handleStoreReview,
  loading,
  topUpReviewRef,
}: {
  handleStoreReview: (e: React.FormEvent<HTMLFormElement>) => void
  loading: boolean
  topUpReviewRef: React.RefObject<HTMLTextAreaElement>
}) => {
  return (
    <div className="flex gap-2 rounded-lg bg-yellow-100/50 px-6 py-8">
      <Icon.Account className="h-10 w-10" />
      <form
        className="flex flex-1 flex-col gap-3"
        method="post"
        onSubmit={handleStoreReview}
      >
        <Textarea
          ref={topUpReviewRef}
          placeholder="Tulis ulasanmu..."
          rows={2}
          name="content"
          disabled={loading}
        />
        <div className="flex items-center justify-between gap-4">
          <ul className="flex items-center gap-4">
            <li>
              <input
                disabled={loading}
                type="radio"
                id="rating-like"
                name="rating"
                value="5"
                className="peer hidden"
              />
              <label
                htmlFor="rating-like"
                className="inline-flex cursor-pointer items-center justify-between rounded-lg border border-gray-200 bg-white px-6 py-2 text-gray-500 hover:bg-gray-100 hover:text-gray-600 peer-checked:border-green-600 peer-checked:text-green-600 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300 dark:peer-checked:text-green-500"
              >
                <Icon.ThumbUp className="h-4 w-4 text-green-500" />
              </label>
            </li>
            <li>
              <input
                disabled={loading}
                type="radio"
                id="rating-dislike"
                name="rating"
                value="-5"
                className="peer hidden"
              />
              <label
                htmlFor="rating-dislike"
                className="inline-flex cursor-pointer items-center justify-between rounded-lg border border-gray-200 bg-white px-6 py-2 text-gray-500 hover:bg-gray-100 hover:text-gray-600 peer-checked:border-red-600 peer-checked:text-red-600 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300 dark:peer-checked:text-red-500"
              >
                <Icon.ThumbDown className="h-4 w-4 text-red-500" />
              </label>
            </li>
          </ul>
          <div>
            <Button
              size="sm"
              type="submit"
              loading={loading}
              className="bg-orange-600"
            >
              SEND
            </Button>
          </div>
        </div>
      </form>
    </div>
  )
}

const TopUpReplyForm = ({
  reviewId,
  handleStoreTopUpReply,
}: {
  reviewId: string
  handleStoreTopUpReply: (topUpReply: HandleStoreTopUpReplyProps) => void
}) => {
  const topUpReplyRef = React.useRef<HTMLTextAreaElement>(null)
  const [loading, setLoading] = React.useState(false)
  async function handleSubmitReply(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    setLoading(true)

    const formData = new FormData(event.currentTarget)
    const { content } = Object.fromEntries(formData.entries())

    handleStoreTopUpReply({
      content: content as string,
      reviewId,
      topUpReplyRef,
    })

    setLoading(false)
  }
  return (
    <div className="flex gap-2 rounded-lg bg-yellow-100/50 p-4 dark:bg-gray-900/40">
      <Icon.Account className="h-10 w-10 text-gray-400" />
      <form
        className="flex flex-1 gap-3"
        method="post"
        onSubmit={handleSubmitReply}
      >
        <Textarea
          ref={topUpReplyRef}
          placeholder="Tulis balasanmu..."
          rows={1}
          name="content"
          disabled={loading}
        />

        <Button
          size="sm"
          type="submit"
          loading={loading}
          className="mt-2 bg-orange-600"
        >
          BALAS
        </Button>

        <input
          type="text"
          hidden={true}
          name="reviewId"
          value={reviewId}
          className="hidden"
        />
      </form>
    </div>
  )
}

const RatingCard = ({
  handleRatingPost,
  totalRatings,
}: {
  handleRatingPost: ({ rating }: { rating: number }) => void
  totalRatings: TotalTopUpRatingsProps
}) => {
  const likePercentage = Number(totalRatings.likePercentage.toFixed(2)) || 0
  return (
    <div className="flex flex-col overflow-hidden rounded-xl border dark:border-gray-600">
      <div className="flex items-center justify-center bg-emerald-600 py-9">
        <p className="text-7xl font-bold text-white">{likePercentage}%</p>
      </div>
      <div className="flex flex-col items-center py-3">
        <p className="font-bold">{likePercentage}% pembeli merasa puas</p>
        <p>
          {totalRatings.total} rating . {totalRatings.totalComments} ulasan
        </p>
        <hr className="my-4 h-px w-full border-0 bg-gray-100 dark:bg-gray-600" />

        <p className="mb-7 font-bold">BERIKAN RATINGMU</p>

        <div className="mb-6 flex items-center gap-20">
          <button
            type="button"
            className="h-fit rounded-full bg-gray-200 px-6 py-2"
            onClick={() => {
              handleRatingPost({ rating: 5 })
            }}
          >
            <Icon.ThumbUp className="h-6 w-6 text-green-500" />
          </button>
          <button
            type="button"
            className="h-fit rounded-full bg-gray-200 px-6 py-2"
            onClick={() => {
              handleRatingPost({ rating: -5 })
            }}
          >
            <Icon.ThumbDown className="h-6 w-6 text-red-500" />
          </button>
        </div>

        <div className="mb-3 flex w-full items-center gap-4 px-6">
          <div className="h-fit rounded-full bg-gray-200 p-1">
            <Icon.ThumbUp className="h-3 w-3 text-green-500" />
          </div>

          <div className="flex-1 overflow-hidden rounded-lg bg-gray-200 dark:bg-gray-300">
            <div
              className={`h-3 w-0 rounded-lg bg-green-600`}
              style={{
                width: `${totalRatings.likePercentage}%`,
              }}
            ></div>
          </div>

          <div className="w-9 text-right">{totalRatings.like}</div>
        </div>

        <div className="mb-3 flex w-full items-center gap-4 px-6">
          <div className="h-fit rounded-full bg-gray-200 p-1">
            <Icon.ThumbDown className="h-3 w-3 text-red-500" />
          </div>

          <div className="flex-1 overflow-hidden rounded-lg bg-gray-200 dark:bg-gray-300">
            <div
              className="h-3 w-0 rounded-lg bg-red-500"
              style={{
                width: `${totalRatings.dislikePercentage}%`,
              }}
            ></div>
          </div>

          <div className="w-9 text-right">{totalRatings.dislike}</div>
        </div>
      </div>
    </div>
  )
}

export const TopUpCommentForm = ({ brand }: { brand: string }) => {
  const [loading, setLoading] = React.useState(false)
  const [topUpReviews, setTopUpReviews] = React.useState<
    TopUpReviewProps[] | []
  >([])
  const [totalRatings, setTotalRatings] =
    React.useState<TotalTopUpRatingsProps>({
      like: 0,
      dislike: 0,
      total: 0,
      likePercentage: 0,
      dislikePercentage: 0,
      totalComments: 0,
    })
  const topUpReviewRef = React.useRef<HTMLTextAreaElement>(null)

  const { user } = useCurrentUser()

  const getTotalRatings = React.useCallback(async () => {
    const [ratings, error] = await http<
      | {
          _count: {
            rating: number
          }
          rating: number
          brand: string
        }[]
    >("GET", {
      url: `top-up-review/total/by-brand/${brand}`,
    })

    if (error !== null) {
      toast({
        variant: "danger",
        description: (error as AxiosError<ErrorResponse>)?.response?.data
          ?.message as string,
      })
      console.log(error)
      return
    } else if (ratings) {
      let like = 0,
        dislike = 0,
        total = 0,
        likePercentage = 0,
        dislikePercentage = 0

      for (let index = 0; index < ratings.length; index++) {
        const rating = ratings[index]
        if (rating.rating === 5) like = rating._count.rating
        else if (rating.rating === -5) dislike = rating._count.rating
      }
      total = like + dislike
      likePercentage = (like / total) * 100
      dislikePercentage = (dislike / total) * 100
      setTotalRatings({
        like,
        dislike,
        total,
        likePercentage,
        dislikePercentage,
        totalComments: topUpReviews.length,
      })
    }
  }, [brand, topUpReviews])

  const getComments = React.useCallback(async () => {
    const [data, error] = await http<TopUpReviewProps[] | null>("GET", {
      url: `top-up-review/by-brand/${brand}`,
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
      setTopUpReviews(data)
    }
  }, [brand])

  React.useEffect(() => {
    getTotalRatings()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [topUpReviews])

  React.useEffect(() => {
    setLoading(false)
    getComments()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  async function handleStoreReview(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)

    const formData = new FormData(e.currentTarget)
    const { content, rating } = Object.fromEntries(formData.entries())

    const [data, error] = await http<TopUpReviewProps | null>("POST", {
      url: `top-up-review`,
      data: {
        brand,
        content,
        rating: Number(rating),
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
      if (topUpReviewRef.current) topUpReviewRef.current.value = ""
      setTopUpReviews([
        ...topUpReviews,
        {
          ...data,
          author: user,
        },
      ])
    }

    setLoading(false)
  }

  async function handleUpdateTopUpReview({
    reviewId,
    content,
  }: {
    reviewId: string
    content: string
  }) {
    setLoading(true)

    const [data, error] = await http<TopUpReviewProps | null>("PUT", {
      url: `top-up-review/${reviewId}`,
      data: {
        content,
        brand,
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
        description: "Review is updated",
      })
      setTopUpReviews([
        ...topUpReviews.map((topUpReview) => {
          if (topUpReview.id === reviewId) {
            return {
              ...topUpReview,
              content,
            }
          }
          return topUpReview
        }),
      ])
    }

    setLoading(false)
  }

  async function handleDeleteTopUpReview(reviewId: string) {
    const [data, error] = await http<TopUpReviewProps | null>("DELETE", {
      url: `top-up-review/${reviewId}`,
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
        description: "Comment is deleted",
      })
      const newTopUpReviews = topUpReviews.filter((c) => c.id !== reviewId)
      setTopUpReviews(newTopUpReviews)
    }
  }

  async function handleRatingPost({ rating }: { rating: number }) {
    setLoading(true)

    const [data, error] = await http<TopUpRatingProps | null>("POST", {
      url: `top-up-review/rating`,
      data: {
        brand,
        rating: Number(rating),
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
        description: "Rating is updated",
      })
      getTotalRatings()
    }

    setLoading(false)
  }

  async function handleStoreTopUpReply({
    reviewId,
    content,
    topUpReplyRef,
  }: HandleStoreTopUpReplyProps) {
    const [data, error] = await http<TopUpReplyProps | null>("POST", {
      url: `top-up-review/reply`,
      data: {
        reviewId,
        content,
      },
    })

    if (error !== null) {
      toast({
        variant: "danger",
        description: (error as AxiosError<ErrorResponse>)?.response?.data
          ?.message as string,
      })
      console.log(error)
      return false
    } else if (data) {
      toast({
        variant: "success",
        description: "Reply is created",
      })
      if (topUpReplyRef.current) topUpReplyRef.current.value = ""
      setTopUpReviews([
        ...topUpReviews.map((topUpReview) => {
          if (topUpReview.id === reviewId) {
            return {
              ...topUpReview,
              replies: [
                ...topUpReview.replies,
                {
                  ...data,
                },
              ],
            }
          }
          return topUpReview
        }),
      ])
    }
    return true
  }

  async function handleUpdateTopUpReply({
    reviewId,
    replyId,
    content,
  }: HandleUpdateTopUpReplyProps) {
    setLoading(true)

    const [data, error] = await http<TopUpReplyProps | null>("PUT", {
      url: `top-up-review/reply`,
      data: {
        replyId,
        content,
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
        description: "Reply is updated",
      })
      setTopUpReviews([
        ...topUpReviews.map((topUpReview) => {
          if (topUpReview.id === reviewId) {
            return {
              ...topUpReview,
              replies: topUpReview.replies.map((reply) => {
                if (reply.id === replyId) {
                  return {
                    ...reply,
                    content,
                  }
                }
                return reply
              }),
            }
          }
          return topUpReview
        }),
      ])
    }

    setLoading(false)
  }

  async function handleDeleteTopUpReply({
    reviewId,
    replyId,
  }: HandleDeleteTopUpReplyProps) {
    const [data, error] = await http<TopUpReviewProps | null>("DELETE", {
      url: `top-up-review/reply`,
      data: {
        replyId,
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
        description: "Reply is deleted",
      })
      let newReviews = []
      for (let i = 0; i < topUpReviews.length; i++) {
        if (topUpReviews[i].id === reviewId) {
          newReviews.push({
            ...topUpReviews[i],
            replies: topUpReviews[i].replies.filter((r) => r.id !== replyId),
          })
        } else {
          newReviews.push(topUpReviews[i])
        }
      }
      setTopUpReviews(newReviews)
    }
  }

  return (
    <div className="mt-3 flex flex-wrap md:mt-0">
      {/* Left */}
      <div className="order-2 flex-col pr-4 md:order-1 md:basis-8/12">
        <h3 className="mb-3 text-xl font-bold">BERIKAN ULASAN</h3>

        {/* Comment list */}
        <div className="mb-10">
          {topUpReviews.map((topUpReview, index) => {
            return (
              <TopUpReviewItem
                key={index}
                handleUpdateTopUpReview={handleUpdateTopUpReview}
                handleDeleteTopUpReview={handleDeleteTopUpReview}
                topUpReview={topUpReview}
                handleStoreTopUpReply={handleStoreTopUpReply}
                handleDeleteTopUpReply={handleDeleteTopUpReply}
                handleUpdateTopUpReply={handleUpdateTopUpReply}
              />
            )
          })}
        </div>

        {/* Comment Form */}
        <ReviewForm
          handleStoreReview={handleStoreReview}
          loading={loading}
          topUpReviewRef={topUpReviewRef}
        />
      </div>

      {/* Right */}
      <div className="order-1 mb-6 w-full md:order-2 md:basis-4/12">
        <RatingCard
          handleRatingPost={handleRatingPost}
          totalRatings={totalRatings}
        />
      </div>
    </div>
  )
}
