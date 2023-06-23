import { PriceListPrePaidProps } from "@/lib/data-types"
import { WpCategoriesDataProps } from "@/lib/wp-data-types"

export function slugify(text: string) {
  return text
    .toString() // Cast to string (optional)
    .normalize("NFKD") // The normalize() using NFKD method returns the Unicode Normalization Form of a given string.
    .replace(/[\u0300-\u036f]/g, "") // remove all previously split accents
    .toLowerCase() // Convert the string to lowercase letters
    .trim() // Remove whitespace from both sides of a string (optional)
    .replace(/\s+/g, "-") // Replace spaces with -
    .replace(/[^\w-]+/g, "") // Remove all non-word chars
    .replace(/_/g, "-") // Replace _ with -
    .replace(/--+/g, "-") // Replace multiple - with single -
    .replace(/-$/g, "") // Remove trailing -
}
//check if path includes one of routes for authentication
export function findAuthPage(path: string, routes: string[]) {
  return routes.some(function (element) {
    return path.includes(element)
  })
}

export function addPropertiesPrices(item: PriceListPrePaidProps) {
  const slug = slugify(item.brand)
  const thumbnail = `/image/${slugify(item.brand)}-thumbnail.webp`
  const cover = `/image/${slugify(item.brand)}-cover.webp`

  return {
    ...item,
    slug,
    thumbnail,
    cover,
  }
}
interface CategoryBrand {
  category: string
  brands: PriceListPrePaidProps[]
}

export function groupTopUpByCategory(brands: PriceListPrePaidProps[]) {
  const groupedBrands: CategoryBrand[] = []

  brands.forEach((brand) => {
    const categoryIndex = groupedBrands.findIndex(
      (item) => item.category === brand.category,
    )

    if (categoryIndex !== -1) {
      groupedBrands[categoryIndex].brands.push(brand)
    } else {
      groupedBrands.push({ category: brand.category, brands: [brand] })
    }
  })

  return groupedBrands
}

export const copyToClipboard = (value: string) => {
  navigator.clipboard.writeText(value)
}

const parseHTMLString = (htmlString: string) => {
  return htmlString
    .split("</p>")
    .map((htmlString) => htmlString + "</p>")
    .filter((html) => html !== "</p>")
    .filter((html) => html !== "<p></p>")
}

const splitHTMLArrayToHalf = (htmlList: string[]) => {
  const half = Math.ceil(htmlList.length / 2)
  const firstHalfMarkupList = htmlList.slice(0, half)
  const secondHalfMarkupList = htmlList.slice(-half)
  let firstHalfHTMLString = ""
  let secondHalfHTMLString = ""

  /**
   * If the last value of firstHalfList equal to first value of secondHalfList
   * remove the first value of secondHalfList
   */
  if (
    firstHalfMarkupList[firstHalfMarkupList.length - 1] ===
    secondHalfMarkupList[0]
  ) {
    secondHalfMarkupList.shift()
  }

  firstHalfHTMLString = firstHalfMarkupList.join("")
  secondHalfHTMLString = secondHalfMarkupList.join("")

  return {
    firstHalfHTMLString,
    secondHalfHTMLString,
  }
}

type FunctionReturn = {
  firstHalf: string
  secondHalf: string
}

export const parseAndSplitHTMLString = (markup: string): FunctionReturn => {
  //   const sanitizedMarkup = sanitizeHTMLString(markup)
  const markupList = parseHTMLString(markup)

  const { firstHalfHTMLString, secondHalfHTMLString } =
    splitHTMLArrayToHalf(markupList)

  return {
    firstHalf: firstHalfHTMLString,
    secondHalf: secondHalfHTMLString,
  }
}
export const splitUriWP = (uri: string) => {
  let regex = /^\/(\w+)\/(\w+)\/(.*)$/
  const match: RegExpMatchArray | null = uri.match(regex)
  const newUri = match && match.length > 2 ? `/${match[1]}/${match[3]}` : uri
  return newUri
}

