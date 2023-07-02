import { WpCommentDataProps } from "@/lib/data-types"
import { create } from "zustand"
import { persist } from "zustand/middleware"

interface WpCommentStore {
  wpComments: WpCommentDataProps[]
  addWpComment: (item: WpCommentDataProps[]) => void
  removeWpComment: ({ id }: { id: string }) => void
}

const useWpCommentStore = create<WpCommentStore>()(
  persist(
    (set) => ({
      wpComments: [] as WpCommentDataProps[],
      addWpComment: (item) =>
        set(() => ({
          wpComments: [...item],
        })),
      removeWpComment: (item) =>
        set((state) => ({
          wpComments: state.wpComments.filter((i) => i.id !== item.id),
        })),
    }),
    {
      name: "wpcomment-store",
      version: 1,
    },
  ),
)

export default useWpCommentStore
