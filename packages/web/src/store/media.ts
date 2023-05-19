"use client"

import { create } from "zustand"
import { persist } from "zustand/middleware"

import { MediaDataProps } from "@/lib/data-types"

interface MediaStore {
  medias: MediaDataProps[]
  addMedia: (item: MediaDataProps[]) => void
  removeMedia: (item: MediaDataProps) => void
}

export const useMediaStore = create<MediaStore>()(
  persist(
    (set) => ({
      medias: [] as MediaDataProps[],
      addMedia: (item) =>
        set(() => ({
          medias: [...item],
        })),
      removeMedia: (item) =>
        set((state) => ({
          medias: state.medias.filter((i) => i.id !== item.id),
        })),
    }),
    {
      name: "mediaStore",
      version: 1,
    },
  ),
)
