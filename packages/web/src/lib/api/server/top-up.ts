import { addPropertiesPrices, slugify } from "@/utils/helper"
import { http } from "../../http"
import {
  PriceListPostPaidProps,
  PriceListPrePaidProps,
  StatusPostPaidTopUpProps,
  StatusPrePaidTopUpProps,
  TransactionDataProps,
} from "../../data-types"

export const postProductsPrePaid = async () => {
  const [res, err] = await http<{ value: PriceListPrePaidProps[] }>("POST", {
    url: `/top-up/digiflazz/price-list-prepaid/save`,
    data: null,
    headers: {
      "Content-Type": "application/json",
    },
  })

  if (err !== null) {
    console.log(err)
    return { data: null }
  }

  return { data: res?.value }
}

export const postProductsPostPaid = async () => {
  const [res, err] = await http<{ value: PriceListPostPaidProps[] }>("POST", {
    url: `/top-up/digiflazz/price-list-postpaid/save`,
    data: null,
    headers: {
      "Content-Type": "application/json",
    },
  })

  if (err !== null) {
    console.log(err)
    return { data: null }
  }

  return { data: res?.value }
}

export const getProductsPrePaid = async () => {
  const [res, err] = await http<{ value: PriceListPrePaidProps[] }>("GET", {
    url: `/top-up/digiflazz/price-list-prepaid/data`,
  })

  if (err !== null) {
    console.log(err)
    return { data: null }
  }

  return { data: res?.value }
}

export const getProductsPostPaid = async () => {
  const [res, err] = await http<{ value: PriceListPostPaidProps[] }>("GET", {
    url: `/top-up/digiflazz/price-list-postpaid/data`,
  })

  if (err !== null) {
    console.log(err)
    return { data: null }
  }

  return { data: res?.value }
}

export const postTopUpTransactions = async (value: unknown) => {
  const [res, err] = await http<{
    data: StatusPostPaidTopUpProps & StatusPrePaidTopUpProps
  }>("POST", {
    url: "/top-up/digiflazz/transaction",
    data: value,
    headers: {
      "Content-Type": "application/json",
    },
  })

  if (err !== null) {
    console.log(err)
    return
  }

  return res
}

export const updateStatusTopUpByMerchantRef = async (
  route: string,
  value: unknown,
) => {
  const [res, err] = await http<{
    data: TransactionDataProps
  }>("PUT", {
    url: `/top-up/tripay/transaction/${route}`,
    data: value,
  })

  if (err !== null) {
    console.log(err)
    return
  }

  return res
}

export const getPriceListPrePaid = async () => {
  const [res, err] = await http<{
    data: PriceListPrePaidProps[] & { message: string }
  }>("POST", {
    url: "/top-up/digiflazz/price-list-prepaid",
    headers: {
      "Content-Type": "application/json;charset=UTF-8",
    },
    data: null,
  })

  if (err !== null) {
    console.log(err)
    return {
      allPrices: null,
    }
  }

  let allPrices: PriceListPrePaidProps[] = []
  if (res) {
    if (Array.isArray(res?.data)) {
      await postProductsPrePaid()
      allPrices = res?.data as PriceListPrePaidProps[]
    } else {
      const { data } = await getProductsPrePaid()
      allPrices = data as PriceListPrePaidProps[]
    }
  } else {
    const { data } = await getProductsPrePaid()
    allPrices = data as PriceListPrePaidProps[]
  }

  return {
    allPrices: allPrices,
  }
}

export const getPriceListPostPaid = async () => {
  const [res, err] = await http<{
    data: PriceListPostPaidProps[] & { message: string }
  }>("POST", {
    url: "/top-up/digiflazz/price-list-postpaid",
    headers: {
      "Content-Type": "application/json;charset=UTF-8",
    },
    data: null,
  })

  if (err !== null) {
    console.log(err)
    return {
      allPrices: null,
    }
  }

  let allPrices: PriceListPostPaidProps[] = []
  if (res) {
    if (Array.isArray(res?.data)) {
      await postProductsPostPaid()
      allPrices = res?.data as PriceListPostPaidProps[]
    } else {
      const { data } = await getProductsPostPaid()
      allPrices = data as PriceListPostPaidProps[]
    }
  } else {
    const { data } = await getProductsPostPaid()
    allPrices = data as PriceListPostPaidProps[]
  }

  return {
    allPrices: allPrices,
  }
}

export const getPriceListBySlug = async (slug: string) => {
  const { allPrices: prePaid } = await getPriceListPrePaid()
  const { allPrices: postPaid } = await getPriceListPostPaid()
  const allPrices = [
    ...(prePaid as PriceListPrePaidProps[]),
    ...(postPaid as PriceListPostPaidProps[]),
  ]
  const priceBySlugDatas = allPrices.find((price: { brand: string }) => {
    const brand = slugify(price.brand)
    return brand.includes(slug)
  })
  return {
    priceBySlug: priceBySlugDatas,
  }
}

