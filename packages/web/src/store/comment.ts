import { create } from "zustand"
import { persist } from "zustand/middleware"

import { CommentDataProps } from "@/lib/data-types"

interface CommentStore {
  comments: CommentDataProps[]
  addComment: (item: CommentDataProps[]) => void
  removeComment: (item: CommentDataProps) => void
}

export const useCommentStore = create<CommentStore>()(
  persist(
    (set) => ({
      comments: [] as CommentDataProps[],
      addComment: (item) =>
        set(() => ({
          comments: [...item],
        })),
      removeComment: (item) =>
        set((state) => ({
          comments: state.comments.filter((i) => i.id !== item.id),
        })),
    }),
    {
      name: "commentStore",
      version: 1,
    },
  ),
)
