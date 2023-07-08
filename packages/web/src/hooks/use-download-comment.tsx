import { create } from "zustand"
import { persist } from "zustand/middleware"

import { CommentDataProps } from "@/lib/data-types"

interface DownloadCommentStore {
  downloadComments: CommentDataProps[]
  addDownloadComment: (item: CommentDataProps[]) => void
  removeDownloadComment: ({ id }: { id: string }) => void
}

const useDownloadCommentStore = create<DownloadCommentStore>()(
  persist(
    (set) => ({
      downloadComments: [] as CommentDataProps[],
      addDownloadComment: (item) =>
        set(() => ({
          downloadComments: [...item],
        })),
      removeDownloadComment: (item) =>
        set((state) => ({
          downloadComments: state.downloadComments.filter(
            (i) => i.id !== item.id,
          ),
        })),
    }),
    {
      name: "download-comment-store",
      version: 1,
    },
  ),
)

export default useDownloadCommentStore
