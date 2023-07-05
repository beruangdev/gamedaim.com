import * as React from "react"
import { BreadcrumbJsonLd, SiteLinksSearchBoxJsonLd } from "next-seo"

import env from "env"
import { MainContainer } from "@/components/Container/MainContainer"
import { Skeleton } from "@/components/UI/Skeleton"

import { wpGetAllPosts } from "@/lib/api/server/wp-posts"
import { getAdsByPositionAction } from "@/lib/api/server/ad"
import { IndexContent } from "./content"
import { type LanguageTypeData } from "@/lib/data-types"

export const revalidate = 60

interface IndexPageProps {
  params: {
    locale: LanguageTypeData
  }
}

export default async function IndexPage({ params }: IndexPageProps) {
  const locale = params.locale

  const { posts, pageInfo } = await wpGetAllPosts(locale.toLocaleUpperCase())
  const { data: adsBelowHeader } = await getAdsByPositionAction(
    "HOME_BELOW_HEADER",
  )
  return (
    <>
      <BreadcrumbJsonLd
        useAppDir={true}
        itemListElements={[
          {
            position: 1,
            name: locale === "id" ? env.DOMAIN : env.EN_SUBDOMAIN,
            item: locale === "id" ? env.SITE_URL : env.EN_SITE_URL,
          },
        ]}
      />
      <SiteLinksSearchBoxJsonLd
        useAppDir={true}
        url={locale === "id" ? env.SITE_URL : env.EN_SITE_URL}
        potentialActions={[
          {
            target: `${
              locale === "id" ? env.SITE_URL : env.EN_SITE_URL
            }/search?q`,
            queryInput: "search_term_string",
          },
        ]}
      />
      <React.Suspense
        fallback={
          <>
            <div className="left-auto top-0 -my-0 mx-auto box-border flex h-16 w-full items-center border-none px-2 py-0 align-baseline shadow-lg outline-none">
              <div className="relative ml-auto mr-auto grow px-3">
                <div className="h-full">
                  <div className="-ml-4 -mr-4 flex h-full flex-row flex-nowrap items-center">
                    <div>
                      <Skeleton className="h-4 w-4" />
                    </div>
                    <div className="flex min-w-0 max-w-full flex-shrink-0 flex-grow-0 basis-auto flex-col pl-4 pr-4">
                      <div className="flex w-full flex-row flex-wrap items-center justify-start pl-0 pr-0">
                        <div className="ak-bar-item ak-header-logo flex w-full flex-row flex-wrap items-center justify-start pl-0 pr-0">
                          <Skeleton className="relative h-[23px] w-[120px]" />
                        </div>
                      </div>
                    </div>
                    <div className="relative max-md:ml-auto md:ml-4 md:mr-auto lg:w-[40%] xl:w-[50%]">
                      <Skeleton className="lg-[23px] h-[23px] md:w-[400px]" />
                    </div>
                    <div className="grow-1 flex flex-row space-x-2">
                      <div className="hidden gap-2 lg:flex">
                        <Skeleton className="h-5 w-5" />
                        <Skeleton className="h-5 w-5" />
                        <Skeleton className="h-5 w-5" />
                        <Skeleton className="h-5 w-5" />
                      </div>
                      <div className="flex space-x-2">
                        <Skeleton className="h-5 w-5" />
                      </div>
                      <div>
                        <Skeleton className="h-5 w-5" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex w-full">
              {/* Side Nav Skeleton */}
              <div className="hidden w-[250px] lg:flex">
                <div className="border-muted flex flex-col space-y-3 border-b p-4">
                  <Skeleton className="h-6 w-40" />
                  <Skeleton className="h-6 w-40" />
                  <Skeleton className="h-6 w-40" />
                  <Skeleton className="h-6 w-40" />
                </div>
              </div>
              {/* Posts Skeleton */}
              <div className="mt-10 w-full lg:w-[calc(100%-250px)] lg:px-4">
                {/* Post Featured Skeleton */}
                <div className="mb-5 flex w-full overflow-hidden px-3">
                  <Skeleton className="mr-[15px] aspect-[8/16] h-[300px] rounded-xl md:aspect-[9/16]" />
                  <Skeleton className="mr-[15px] aspect-[8/16] h-[300px] rounded-xl md:aspect-[9/16]" />
                  <Skeleton className="mr-[15px] aspect-[8/16] h-[300px] rounded-xl md:aspect-[9/16]" />
                </div>
                <div className="mx-auto flex w-full flex-row md:max-[991px]:max-w-[750px] min-[992px]:max-[1199px]:max-w-[970px] min-[1200px]:max-w-[1170px]">
                  {/* Post Card Skeleton */}
                  <div className="w-full px-3 lg:w-8/12">
                    <div className="mb-[30px] flex w-full justify-between lg:justify-start">
                      <Skeleton className="order-2 h-[90px] min-h-[90px] w-[125px] min-w-[125px] md:order-1 md:mr-[30px] md:h-[193px] md:min-h-full md:w-[270px] md:min-w-[270px]" />
                      <div className="order-1 mr-3 flex flex-col md:order-2 md:mr-[unset]">
                        <Skeleton className="h-8 w-[200px] md:w-[300px]" />
                        <Skeleton className="mt-4 h-20 w-40" />
                      </div>
                    </div>
                    <div className="mb-[30px] flex w-full justify-between lg:justify-start">
                      <Skeleton className="order-2 h-[90px] min-h-[90px] w-[125px] min-w-[125px] md:order-1 md:mr-[30px] md:h-[193px] md:min-h-full md:w-[270px] md:min-w-[270px]" />
                      <div className="order-1 mr-3 flex flex-col md:order-2 md:mr-[unset]">
                        <Skeleton className="h-8 w-[200px] md:w-[300px]" />
                        <Skeleton className="mt-4 h-20 w-40" />
                      </div>
                    </div>
                    <div className="mb-[30px] flex w-full justify-between lg:justify-start">
                      <Skeleton className="order-2 h-[90px] min-h-[90px] w-[125px] min-w-[125px] md:order-1 md:mr-[30px] md:h-[193px] md:min-h-full md:w-[270px] md:min-w-[270px]" />
                      <div className="order-1 mr-3 flex flex-col md:order-2 md:mr-[unset]">
                        <Skeleton className="h-8 w-[200px] md:w-[300px]" />
                        <Skeleton className="mt-4 h-20 w-40" />
                      </div>
                    </div>
                    <div className="mb-[30px] flex w-full justify-between lg:justify-start">
                      <Skeleton className="order-2 h-[90px] min-h-[90px] w-[125px] min-w-[125px] md:order-1 md:mr-[30px] md:h-[193px] md:min-h-full md:w-[270px] md:min-w-[270px]" />
                      <div className="order-1 mr-3 flex flex-col md:order-2 md:mr-[unset]">
                        <Skeleton className="h-8 w-[200px] md:w-[300px]" />
                        <Skeleton className="mt-4 h-20 w-40" />
                      </div>
                    </div>
                    <div className="mb-[30px] flex w-full justify-between lg:justify-start">
                      <Skeleton className="order-2 h-[90px] min-h-[90px] w-[125px] min-w-[125px] md:order-1 md:mr-[30px] md:h-[193px] md:min-h-full md:w-[270px] md:min-w-[270px]" />
                      <div className="order-1 mr-3 flex flex-col md:order-2 md:mr-[unset]">
                        <Skeleton className="h-8 w-[200px] md:w-[300px]" />
                        <Skeleton className="mt-4 h-20 w-40" />
                      </div>
                    </div>
                  </div>
                  <div className="hidden w-4/12 px-4 lg:block">
                    {/* Post Card Side Skeleton */}
                    <div className="rounded-xl border p-4">
                      <div className="mb-4 flex w-full border-separate flex-row">
                        <Skeleton className="mr-2 h-[75px] w-[75px]" />
                        <Skeleton className="h-5 w-20" />
                      </div>
                      <div className="mb-4 flex w-full border-separate flex-row">
                        <Skeleton className="mr-2 h-[75px] w-[75px]" />
                        <Skeleton className="h-5 w-20" />
                      </div>
                      <div className="mb-4 flex w-full border-separate flex-row">
                        <Skeleton className="mr-2 h-[75px] w-[75px]" />
                        <Skeleton className="h-5 w-20" />
                      </div>
                      <div className="mb-4 flex w-full border-separate flex-row">
                        <Skeleton className="mr-2 h-[75px] w-[75px]" />
                        <Skeleton className="h-5 w-20" />
                      </div>
                      <div className="mb-4 flex w-full border-separate flex-row">
                        <Skeleton className="mr-2 h-[75px] w-[75px]" />
                        <Skeleton className="h-5 w-20" />
                      </div>
                      <div className="mb-4 flex w-full border-separate flex-row">
                        <Skeleton className="mr-2 h-[75px] w-[75px]" />
                        <Skeleton className="h-5 w-20" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Footer Skeleton */}
            <div className="mt-10 flex w-full px-12 py-6 lg:ml-[250px] lg:py-8">
              <Skeleton className="mb-6 h-[200px] w-5/12 p-2 md:mb-0 lg:mr-3" />
              <div className="hidden w-7/12 md:flex">
                <Skeleton className="mr-4 h-[200px] w-32" />
                <Skeleton className="mr-4 h-[200px] w-32" />
                <Skeleton className="mr-4 h-[200px] w-32" />
              </div>
            </div>
          </>
        }
      >
        <MainContainer>
          <IndexContent
            adsBelowHeader={adsBelowHeader}
            posts={posts}
            pageInfo={pageInfo}
            locale={locale}
          />
        </MainContainer>
      </React.Suspense>
    </>
  )
}
