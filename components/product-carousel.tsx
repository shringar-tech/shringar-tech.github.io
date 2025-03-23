"use client"

import { useState } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { useCart } from "@/context/cart-context"

interface Product {
  id: string
  name: string
  price: number
  image: string
  type: string
}

interface ProductCarouselProps {
  products: Product[]
  showPrice: boolean
}

export default function ProductCarousel({ products, showPrice }: ProductCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const { addToCart } = useCart()

  const goToPrevious = () => {
    const isFirstSlide = currentIndex === 0
    const newIndex = isFirstSlide ? products.length - 1 : currentIndex - 1
    setCurrentIndex(newIndex)
  }

  const goToNext = () => {
    const isLastSlide = currentIndex === products.length - 1
    const newIndex = isLastSlide ? 0 : currentIndex + 1
    setCurrentIndex(newIndex)
  }

  if (products.length === 0) {
    return null
  }

  const currentProduct = products[currentIndex]

  return (
    <div className="relative w-full">
      <div className="relative h-[300px] w-full">
        <Image
          src={currentProduct.image || "/placeholder.svg"}
          alt={currentProduct.name}
          fill
          className="object-cover rounded-md"
        />
      </div>

      <button
        onClick={goToPrevious}
        className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/70 rounded-full p-1"
        aria-label="Previous product"
      >
        <ChevronLeft className="h-6 w-6 text-[#8a5a44]" />
      </button>

      <button
        onClick={goToNext}
        className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/70 rounded-full p-1"
        aria-label="Next product"
      >
        <ChevronRight className="h-6 w-6 text-[#8a5a44]" />
      </button>

      <div className="mt-3 text-center">
        <h3 className="text-lg font-medium text-[#8a5a44]">{currentProduct.name}</h3>

        {showPrice && currentProduct.price && (
          <>
            <p className="text-[#8a5a44] font-medium mt-1">₹ {currentProduct.price.toLocaleString()}</p>
            <Button
              className={cn("mt-2 w-full bg-[#8a5a44] text-white hover:bg-[#6d4636]", "rounded-sm py-1")}
              onClick={() => addToCart(currentProduct)}
            >
              Add to cart
            </Button>
          </>
        )}
      </div>
    </div>
  )
}

