import { toast } from "@/components/UI/Toast"

import { deleteArticleAction } from "@/lib/api/server/article"

export const handleDeleteArticle = async (
  articleId: string,
  updateArticle: () => void,
) => {
  const { data, error } = await deleteArticleAction(articleId)
  if (data) {
    toast({
      variant: "success",
      description: "Successfully delete article!",
    })
    updateArticle()
  } else if (error) {
    toast({
      variant: "danger",
      description: error,
    })
  }
}
