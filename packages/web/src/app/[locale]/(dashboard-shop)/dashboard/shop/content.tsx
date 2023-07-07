import * as React from "react"

import { Icon } from "@/components/UI/Icon"
import { BoxDashboard } from "@/components/Box"

interface ShopDashboardContentProps {
  totalTransactions?: number | null
  totalBalanceDigiflazz?: number | null
}

export function ShopDashboardContent(props: ShopDashboardContentProps) {
  const { totalTransactions, totalBalanceDigiflazz } = props
  return (
    <div className="my-8">
      <h2 className="text-3xl">Statistics</h2>
      <div className="my-8 grid grid-cols-2 gap-3 md:grid-cols-5">
        {totalBalanceDigiflazz && (
          <BoxDashboard
            icon={<Icon.Balance className="h-5 w-5" />}
            count={totalBalanceDigiflazz}
            text="Digilazz Balance"
          />
        )}
        {totalTransactions && (
          <BoxDashboard
            icon={<Icon.Currency className="h-5 w-5" />}
            count={totalTransactions}
            text="Top Up Transactions"
          />
        )}
      </div>
    </div>
  )
}
