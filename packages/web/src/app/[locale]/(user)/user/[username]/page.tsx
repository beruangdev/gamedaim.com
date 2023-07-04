import * as React from "react"
import NextLink from "next/link"
import { BreadcrumbJsonLd } from "next-seo"
import { HiOutlineCalendar, HiOutlineUser } from "react-icons/hi"

import env from "env"
import { ArticleCardVertical } from "@/components/Card"
import { Image } from "@/components/Image"
import { ArticleDataProps, LanguageTypeData } from "@/lib/data-types"
import { formatDate } from "@/utils/date"
import { getUserByUsernameAction } from "@/lib/api/server/user"

interface UserPageProps {
  params: {
    username: string
    locale: LanguageTypeData
  }
}

export default async function UserPage({ params }: UserPageProps) {
  const { locale } = params
  const { data: user } = await getUserByUsernameAction(params.username)

  return (
    <>
      <BreadcrumbJsonLd
        useAppDir={true}
        itemListElements={[
          {
            position: 1,
            name: locale === "id" ? env.DOMAIN : env.EN_SUBDOMAIN,
          },
          {
            position: 2,
            name: user?.name,
            item:
              locale === "id"
                ? `${env.SITE_URL}/user/${user?.username}`
                : `${env.EN_SITE_URL}/user/${user?.username}`,
          },
        ]}
      />
      <div className="space-y-4">
        <div className="border-border rounded border p-5">
          <div className=" flex justify-between">
            <div className="flex flex-row space-x-8">
              {user?.profilePicture ? (
                <Image
                  src={user?.profilePicture.url}
                  alt={user?.name}
                  height={100}
                  width={100}
                  className="border-border h-[100px] w-[100px] rounded-full border-2 object-cover shadow"
                />
              ) : (
                <HiOutlineUser className="bg-muted/60 border-border text-foreground/80 h-[100px] w-[100px] rounded-full border-2 object-cover p-2 shadow" />
              )}
              <div className="space-y-2">
                <h1>{user?.name}</h1>
                <p className="text-sm">@{user?.username}</p>
                <p className="max-w-sm whitespace-nowrap">{user?.about}</p>
              </div>
            </div>
          </div>
          <div className="mt-4 flex items-center justify-center text-sm">
            <HiOutlineCalendar className="mr-1 h-4 w-4" />
            <p>Member since {formatDate(user?.createdAt as string, "LL")}</p>
          </div>
        </div>
        {user?.articleAuthors && (
          <div className="flex w-full flex-col">
            <div className="my-2 flex flex-row items-center justify-between">
              <h2 className="text-2xl">Articles</h2>
              <NextLink
                className="text-sm"
                href={`/article/user/${user.username}`}
              >
                See more
              </NextLink>
            </div>
            {user.articleAuthors.length > 0 ? (
              <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                {user.articleAuthors.map((article: ArticleDataProps) => {
                  return (
                    <ArticleCardVertical key={article.id} article={article} />
                  )
                })}
              </div>
            ) : (
              <h3 className="my-16 text-center text-3xl">Article Not Found</h3>
            )}
          </div>
        )}
      </div>
    </>
  )
}
