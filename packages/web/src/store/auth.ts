import { produce } from "immer"
import { create } from "zustand"
import { persist, createJSONStorage } from "zustand/middleware"

import { UserDataProps } from "@/lib/data-types"

interface AuthProps {
  user: UserDataProps | null
  accessToken: string | null
}

type AuthStoreType = {
  auth: AuthProps
  isAuthenticated: boolean
  isLoading: boolean
  isAdmin: boolean
  isAuthor: boolean
  isUser: boolean
  login: (auth: AuthProps) => void
  signup: (auth: AuthProps) => void
  logout: () => void
  stopLoading: () => void
}

export const useAuthStore = create<AuthStoreType>()(
  persist(
    (set) => ({
      auth: { user: null, accessToken: null },
      isAuthenticated: false,
      isLoading: true,
      isAdmin: false,
      isAuthor: false,
      isUser: false,
      login: (auth) => {
        set(
          produce<AuthStoreType>((state) => {
            state.isAuthenticated = true
            state.auth.user = auth.user
            state.auth.accessToken = auth.accessToken
            if (auth.user?.role.includes("ADMIN")) {
              state.isAdmin = true
            } else if (auth.user?.role.includes("AUTHOR")) {
              state.isAuthor = true
            } else {
              state.isUser = true
            }
          }),
        )
      },
      signup: (auth) => {
        set(
          produce<AuthStoreType>((state) => {
            state.isAuthenticated = true
            state.auth.user = auth.user
            state.auth.accessToken = auth.accessToken
            if (auth.user?.role.includes("ADMIN")) {
              state.isAdmin = true
            } else {
              state.isUser = true
            }
          }),
        )
      },
      logout: () => {
        localStorage.removeItem("authStore")
        set(
          produce<AuthStoreType>((state) => {
            state.isAuthenticated = false
            state.auth.user = null
            state.auth.accessToken = null
            state.isAdmin = false
            state.isAuthor = false
            state.isUser = false
          }),
        )
      },
      stopLoading: () => {
        set(
          produce<AuthStoreType>((state) => {
            state.isLoading = false
          }),
        )
      },
    }),
    {
      name: "authStore",
      storage: createJSONStorage(() => localStorage),
    },
  ),
)
