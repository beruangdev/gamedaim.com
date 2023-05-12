import { create } from "zustand"
import { persist } from "zustand/middleware"

import { ArticleDataProps } from "@/lib/data-types"

interface ArticleStore {
  articles: ArticleDataProps[]
  addArticle: (item: ArticleDataProps[]) => void
  removeArticle: (item: ArticleDataProps) => void
}

export const useArticleStore = create<ArticleStore>()(
  persist(
    (set) => ({
      articles: [] as ArticleDataProps[],
      addArticle: (item) =>
        set(() => ({
          articles: [...item],
        })),
      removeArticle: (item) =>
        set((state) => ({
          articles: state.articles.filter((i) => i.id !== item.id),
        })),
    }),
    {
      name: "articleStore",
      version: 1,
    },
  ),
)
