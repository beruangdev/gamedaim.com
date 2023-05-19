"use client"

import { create } from "zustand"
import { persist } from "zustand/middleware"

import { AdDataProps } from "@/lib/data-types"

interface AdStore {
  ads: AdDataProps[]
  addAd: (item: AdDataProps[]) => void
  removeAd: (item: AdDataProps) => void
}

export const useAdStore = create<AdStore>()(
  persist(
    (set) => ({
      ads: [] as AdDataProps[],
      addAd: (item) =>
        set(() => ({
          ads: [...item],
        })),
      removeAd: (item) =>
        set((state) => ({
          ads: state.ads.filter((i) => i.id !== item.id),
        })),
    }),
    {
      name: "adStore",
      version: 1,
    },
  ),
)
