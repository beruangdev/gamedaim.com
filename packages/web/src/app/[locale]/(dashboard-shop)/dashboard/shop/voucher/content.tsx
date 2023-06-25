"use client"

import * as React from "react"
import NextLink from "next/link"

import { Button } from "@/components/UI/Button"
import { Icon } from "@/components/UI/Icon"
import { Input } from "@/components/UI/Form"
import { Table, Tbody, Td, Th, Thead, Tr } from "@/components/UI/Table"
import { ActionDashboard } from "@/components/Action"
import { toast } from "@/components/UI/Toast"

import { VoucherDataProps } from "@/lib/data-types"
import {
  useGetVouchers,
  useGetVouchersCount,
  useSearchVouchers,
} from "@/lib/api/client/voucher"
import { deleteVoucher } from "@/lib/api/server/vouchers"
import { formatDate } from "@/utils/date"

interface SearchEvent extends React.FormEvent<HTMLFormElement> {
  target: HTMLFormElement & {
    0: HTMLInputElement
  }
}

export function VouchersDashboardContent() {
  const [page, setPage] = React.useState(1)
  const [searchQuery, setSearchQuery] = React.useState<string>("")
  const [vouchersData, setVouchersData] = React.useState<VoucherDataProps[]>([])
  const { vouchersCount } = useGetVouchersCount()
  const lastPage = vouchersCount && Math.ceil(vouchersCount / 10)

  const { vouchers, updatedVouchers } = useGetVouchers(page)
  const { vouchers: searchResults, updatedVouchers: updateSearchResults } =
    useSearchVouchers(searchQuery)

  const handleSearchOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    setSearchQuery(e.target.value)
  }

  React.useEffect(() => {
    if (searchQuery) {
      setVouchersData(searchResults)
    } else {
      setVouchersData(vouchers)
    }
  }, [searchQuery, searchResults, vouchers])

  const handleDelete = async (item: { id: string }) => {
    const { data } = await deleteVoucher(item.id)
    if (data) {
      updatedVouchers()
      updateSearchResults()
      toast({ variant: "success", description: "Voucher deleted successfully" })
    }
  }

  return (
    <>
      <div className="mt-4 flex items-end justify-between">
        <div>
          <NextLink
            aria-label="Add New Voucher"
            href="/dashboard/shop/voucher/new"
          >
            <Button aria-label="Add New Voucher">
              <Icon.Add />
              Add New
            </Button>
          </NextLink>
        </div>

        <form onSubmit={(e: SearchEvent) => e.preventDefault()}>
          <Input.Group>
            <Input type="text" onChange={handleSearchOnChange} />
            <Input.RightElement className="w-2">
              <Button
                size={null}
                variant={null}
                aria-label="Search"
                type="submit"
                className="inset-y-0 mr-3 flex items-center rounded-lg p-1 focus:outline-none"
              >
                <Icon.Search aria-label="Search" />
              </Button>
            </Input.RightElement>
          </Input.Group>
        </form>
      </div>
      <div className="mb-[80px] mt-6 rounded">
        {vouchersData && vouchersData.length > 0 ? (
          <>
            <Table className="!table-fixed border-collapse border-spacing-0">
              <Thead>
                <Tr isTitle>
                  <Th>Title</Th>
                  <Th>Code</Th>
                  <Th>Published Date</Th>
                  <Th>Last Modified</Th>
                  <Th>Actions</Th>
                </Tr>
              </Thead>
              <Tbody>
                {vouchersData.map((voucher: VoucherDataProps) => (
                  <Tr key={voucher.id}>
                    <Td className="line-clamp-3 max-w-[120px]">
                      <div className="flex">
                        <span className="font-medium">{voucher.name}</span>
                      </div>
                    </Td>
                    <Td>{voucher.voucherCode}</Td>
                    <Td>{formatDate(voucher.createdAt, "LL")}</Td>
                    <Td>{formatDate(voucher.updatedAt, "LL")}</Td>
                    <Td align="right">
                      <ActionDashboard
                        onDelete={() => handleDelete(voucher)}
                        editLink={`/dashboard/shop/voucher/edit/${voucher.id}`}
                        content={voucher.name}
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
                    <Button
                      aria-label="Last Page"
                      onClick={() => setPage((old) => Math.max(old - 1, 0))}
                      disabled={page === 1}
                      className="!rounded-full !px-0"
                    >
                      <Icon.ChevronLeft aria-label="Last Page" />
                    </Button>
                  )}
                  {page !== lastPage && (
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
            <h3 className="text-center font-bold">Vouchers Not found</h3>
          </div>
        )}
      </div>
    </>
  )
}
