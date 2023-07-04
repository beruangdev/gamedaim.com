import { type Metadata } from "next"

import env from "env"
import { DetailTransactionContent } from "./content"
import { type LanguageTypeData } from "@/lib/data-types"

export async function generateMetadata({
  params,
}: {
  params: { slug: string; locale: LanguageTypeData }
}): Promise<Metadata> {
  const { locale } = params

  return {
    title: "Top Up Transaction",
    description: "Gamedaim Top Up Transaction",
    openGraph: {
      title: "Top Up Transaction",
      description: "Gamedaim Top Up Transaction",
      url:
        locale === "id"
          ? `${env.SiTE_URL}/shop/top-up/transaction`
          : `${env.EN_SiTE_URL}/shop/top-up/transaction`,
      locale: locale,
    },
  }
}

export default function TransactionPage() {
  return <DetailTransactionContent />
}