export const getBrandsPrePaid = async () => {
  const { allPrices: prePaid } = await getPriceListPrePaid()
  let prePaidByBrand: PriceListPrePaidProps[] = []
  if (prePaid && Array.isArray(prePaid)) {
    prePaidByBrand = Array.from(
      new Set(prePaid.map((item: PriceListPrePaidProps) => item.brand)),
    ).map((brand) => {
      return prePaid?.filter(
        (item: PriceListPrePaidProps) => item.brand === brand,
      )[0]
    }) as PriceListPrePaidProps[]
  }
  return {
    prePaidBrands: prePaidByBrand,
  }
}

export const getBrandsPostPaid = async () => {
  const { allPrices: postPaid } = await getPriceListPostPaid()
  let postPaidByBrand: PriceListPostPaidProps[] = []
  if (postPaid && Array.isArray(postPaid)) {
    postPaidByBrand = Array.from(
      new Set(postPaid.map((item: PriceListPostPaidProps) => item.brand)),
    ).map((brand) => {
      return postPaid?.filter(
        (item: PriceListPostPaidProps) => item.brand === brand,
      )[0]
    }) as PriceListPostPaidProps[]
  }
  return {
    postPaidBrands: postPaidByBrand,
  }
}

export const getAllBrandTopUp = async () => {
  const { postPaidBrands } = await getBrandsPostPaid()
  const { prePaidBrands } = await getBrandsPrePaid()

  const mergeDatas = [
    ...(prePaidBrands as PriceListPrePaidProps[]),
    ...(postPaidBrands as PriceListPostPaidProps[]),
  ]

  return { brands: mergeDatas }
}

export const getProductBySlug = async (slug: string) => {
  const { allPrices } = await getPriceListPrePaid()
  const filteredProduct =
    allPrices && allPrices.filter((product) => product.brand === slug)
  return {
    products: filteredProduct,
  }
}

export const getTopUpByBrand = async (slug: string) => {
  const { allPrices } = await getPriceListPrePaid()
  const getPricesbyBrand = Array.from(
    new Set(allPrices?.map((item: PriceListPrePaidProps) => item.brand)),
  ).map((brand) => {
    return allPrices?.filter(
      (item: PriceListPrePaidProps) => item.brand === brand,
    )[0]
  }) as PriceListPrePaidProps[]
  const filteredPrices = getPricesbyBrand.map(addPropertiesPrices)
  const getDataBySlug = filteredPrices.find((price) => price.slug === slug)
  return { topUp: getDataBySlug }
}

export const getAllTopUpProduct = async () => {
  const { allPrices } = await getPriceListPrePaid()
  const getPricesbyBrand = Array.from(
    new Set(allPrices?.map((item: PriceListPrePaidProps) => item.brand)),
  ).map((brand) => {
    return allPrices?.filter(
      (item: PriceListPrePaidProps) => item.brand === brand,
    )[0]
  }) as PriceListPrePaidProps[]
  const filteredPrices = getPricesbyBrand.map(addPropertiesPrices)
  return { allTopUpSlug: filteredPrices }
}

interface TransactionCounter {
  brand: string
  id: string
  transactions: number
}

export const getTopUpTransactionCounter = async (
  brand: string,
): Promise<{ counter: TransactionCounter | null }> => {
  const [res, err] = await http<TransactionCounter>("GET", {
    url: `/transaction/counter/${brand}`,
    headers: {
      "Content-Type": "application/json;charset=UTF-8",
    },
  })

  if (err !== null) {
    return {
      counter: null,
    }
  }

  return {
    counter: res || null,
  }
}

export const postTopUpTransactionCounter = async (
  brand: string,
): Promise<{ counter: TransactionCounter | null }> => {
  const [res, err] = await http<TransactionCounter>("POST", {
    url: `/transaction/counter/`,
    headers: {
      "Content-Type": "application/json;charset=UTF-8",
    },
    data: { brand: brand },
  })

  if (err !== null) {
    console.log(err)
    return {
      counter: null,
    }
  }

  return {
    counter: res || null,
  }
}

export const checkBalance = async (): Promise<{
  balance: { deposit: number } | null
}> => {
  const [res, err] = await http<{ data: { deposit: number } }>("POST", {
    url: "/top-up/digiflazz/check-balance",
    headers: {
      "Content-Type": "application/json;charset=UTF-8",
    },
  })

  if (err !== null) {
    console.log(err)
    return {
      balance: null,
    }
  }

  return {
    balance: res?.data || null,
  }
}
