import { WpCategoriesDataProps } from "@/lib/wp-data-types"

//check if path includes one of routes for authentication
export function findAuthPage(path: string, routes: string[]) {
  return routes.some(function (element) {
    return path.includes(element)
  })
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
