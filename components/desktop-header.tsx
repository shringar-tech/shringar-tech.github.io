"use client"

import Link from "next/link"
import { ShoppingCart, User, Heart, Search, MoreVertical } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useCart } from "@/context/cart-context"

export default function DesktopHeader() {
  const { cartItems } = useCart()

  return (
    <header className="bg-[#f8e8d8] border-b border-[#e0c9b1] sticky top-0 z-50">
      <div className="container mx-auto px-4">
        {/* Top Bar */}
        <div className="flex justify-between items-center py-2 border-b border-[#e0c9b1]">
          <div className="flex items-center gap-4">
            <Link href="/contact" className="text-xs text-[#8a5a44] hover:underline">
              Contact Us
            </Link>
            <Link href="/track-order" className="text-xs text-[#8a5a44] hover:underline">
              Track Order
            </Link>
          </div>

          <div className="flex items-center gap-4">
            <Link href="/account" className="text-xs text-[#8a5a44] hover:underline">
              My Account
            </Link>
            <Link href="/wishlist" className="text-xs text-[#8a5a44] hover:underline">
              Wishlist
            </Link>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="text-[#8a5a44] h-6 w-6">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>
                  <Link href="/size-guide" className="w-full">
                    Size Guide
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href="/faq" className="w-full">
                    FAQ
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href="/shipping" className="w-full">
                    Shipping Info
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* Main Header */}
        <div className="py-4 flex justify-between items-center">
          <Link href="/" className="text-center">
            <h1 className="text-3xl font-serif text-[#8a5a44] tracking-widest">SHRINGAARIKA</h1>
            <p className="text-xs text-[#8a5a44]">• SHALINI JHA •</p>
          </Link>

          <div className="flex items-center gap-2 w-1/3">
            <div className="relative w-full">
              <Input
                type="search"
                placeholder="Search products..."
                className="border-[#8a5a44] focus:ring-[#8a5a44] pr-8"
              />
              <Search className="absolute right-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[#8a5a44]" />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Link href="/account">
              <Button variant="ghost" size="icon" className="text-[#8a5a44]">
                <User className="h-5 w-5" />
              </Button>
            </Link>
            <Link href="/wishlist">
              <Button variant="ghost" size="icon" className="text-[#8a5a44]">
                <Heart className="h-5 w-5" />
              </Button>
            </Link>
            <Link href="/cart">
              <Button variant="ghost" size="icon" className="text-[#8a5a44] relative">
                <ShoppingCart className="h-5 w-5" />
                {cartItems.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-[#f9a8c7] text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {cartItems.length}
                  </span>
                )}
              </Button>
            </Link>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex justify-center py-2">
          <div className="flex gap-8">
            <Link href="/" className="text-[#8a5a44] hover:text-[#6d4636] font-medium">
              Home
            </Link>
            <Link href="/collections/sarees" className="text-[#8a5a44] hover:text-[#6d4636] font-medium">
              Sarees
            </Link>
            <Link href="/collections/anarkali" className="text-[#8a5a44] hover:text-[#6d4636] font-medium">
              Anarkali
            </Link>
            <Link href="/collections/lehenga" className="text-[#8a5a44] hover:text-[#6d4636] font-medium">
              Lehenga
            </Link>
            <Link href="/collections/suits" className="text-[#8a5a44] hover:text-[#6d4636] font-medium">
              Suits
            </Link>
            <Link href="/about" className="text-[#8a5a44] hover:text-[#6d4636] font-medium">
              About Us
            </Link>
          </div>
        </nav>
      </div>
    </header>
  )
}

