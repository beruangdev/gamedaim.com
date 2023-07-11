import env from "env"
import Cookies from "js-cookie"

export const useLogout = () => {
  const logout = () => {
    Cookies.set("currentUser", "", {
      path: "/",
      domain: `.${env.DOMAIN}`,
    })
  }

  return { logout }
}
