import { TopUpRating } from "@prisma/client"
import db from "../../utils/db"
import { CreateTopUpReviewInput } from "./top-up-review.schema"

export async function createTopUpReview(
  data: CreateTopUpReviewInput & {
    authorId: string
  },
) {
  const { content, brand, rating, authorId } = data

  let createdTopUpRating
  const existingRating = await db.topUpRating.findFirst({
    where: {
      authorId,
      brand,
    },
  })

  if (existingRating && rating) {
    createdTopUpRating = await db.topUpRating.update({
      where: { id: existingRating.id },
      data: { rating },
    })
  } else if (rating) {
    createdTopUpRating = await db.topUpRating.create({
      data: {
        authorId,
        brand,
        rating,
      },
    })
  }

  const createdTopUpReview = await db.topUpReview.create({
    data: {
      content,
      brand,
      authorId,
      ratings: createdTopUpRating
        ? {
            connect: { id: createdTopUpRating.id },
          }
        : undefined,
    },
    select: {
      id: true,
      content: true,
      brand: true,
      createdAt: true,
      updatedAt: true,
      author: {
        select: {
          id: true,
          name: true,
          profilePicture: {
            select: {
              url: true,
            },
          },
        },
      },
      ratings: true,
      replies: true,
    },
  })

  return {
    ...createdTopUpReview,
    topUpRatings: createdTopUpRating ? [createdTopUpRating] : [],
  }
}
export async function updateTopUpReview({
  reviewId,
  content,
}: {
  reviewId: string
  content: string
}) {
  const createdTopUpReview = await db.topUpReview.update({
    where: {
      id: reviewId,
    },
    data: {
      content,
    },
    select: {
      id: true,
      content: true,
      brand: true,
      createdAt: true,
      updatedAt: true,
      author: {
        select: {
          id: true,
          name: true,
          profilePicture: {
            select: {
              url: true,
            },
          },
        },
      },
      ratings: true,
      replies: true,
    },
  })

  return {
    ...createdTopUpReview,
  }
}

export async function createTopUpReply(data: {
  authorId: string
  reviewId: string
  content: string
}) {
  const { content, reviewId, authorId } = data
  const reply = await db.topUpReviewReply.create({
    data: {
      content,
      authorId,
      reviewId,
    },
    select: {
      id: true,
      content: true,
      createdAt: true,
      updatedAt: true,
      author: {
        select: {
          id: true,
          name: true,
          profilePicture: {
            select: {
              url: true,
            },
          },
        },
      },
    },
  })

  return reply
}

export async function updateTopUpReply({
  replyId,
  content,
}: {
  replyId: string
  content: string
}) {
  return await db.topUpReviewReply.update({
    where: { id: replyId },
    data: { content },
    select: {
      id: true,
      content: true,
      createdAt: true,
      updatedAt: true,
      author: {
        select: {
          id: true,
          name: true,
          profilePicture: {
            select: {
              url: true,
            },
          },
        },
      },
    },
  })
}

export async function getTopUpRatingByQuery(where: {
  brand: string
  authorId: string
}): Promise<TopUpRating | null> {
  return await db.topUpRating.findFirst({
    where,
  })
}

export async function createTopUpRating({
  brand,
  authorId,
  rating,
}: {
  brand: string
  authorId: string
  rating: number
}): Promise<TopUpRating> {
  return await db.topUpRating.create({
    data: {
      authorId,
      brand,
      rating,
    },
  })
}

export async function updateTopUpRating({
  id,
  rating,
}: {
  id: string
  rating: number
}): Promise<TopUpRating> {
  return await db.topUpRating.update({
    where: { id },
    data: { rating },
  })
}

export async function getTotalRatingByBrand(brand: string) {
  return await db.topUpRating.groupBy({
    by: ["rating", "brand"],
    _count: {
      rating: true,
    },
    where: {
      brand,
      OR: [
        {
          rating: 5,
        },
        {
          rating: -5,
        },
      ],
    },
  })
}

export async function getTopUpReviewsByBrand({
  topUpReviewPage,
  perPage,
  brand,
}: {
  brand?: string
  topUpReviewPage: number
  perPage: number
}) {
  const topUpReviews = await db.topUpReview.findMany({
    orderBy: {
      createdAt: "desc",
    },
    where: {
      brand,
    },
    skip: (topUpReviewPage - 1) * perPage,
    take: perPage,
    select: {
      id: true,
      content: true,
      brand: true,
      createdAt: true,
      updatedAt: true,
      author: {
        select: {
          id: true,
          name: true,
          profilePicture: {
            select: {
              url: true,
            },
          },
        },
      },
      ratings: true,
      replies: {
        select: {
          id: true,
          content: true,
          createdAt: true,
          updatedAt: true,
          author: {
            select: {
              id: true,
              name: true,
              profilePicture: {
                select: {
                  url: true,
                },
              },
            },
          },
        },
      },
    },
  })

  return topUpReviews
}

export async function getTopUpReviews(
  topUpReviewPage: number,
  perPage: number,
) {
  return await db.topUpReview.findMany({
    orderBy: {
      createdAt: "desc",
    },
    skip: (topUpReviewPage - 1) * perPage,
    take: perPage,
    select: {
      content: true,
      id: true,
      createdAt: true,
      updatedAt: true,
      author: {
        select: {
          id: true,
          name: true,
          profilePicture: {
            select: {
              url: true,
            },
          },
        },
      },
    },
  })
}

export async function findTopUpReviewById(reviewId: string) {
  return await db.topUpReview.findUnique({
    where: { id: reviewId },
    select: {
      content: true,
      id: true,
      createdAt: true,
      updatedAt: true,
      author: {
        select: {
          id: true,
          name: true,
          profilePicture: {
            select: {
              url: true,
            },
          },
        },
      },
    },
  })
}

export async function searchTopUpReviews(searchTopUpReviewQuery: string) {
  return await db.topUpReview.findMany({
    where: {
      content: { contains: searchTopUpReviewQuery },
    },
    select: {
      content: true,
      id: true,
      createdAt: true,
      updatedAt: true,
      author: {
        select: {
          id: true,
          name: true,
          profilePicture: {
            select: {
              url: true,
            },
          },
        },
      },
    },
  })
}

export async function deleteTopUpReplyById({ replyId }: { replyId: string }) {
  return await db.topUpReviewReply.deleteMany({
    where: {
      id: replyId,
    },
  })
}

export async function deleteTopUpReviewById({
  reviewId,
}: {
  reviewId: string
}) {
  await db.topUpRating.deleteMany({
    where: {
      reviewId: reviewId,
    },
  })

  await db.topUpReviewReply.deleteMany({
    where: {
      reviewId: reviewId,
    },
  })

  return db.topUpReview.deleteMany({
    where: {
      id: reviewId,
    },
  })
}

export async function getTotalTopUpReviews() {
  return await db.topUpReview.count()
}