export function wpPrimaryCategorySlug(category: WpCategoriesDataProps[]) {
  const isPrimary = category.find(({ parent }) => {
    return parent === null
  })
  let primary
  if (isPrimary) {
    primary = isPrimary
    return { primary }
  } else {
    primary = category[0]
    return { primary }
  }
}

export function wpAuthorPathBySlug(slug: string) {
  return `/author/${slug}`
}

export function wpCategoryPathBySlug(slug: string) {
  return `/category/${slug}`
}

export function wpTagPathBySlug(slug: string) {
  return `/tag/${slug}`
}

export function getBrandDetails(
  brand: string,
  id: string,
  server: string | undefined,
) {
  switch (brand) {
    case "GARENA":
      return { accountId: `${id}` }
    case "MOBILE LEGENDS":
      return { accountId: `${id}${server}` }
    case "POINT BLANK":
      return { accountId: `${id}` }
    case "FREE FIRE":
      return { accountId: `${id}` }
    case "ARENA OF VALOR":
      return { accountId: `${id}` }
    case "Ragnarok M: Eternal Love":
      return { accountId: `${id}${server}` }
    case "PUBG MOBILE":
      return { accountId: `${id}` }
    case "AU2 MOBILE":
      return { accountId: `${id}` }
    case "Call of Duty MOBILE":
      return { accountId: `${id}` }
    case "Eternal City":
      return { accountId: `${id}` }
    case "Laplace M":
      return { accountId: `${id}` }
    case "Lords Mobile":
      return { accountId: `${id}` }
    case "MangaToon":
      return { accountId: `${id}` }
    case "Valorant":
      return { accountId: `${id}` }
    case "Genshin Impact":
      return { accountId: `${server}${id}` }
    case "League of Legends Wild Rift":
      return { accountId: `${id}` }
    case "Tower of Fantasy":
      return { accountId: `${id}|${server}` }
    case "TELKOMSEL":
      return { accountId: `${id}` }
    case "GO PAY":
      return { accountId: `${id}` }
    case "OVO":
      return { accountId: `${id}` }
    case "DANA":
      return { accountId: `${id}` }
    default:
      return { accountId: `${id}` }
  }
}
export function getServerTopUp(brand: string) {
  switch (brand) {
    case "GARENA":
      return { isTopUpServer: false }
    case "MOBILE LEGENDS":
      return { isTopUpServer: true }
    case "POINT BLANK":
      return { isTopUpServer: false }
    case "FREE FIRE":
      return { isTopUpServer: false }
    case "ARENA OF VALOR":
      return { isTopUpServer: false }
    case "Ragnarok M: Eternal Love":
      return { isTopUpServer: true }
    case "PUBG MOBILE":
      return { isTopUpServer: false }
    case "AU2 MOBILE":
      return { isTopUpServer: false }
    case "Call of Duty MOBILE":
      return { isTopUpServer: false }
    case "Eternal City":
      return { isTopUpServer: false }
    case "Laplace M":
      return { isTopUpServer: false }
    case "Lords Mobile":
      return { isTopUpServer: false }
    case "MangaToon":
      return { isTopUpServer: false }
    case "Valorant":
      return { isTopUpServer: false }
    case "Genshin Impact":
      return { isTopUpServer: true }
    case "League of Legends Wild Rift":
      return { isTopUpServer: false }
    case "Tower of Fantasy":
      return { isTopUpServer: true }
    case "TELKOMSEL":
      return { isTopUpServer: false }
    case "GO PAY":
      return { isTopUpServer: false }
    case "OVO":
      return { isTopUpServer: false }
    case "DANA":
      return { isTopUpServer: false }
    default:
      return { isTopUpServer: false }
  }
}
export function removeCharsBeforeNumberTopUpPrice(text: string) {
  let cleanText = text

  if (cleanText.includes("AU2")) {
    cleanText = cleanText.replace("AU2", "")
  }

  const regex = /\D*(\d.*)/ // mencocokan setiap karakter non-digit sebelum angka
  const matches = cleanText.match(regex)

  if (matches && matches.length > 1) {
    const cleanString = matches[1] // menghilangkan spasi pada karakter setelah angka
    return cleanString
  }

  return cleanText
}
