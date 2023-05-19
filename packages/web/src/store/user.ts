import { create } from "zustand"
import { persist } from "zustand/middleware"

import { UserDataProps } from "@/lib/data-types"

interface UserStore {
  users: UserDataProps[]
  addUser: (item: UserDataProps[]) => void
  removeUser: (item: UserDataProps) => void
}

export const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      users: [] as UserDataProps[],
      addUser: (item) =>
        set(() => ({
          users: [...item],
        })),
      removeUser: (item) =>
        set((state) => ({
          users: state.users.filter((i) => i.id !== item.id),
        })),
    }),
    {
      name: "userStore",
      version: 1,
    },
  ),
)
