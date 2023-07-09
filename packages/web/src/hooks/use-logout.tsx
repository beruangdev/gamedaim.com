import env from "env"
import Cookies from "js-cookie"

export const useLogout = () => {
  const logout = () => {
    Cookies.remove("currentUser", {
      path: "/",
      domain: `.${env.DOMAIN}`,
    })
  }

  return { logout }
}
