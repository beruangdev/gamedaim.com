"use client"

import * as React from "react"

import { ActionDashboard } from "@/components/Action"
import { CoverTopUp, IconTopUp, ThumbnailTopUp } from "@/components/Image"
import { Button } from "@/components/UI/Button"
import { Input } from "@/components/UI/Form"
import { Icon } from "@/components/UI/Icon"
import { Table, Tbody, Td, Th, Thead, Tr } from "@/components/UI/Table"

import { PriceListPostPaidProps, PriceListPrePaidProps } from "@/lib/data-types"
import { slugify } from "@/utils/helper"

interface SearchEvent extends React.FormEvent<HTMLFormElement> {
  target: HTMLFormElement & {
    0: HTMLInputElement
  }
}

interface ProductMediasProps {
  brands?: (PriceListPrePaidProps | PriceListPostPaidProps)[]
}

export function ProductMediasDashboardContent(props: ProductMediasProps) {
  const { brands } = props

  const [data, setData] = React.useState(brands)
  const [currentPage, setCurrentPage] = React.useState<number>(1)
  const [isSearched, setIsSearched] = React.useState<boolean>(false)

  const lastPage = brands && Math.ceil(brands.length / 10)

  function getCurrentData() {
    const indexOfLastData = currentPage * 10
    const indexOfFirstData = indexOfLastData - 10
    return data?.slice(indexOfFirstData, indexOfLastData)
  }
  const currentData = getCurrentData()
  const handleSearch = (e: SearchEvent) => {
    e.preventDefault()
    if (e.target["0"].value.length > 1) {
      const searchResult = brands?.filter(
        (price: PriceListPrePaidProps | PriceListPostPaidProps) => {
          return price.product_name
            .toLowerCase()
            .includes(e.target["0"].value.toLowerCase())
        },
      ) as (PriceListPrePaidProps | PriceListPostPaidProps)[]
      setData(searchResult)
      setIsSearched(true)
    }
  }

  return (
    <>
      <div className="mt-4 flex items-end justify-between">
        <form onSubmit={(e: SearchEvent) => handleSearch(e)}>
          <Input.Group>
            <Input type="text" name="search" />
            <Input.RightElement>
              <button aria-label="Search" type="submit">
                <Icon.Search aria-label="Search" />
              </button>
            </Input.RightElement>
          </Input.Group>
        </form>
      </div>
      <div className="mb-[80px] mt-6 overflow-x-auto rounded">
        {currentData && currentData?.length > 0 ? (
          <>
            <Table className="border-collapse border-spacing-0">
              <Thead>
                <Tr isTitle>
                  <Th>Title</Th>
                  <Th>Thumbnail</Th>
                  <Th>Cover</Th>
                  <Th>Icon</Th>
                  <Th>Actions</Th>
                </Tr>
              </Thead>
              <Tbody>
                {currentData?.map((product) => (
                  <Tr key={product.brand}>
                    <Td className="line-clamp-3 max-w-[120px]">
                      <div className="flex">
                        <span className="font-medium">{product.brand}</span>
                      </div>
                    </Td>
                    <Td>
                      <ThumbnailTopUp
                        url={slugify(product.brand)}
                        className="relative h-[100px] w-[100px] overflow-hidden rounded-md"
                      />
                    </Td>
                    <Td>
                      <CoverTopUp
                        url={slugify(product.brand)}
                        className="relative h-[100px] w-[100px] overflow-hidden rounded-md"
                      />
                    </Td>
                    <Td>
                      <IconTopUp
                        url={slugify(product.brand)}
                        className="relative h-[100px] w-[100px] overflow-hidden rounded-md"
                      />
                    </Td>
                    <Td align="right">
                      <ActionDashboard
                        editLink={`/dashboard/shop/product-media/${slugify(
                          product.brand,
                        )}`}
                        content={product.brand}
                      />
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
            {currentPage && !isSearched && (
              <div className="align-center mt-2 flex items-center justify-center space-x-2">
                <>
                  {currentPage !== 1 && (
                    <Button
                      aria-label="Last Page"
                      onClick={() =>
                        setCurrentPage((old) => Math.max(old - 1, 0))
                      }
                      disabled={currentPage === 1}
                      className="!rounded-full !px-0"
                    >
                      <Icon.ChevronLeft aria-label="Last Page" />
                    </Button>
                  )}
                  {currentPage !== lastPage && (
                    <Button
                      aria-label="Next Page"
                      onClick={() => {
                        setCurrentPage((old) => old + 1)
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
          currentData?.length === 0 && (
            <div className="my-48 flex items-center justify-center">
              <h3 className="text-center font-bold">Product Not found</h3>
            </div>
          )
        )}
      </div>
    </>
  )
}
