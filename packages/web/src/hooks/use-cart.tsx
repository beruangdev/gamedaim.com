import { create } from "zustand"
import { persist } from "zustand/middleware"
import { TopupProductProps } from "@/lib/data-types"

interface Cart {
  items: TopupProductProps[]
}

interface CartStore {
  cart: Cart
  addToCart: (item: TopupProductProps) => void
  removeFromCart: (item: TopupProductProps) => void
}

const useCartStore = create<CartStore>()(
  persist(
    (set) => ({
      cart: {
        items: [] as TopupProductProps[],
      },
      addToCart: (item) =>
        set((state) => ({
          cart: { items: [...state.cart.items, item] },
        })),
      removeFromCart: (item) =>
        set((state) => ({
          cart: { items: state.cart.items.filter((i) => i.id !== item.id) },
        })),
    }),
    {
      name: "cart-store",
      version: 1,
    },
  ),
)

export default useCartStore
