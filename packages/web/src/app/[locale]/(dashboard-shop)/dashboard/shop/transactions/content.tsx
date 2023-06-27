"use client"

import * as React from "react"

import useSWR from "swr"

import { TransactionDataProps } from "@/lib/data-types"
import { toast } from "@/components/UI/Toast"
import { fetcher } from "@/lib/http"
import { Table, Tbody, Td, Th, Thead, Tr } from "@/components/UI/Table"
import { changePriceToIDR } from "@/utils/helper"
import { Button } from "@/components/UI/Button"
import { Icon } from "@/components/UI/Icon"

export function TransactionsDashboardContent() {
  const [transactions, setTransactions] = React.useState<
    TransactionDataProps[]
  >([])
  const [page, setPage] = React.useState(1)
  const [totalTransactions, setTotalTransactions] = React.useState<number>(0)

  const { data } = useSWR(`/top-up-transaction/page/${page}`, fetcher, {
    onSuccess: (data) => {
      setTransactions(data)
    },
    onError: (error) => {
      toast({ variant: "danger", description: error.message })
    },
  })

  const { data: count } = useSWR(`/top-up/count`, fetcher, {
    onSuccess: (data) => {
      setTotalTransactions(data)
    },
    onError: (error) => {
      toast({ variant: "danger", description: error.message })
    },
  })

  const lastPage = count && Math.ceil(totalTransactions / 10)

  return (
    <div className="mb-[100px] mt-6 rounded">
      {transactions && transactions.length > 0 ? (
        <div className="overflow-x-auto">
          <Table className="border-collapse border-spacing-0">
            <Thead>
              <Tr isTitle>
                <Th>Customer Name</Th>
                <Th>Customer Phone</Th>
                <Th>Account ID</Th>
                <Th>SKU</Th>
                <Th>Payment Method</Th>
                <Th>Amount</Th>
                <Th>Status</Th>
                <Th className="w-auto">Reference</Th>
              </Tr>
            </Thead>
            <Tbody>
              {data &&
                transactions.map((transaction: TransactionDataProps) => (
                  <Tr key={transaction.reference}>
                    <Td className="line-clamp-3 max-w-[120px]">
                      <div>
                        <span className="font-medium">
                          {transaction.customer_name}
                        </span>
                      </div>
                    </Td>
                    <Td className="whitespace-nowrap">
                      <div className="flex">
                        <span className="font-medium">
                          {transaction.customer_phone}
                        </span>
                      </div>
                    </Td>
                    <Td className="whitespace-nowrap">
                      <div className="flex">
                        <span className="font-medium">
                          {transaction.account_id}
                        </span>
                      </div>
                    </Td>
                    <Td className="whitespace-nowrap">
                      <div className="flex">
                        <span className="font-medium">{transaction.sku}</span>
                      </div>
                    </Td>
                    <Td className="whitespace-nowrap">
                      <div className="flex">
                        <span className="font-medium">
                          {transaction.payment_method}
                        </span>
                      </div>
                    </Td>
                    <Td>
                      <div className="flex">
                        <span className="font-medium">
                          {changePriceToIDR(transaction.amount)}
                        </span>
                      </div>
                    </Td>
                    <Td className="whitespace-nowrap">
                      <div className="flex">
                        <span className="font-medium">
                          {transaction.status}
                        </span>
                      </div>
                    </Td>
                    <Td className="w-auto">
                      <div className="flex">
                        <span className="font-medium">
                          {transaction.invoice_id}
                        </span>
                      </div>
                    </Td>
                  </Tr>
                ))}
            </Tbody>
          </Table>
        </div>
      ) : (
        data &&
        transactions &&
        transactions.length === 0 && (
          <div className="my-48 flex items-center justify-center">
            <h3>Transactions Not found</h3>
          </div>
        )
      )}
      {page && transactions && transactions.length > 0 && (
        <div className="align-center mt-2 flex items-center justify-center space-x-2">
          <>
            {page !== 1 && (
              <Button
                size={null}
                aria-label="Last Page"
                onClick={() => setPage((old) => Math.max(old - 1, 0))}
                disabled={page === 1}
                className="rounded-full px-0"
              >
                <Icon.ChevronLeft aria-label="Last Page" />
              </Button>
            )}
            {data && page !== lastPage && (
              <Button
                aria-label="Next Page"
                onClick={() => {
                  setPage((old) => old + 1)
                }}
                className="rounded-full px-0"
              >
                <Icon.ChevronRight aria-label="Next Page" />
              </Button>
            )}
          </>
        </div>
      )}
    </div>
  )
}
