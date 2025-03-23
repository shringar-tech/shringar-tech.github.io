"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

export interface Product {
  id: string
  name: string
  price: number
  image: string
  type: string
  quantity: number
}

interface CartContextType {
  cartItems: Product[]
  addToCart: (product: Omit<Product, "quantity">) => void
  removeFromCart: (id: string, type: string) => void
  updateQuantity: (id: string, type: string, quantity: number) => void
  clearCart: () => void
  couponCode: string
  setCouponCode: (code: string) => void
  applyCoupon: (code: string) => void
  discount: number
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: ReactNode }) {
  const [cartItems, setCartItems] = useState<Product[]>([])
  const [couponCode, setCouponCode] = useState("")
  const [discount, setDiscount] = useState(0)

  // Load cart from localStorage on initial render
  useEffect(() => {
    const savedCart = localStorage.getItem("cart")
    if (savedCart) {
      try {
        setCartItems(JSON.parse(savedCart))
      } catch (error) {
        console.error("Failed to parse cart from localStorage:", error)
      }
    }

    const savedDiscount = localStorage.getItem("discount")
    if (savedDiscount) {
      try {
        setDiscount(JSON.parse(savedDiscount))
      } catch (error) {
        console.error("Failed to parse discount from localStorage:", error)
      }
    }

    const savedCoupon = localStorage.getItem("couponCode")
    if (savedCoupon) {
      setCouponCode(savedCoupon)
    }
  }, [])

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems))
  }, [cartItems])

  // Save discount to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("discount", JSON.stringify(discount))
  }, [discount])

  // Save coupon code to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("couponCode", couponCode)
  }, [couponCode])

  const addToCart = (product: Omit<Product, "quantity">) => {
    setCartItems((prevItems) => {
      // Check if product already exists in cart
      const existingItemIndex = prevItems.findIndex((item) => item.id === product.id && item.type === product.type)

      if (existingItemIndex !== -1) {
        // If it exists, increment quantity
        const updatedItems = [...prevItems]
        updatedItems[existingItemIndex] = {
          ...updatedItems[existingItemIndex],
          quantity: updatedItems[existingItemIndex].quantity + 1,
        }
        return updatedItems
      } else {
        // If it doesn't exist, add it with quantity 1
        return [...prevItems, { ...product, quantity: 1 }]
      }
    })
  }

  const removeFromCart = (id: string, type: string) => {
    setCartItems((prevItems) => prevItems.filter((item) => !(item.id === id && item.type === type)))
  }

  const updateQuantity = (id: string, type: string, quantity: number) => {
    setCartItems((prevItems) =>
      prevItems.map((item) => (item.id === id && item.type === type ? { ...item, quantity } : item)),
    )
  }

  const clearCart = () => {
    setCartItems([])
    setDiscount(0)
    setCouponCode("")
  }

  // Simple coupon system - in a real app, this would validate against a database
  const applyCoupon = (code: string) => {
    // Reset any existing discount
    setDiscount(0)

    // Apply discount based on coupon code
    if (code === "WELCOME10") {
      // 10% discount
      const subtotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0)
      setDiscount(Math.round(subtotal * 0.1))
    } else if (code === "FLAT500") {
      // Flat ₹500 off
      setDiscount(500)
    } else if (code === "SUMMER20") {
      // 20% discount
      const subtotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0)
      setDiscount(Math.round(subtotal * 0.2))
    } else {
      alert("Invalid coupon code")
    }
  }

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        couponCode,
        setCouponCode,
        applyCoupon,
        discount,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return context
}

