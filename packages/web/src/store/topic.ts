"use client"

import { create } from "zustand"
import { persist } from "zustand/middleware"

import { TopicDataProps } from "@/lib/data-types"

interface TopicStore {
  topics: TopicDataProps[]
  addTopic: (item: TopicDataProps[]) => void
  removeTopic: (item: TopicDataProps) => void
}

export const useTopicStore = create<TopicStore>()(
  persist(
    (set) => ({
      topics: [] as TopicDataProps[],
      addTopic: (item) =>
        set(() => ({
          topics: [...item],
        })),
      removeTopic: (item) =>
        set((state) => ({
          topics: state.topics.filter((i) => i.id !== item.id),
        })),
    }),
    {
      name: "topicStore",
      version: 1,
    },
  ),
)
