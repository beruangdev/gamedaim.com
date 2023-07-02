import { CommentDataProps } from "@/lib/data-types"
import { create } from "zustand"
import { persist } from "zustand/middleware"

interface ArticleCommentStore {
  articleComments: CommentDataProps[]
  addArticleComment: (item: CommentDataProps[]) => void
  removeArticleComment: ({ id }: { id: string }) => void
}

const useArticleCommentStore = create<ArticleCommentStore>()(
  persist(
    (set) => ({
      articleComments: [] as CommentDataProps[],
      addArticleComment: (item) =>
        set(() => ({
          articleComments: [...item],
        })),
      removeArticleComment: (item) =>
        set((state) => ({
          articleComments: state.articleComments.filter(
            (i) => i.id !== item.id,
          ),
        })),
    }),
    {
      name: "article-comment-store",
      version: 1,
    },
  ),
)

export default useArticleCommentStore
