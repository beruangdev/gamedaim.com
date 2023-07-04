import { type Metadata } from "next"

import env from "env"
import { CheckTransactionContent } from "./content"
import { type LanguageTypeData } from "@/lib/data-types"

export async function generateMetadata({
  params,
}: {
  params: { slug: string; locale: LanguageTypeData }
}): Promise<Metadata> {
  const { locale } = params

  return {
    title: "Check Top Up Transaction",
    description: "Gamedaim Check Top Up Transaction",
    openGraph: {
      title: "Check Top Up Transaction",
      description: "Gamedaim Check Top Up Transaction",
      url:
        locale === "id"
          ? `${env.SiTE_URL}/shop/top-up/transactions`
          : `${env.EN_SiTE_URL}/shop/top-up/transactions`,
      locale: locale,
    },
  }
}

export default function CheckTransaction() {
  return <CheckTransactionContent />
}
