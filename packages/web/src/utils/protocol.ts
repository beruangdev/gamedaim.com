export function getProtocol() {
  if (process.env.NODE_ENV === "development") {
    return "http://"
  }

  return "https://"
}

export const getDomainWithoutSubdomain = (url: string) => {
  const urlParts = new URL(url).hostname.split(".")

  return urlParts
    .slice(0)
    .slice(-(urlParts.length === 4 ? 3 : 2))
    .join(".")
}
