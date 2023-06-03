import { toast } from "@/components/UI/Toast"
import { deleteTopicAction } from "@/lib/api/server/topic"

export const handleDeleteTopic = async (
  topicId: string,
  updateTopic: () => void,
) => {
  const { data, error } = await deleteTopicAction(topicId)
  if (data) {
    toast({
      variant: "success",
      description: "Successfully delete topic!",
    })
    updateTopic()
  } else if (error) {
    toast({
      variant: "danger",
      description: error,
    })
  }
}
