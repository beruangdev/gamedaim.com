export function wpSanitizeExcerpt(excerpt: string) {
  let sanitized = excerpt

  sanitized = sanitized.replace(/\s?\[&hellip;\]/, "&hellip;")
  sanitized = sanitized.replace("....", ".")
  sanitized = sanitized.replace(".&hellip;", ".")
  sanitized = sanitized.replace(/<p>/gi, "")
  sanitized = sanitized.replace(/<\/p>/gi, "")
  sanitized = sanitized.replace(/\w*<a class="more-link".*<\/a>/, "")

  return sanitized
}
