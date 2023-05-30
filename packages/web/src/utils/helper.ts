//check if path includes one of routes for authentication
export function findAuthPage(path: string, routes: string[]) {
  return routes.some(function (element) {
    return path.includes(element)
  })
}
