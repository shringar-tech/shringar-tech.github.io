"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, X, ShoppingCart, MoreVertical } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useCart } from "@/context/cart-context"

export default function MobileHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { cartItems } = useCart()

  return (
    <header className="p-4 bg-[#f8e8d8] border-b border-[#e0c9b1] sticky top-0 z-50">
      <div className="flex items-center justify-between">
        <Button variant="ghost" size="icon" onClick={() => setIsMenuOpen(true)} className="text-[#8a5a44]">
          <Menu className="h-6 w-6" />
        </Button>

        <Link href="/" className="text-center">
          <h1 className="text-2xl font-serif text-[#8a5a44] tracking-widest">SHRINGAARIKA</h1>
          <p className="text-xs text-[#8a5a44]">• SHALINI JHA •</p>
        </Link>

        <div className="flex items-center gap-2">
          <Link href="/cart">
            <Button variant="ghost" size="icon" className="text-[#8a5a44] relative">
              <ShoppingCart className="h-6 w-6" />
              {cartItems.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#f9a8c7] text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartItems.length}
                </span>
              )}
            </Button>
          </Link>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="text-[#8a5a44]">
                <MoreVertical className="h-6 w-6" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>
                <Link href="/account" className="w-full">
                  My Account
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link href="/wishlist" className="w-full">
                  Wishlist
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link href="/track-order" className="w-full">
                  Track Order
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link href="/contact" className="w-full">
                  Contact Us
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="fixed inset-0 bg-black/50 z-50">
          <div className="bg-[#f8e8d8] h-full w-4/5 max-w-xs p-4 flex flex-col">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-serif text-[#8a5a44]">Menu</h2>
              <Button variant="ghost" size="icon" onClick={() => setIsMenuOpen(false)} className="text-[#8a5a44]">
                <X className="h-6 w-6" />
              </Button>
            </div>

            <nav className="flex flex-col gap-4">
              <Link
                href="/"
                className="text-[#8a5a44] py-2 border-b border-[#e0c9b1]"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                href="/collections/sarees"
                className="text-[#8a5a44] py-2 border-b border-[#e0c9b1]"
                onClick={() => setIsMenuOpen(false)}
              >
                Sarees
              </Link>
              <Link
                href="/collections/anarkali"
                className="text-[#8a5a44] py-2 border-b border-[#e0c9b1]"
                onClick={() => setIsMenuOpen(false)}
              >
                Anarkali
              </Link>
              <Link
                href="/collections/lehenga"
                className="text-[#8a5a44] py-2 border-b border-[#e0c9b1]"
                onClick={() => setIsMenuOpen(false)}
              >
                Lehenga
              </Link>
              <Link
                href="/collections/suits"
                className="text-[#8a5a44] py-2 border-b border-[#e0c9b1]"
                onClick={() => setIsMenuOpen(false)}
              >
                Suits
              </Link>
              <Link
                href="/about"
                className="text-[#8a5a44] py-2 border-b border-[#e0c9b1]"
                onClick={() => setIsMenuOpen(false)}
              >
                About Us
              </Link>
              <Link
                href="/contact"
                className="text-[#8a5a44] py-2 border-b border-[#e0c9b1]"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </Link>
            </nav>
          </div>
        </div>
      )}
    </header>
  )
}

