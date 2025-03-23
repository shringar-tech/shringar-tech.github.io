"use client"

import { useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { Minus, Plus, X, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { useCart } from "@/context/cart-context"
import { getProductById } from "@/lib/products"

export default function CartPage() {
  const searchParams = useSearchParams()
  const { cartItems, addToCart, removeFromCart, updateQuantity, applyCoupon, couponCode, setCouponCode, discount } =
    useCart()

  // Handle add to cart from URL params
  useEffect(() => {
    const productId = searchParams.get("add")
    const productType = searchParams.get("type")

    if (productId && productType) {
      const product = getProductById(productId, productType)
      if (product) {
        addToCart(product)
        // Clear URL params after adding to cart
        window.history.replaceState({}, "", "/cart")
      }
    }
  }, [searchParams, addToCart])

  // Calculate totals
  const subtotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0)
  const shipping = subtotal > 0 ? 150 : 0
  const total = subtotal + shipping - discount

  // Handle coupon application
  const handleApplyCoupon = () => {
    applyCoupon(couponCode)
  }

  if (cartItems.length === 0) {
    return (
      <div className="max-w-4xl mx-auto py-12 px-4">
        <h1 className="text-2xl md:text-3xl font-serif text-[#8a5a44] text-center mb-6">Your Cart</h1>
        <div className="text-center py-12">
          <p className="text-lg text-[#8a5a44] mb-6">Your cart is empty</p>
          <Link href="/">
            <Button className="bg-[#8a5a44] text-white hover:bg-[#6d4636]">Continue Shopping</Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto py-8 px-4">
      <h1 className="text-2xl md:text-3xl font-serif text-[#8a5a44] text-center mb-6">Your Cart</h1>

      <div className="grid md:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="md:col-span-2">
          <div className="hidden md:grid grid-cols-5 gap-4 pb-2 border-b border-[#e0c9b1]">
            <div className="col-span-2 font-medium text-[#8a5a44]">Product</div>
            <div className="text-center font-medium text-[#8a5a44]">Price</div>
            <div className="text-center font-medium text-[#8a5a44]">Quantity</div>
            <div className="text-right font-medium text-[#8a5a44]">Total</div>
          </div>

          {cartItems.map((item) => (
            <div key={`${item.id}-${item.type}`} className="py-4 border-b border-[#e0c9b1]">
              <div className="md:grid md:grid-cols-5 md:gap-4 md:items-center">
                {/* Mobile: Product with image, name, price */}
                <div className="flex md:hidden items-center gap-4 mb-4">
                  <div className="relative h-20 w-20 flex-shrink-0">
                    <Image
                      src={item.image || "/placeholder.svg"}
                      alt={item.name}
                      fill
                      className="object-cover rounded-md"
                    />
                  </div>
                  <div className="flex-grow">
                    <h3 className="font-medium text-[#8a5a44]">{item.name}</h3>
                    <p className="text-sm text-[#8a5a44]">₹ {item.price.toLocaleString()}</p>
                  </div>
                  <button
                    onClick={() => removeFromCart(item.id, item.type)}
                    className="text-[#8a5a44]"
                    aria-label="Remove item"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>

                {/* Desktop: Product with image and name */}
                <div className="hidden md:flex md:col-span-2 items-center gap-4">
                  <button
                    onClick={() => removeFromCart(item.id, item.type)}
                    className="text-[#8a5a44]"
                    aria-label="Remove item"
                  >
                    <X className="h-5 w-5" />
                  </button>
                  <div className="relative h-20 w-20 flex-shrink-0">
                    <Image
                      src={item.image || "/placeholder.svg"}
                      alt={item.name}
                      fill
                      className="object-cover rounded-md"
                    />
                  </div>
                  <h3 className="font-medium text-[#8a5a44]">{item.name}</h3>
                </div>

                {/* Desktop: Price */}
                <div className="hidden md:block text-center text-[#8a5a44]">₹ {item.price.toLocaleString()}</div>

                {/* Quantity */}
                <div className="flex items-center justify-between md:justify-center">
                  <span className="md:hidden text-[#8a5a44]">Quantity:</span>
                  <div className="flex items-center border border-[#e0c9b1] rounded-md">
                    <button
                      onClick={() => updateQuantity(item.id, item.type, Math.max(1, item.quantity - 1))}
                      className="px-2 py-1 text-[#8a5a44]"
                      aria-label="Decrease quantity"
                    >
                      <Minus className="h-4 w-4" />
                    </button>
                    <span className="px-3 py-1 text-[#8a5a44]">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.type, item.quantity + 1)}
                      className="px-2 py-1 text-[#8a5a44]"
                      aria-label="Increase quantity"
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                {/* Total */}
                <div className="mt-2 md:mt-0 flex justify-between md:block md:text-right text-[#8a5a44]">
                  <span className="md:hidden">Total:</span>
                  <span>₹ {(item.price * item.quantity).toLocaleString()}</span>
                </div>
              </div>
            </div>
          ))}

          <div className="mt-6">
            <Link href="/">
              <Button variant="outline" className="border-[#8a5a44] text-[#8a5a44] hover:bg-[#8a5a44] hover:text-white">
                Continue Shopping
              </Button>
            </Link>
          </div>
        </div>

        {/* Order Summary */}
        <div className="bg-[#f9f5f0] p-6 rounded-md">
          <h2 className="text-xl font-serif text-[#8a5a44] mb-4">Order Summary</h2>

          <div className="space-y-3 mb-6">
            <div className="flex justify-between text-[#8a5a44]">
              <span>Subtotal</span>
              <span>₹ {subtotal.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-[#8a5a44]">
              <span>Shipping</span>
              <span>₹ {shipping.toLocaleString()}</span>
            </div>
            {discount > 0 && (
              <div className="flex justify-between text-[#8a5a44]">
                <span>Discount</span>
                <span>- ₹ {discount.toLocaleString()}</span>
              </div>
            )}
            <Separator className="bg-[#e0c9b1]" />
            <div className="flex justify-between text-[#8a5a44] font-bold">
              <span>Total</span>
              <span>₹ {total.toLocaleString()}</span>
            </div>
          </div>

          {/* Coupon Code */}
          <div className="mb-6">
            <h3 className="text-sm font-medium text-[#8a5a44] mb-2">Apply Coupon</h3>
            <div className="flex gap-2">
              <Input
                type="text"
                placeholder="Enter coupon code"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
                className="border-[#e0c9b1] focus:ring-[#8a5a44]"
              />
              <Button
                onClick={handleApplyCoupon}
                variant="outline"
                className="border-[#8a5a44] text-[#8a5a44] hover:bg-[#8a5a44] hover:text-white"
              >
                Apply
              </Button>
            </div>
          </div>

          {/* Checkout Button */}
          <Button
            className="w-full bg-[#8a5a44] text-white hover:bg-[#6d4636]"
            onClick={() => (window.location.href = "/checkout")}
          >
            Proceed to Checkout <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}

