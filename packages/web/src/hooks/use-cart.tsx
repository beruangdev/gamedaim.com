"use client"

import * as React from "react"
import { TopupProductProps } from "@/lib/data-types"

const useCart = (): [
  TopupProductProps[],
  (item: TopupProductProps) => void,
  (itemId: string) => void,
] => {
  // Menggunakan useState untuk menyimpan data item keranjang
  const [cartItems, setCartItems] = React.useState<TopupProductProps[]>([])

  // Menggunakan useEffect untuk memperbarui local storage saat cartItems berubah
  React.useEffect(() => {
    // Mendapatkan data cartItems dari local storage
    const data = localStorage.getItem("cartItems")
    if (data) {
      setCartItems(JSON.parse(data))
    }
  }, [])

  // Menggunakan useEffect untuk menyimpan data cartItems pada local storage saat berubah
  React.useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems))
  }, [cartItems])

  // Fungsi untuk menambahkan item ke keranjang
  const addItemToCart = (item: TopupProductProps): void => {
    setCartItems((prevCartItems) => [...prevCartItems, item])
  }

  const removeItemFromCart = (itemId: string): void => {
    setCartItems((prevCartItems) =>
      prevCartItems.filter((item) => item.id !== itemId),
    )
  }

  return [cartItems, addItemToCart, removeItemFromCart]
}

export default useCart
