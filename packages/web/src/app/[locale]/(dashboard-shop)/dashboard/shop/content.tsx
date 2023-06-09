"use client"

import * as React from "react"
import dynamic from "next/dynamic"

import { Icon } from "@/components/UI/Icon"
import { useGetTopUpTransactionsCount } from "@/lib/api/client/top-up-transaction"
import { useGetTopUpDigiflazzCheckBalance } from "@/lib/api/client/top-up"

const BoxDashboard = dynamic(() =>
  import("@/components/Box").then((mod) => mod.BoxDashboard),
)

export function ShopDashboardContent() {
  const { topUpTransactionsCount } = useGetTopUpTransactionsCount()
  const { topUpDigiflazzBalance } = useGetTopUpDigiflazzCheckBalance()

  return (
    <div className="my-8">
      <h2 className="text-3xl">Statistics</h2>
      <div className="my-8 grid grid-cols-2 gap-3 md:grid-cols-5">
        {topUpDigiflazzBalance !== undefined && (
          <BoxDashboard
            icon={<Icon.Balance className="h-5 w-5" />}
            count={topUpDigiflazzBalance}
            text="Digilazz Balance"
          />
        )}
        {topUpTransactionsCount !== undefined && (
          <BoxDashboard
            icon={<Icon.Currency className="h-5 w-5" />}
            count={topUpTransactionsCount}
            text="Top Up Transactions"
          />
        )}
      </div>
    </div>
  )
}
