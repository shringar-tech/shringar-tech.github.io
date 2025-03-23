"use client"

import Image from "next/image"
import Link from "next/link"
import { Facebook, Instagram, PinIcon as Pinterest, PhoneIcon as WhatsApp } from "lucide-react"
import ProductCarousel from "@/components/product-carousel"
import NewsletterSignup from "@/components/newsletter-signup"
import { Button } from "@/components/ui/button"
import MobileHeader from "@/components/mobile-header"
import DesktopHeader from "@/components/desktop-header"
import { getProducts } from "@/lib/products"

export default function Home() {
  // Get products from our data files (will be replaced with API calls later)
  const sarees = getProducts("sarees")
  const anarkalis = getProducts("anarkalis")
  const lehengas = getProducts("lehengas")
  const suits = getProducts("suits")
  const latestCollections = [...sarees, ...anarkalis].slice(0, 4)

  return (
    <main className="flex min-h-screen flex-col bg-[#f8e8d8]">
      {/* Responsive Header */}
      <div className="md:hidden">
        <MobileHeader />
      </div>
      <div className="hidden md:block">
        <DesktopHeader />
      </div>

      {/* Hero Banner */}
      <section className="relative w-full h-[200px] md:h-[400px] bg-[#f8e8d8]">
        <Image
          src="/placeholder.svg?height=800&width=1600"
          alt="Elegant Indian Ethnic Wear"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white bg-black/30">
          <h2 className="text-2xl md:text-4xl font-serif">Elegant Indian Ethnic Wear</h2>
          <p className="text-sm md:text-base mt-2">Discover Timeless Beauty</p>
        </div>
      </section>

      {/* Latest Collections */}
      <section className="p-4 md:p-8 mt-6">
        <h2 className="text-xl md:text-2xl font-serif text-[#8a5a44] text-center mb-4">OUR LATEST COLLECTIONS</h2>
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {latestCollections.map((product) => (
            <div key={product.id} className="relative group">
              <div className="relative h-[300px] w-full overflow-hidden rounded-md">
                <Image
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <div className="mt-3 text-center">
                <h3 className="text-lg font-medium text-[#8a5a44]">{product.name}</h3>
              </div>
            </div>
          ))}
        </div>
        <div className="md:hidden">
          <ProductCarousel products={latestCollections.slice(0, 2)} showPrice={false} />
        </div>
        <div className="flex justify-center mt-6">
          <Button variant="outline" className="border-[#8a5a44] text-[#8a5a44] hover:bg-[#8a5a44] hover:text-white">
            View Full Store
          </Button>
        </div>
      </section>

      {/* Brand Description */}
      <section className="p-6 md:p-12 mt-6 bg-[#f9a8c7] text-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-serif text-center mb-2">SHRINGAARIKA</h2>
          <h3 className="text-lg font-serif text-center mb-4">• SHALINI JHA •</h3>
          <p className="text-sm md:text-base text-center max-w-2xl mx-auto">
            SHRINGAARIKA was founded by Shalini Jha, a passionate curator for blending the traditional with the modern.
            She believes that every woman deserves to feel beautiful and confident with cherished but contemporary
            ethnic wear.
          </p>
          <div className="flex justify-center mt-6">
            <Button variant="outline" className="border-white text-white hover:bg-white hover:text-[#f9a8c7]">
              Check out our story
            </Button>
          </div>
        </div>
      </section>

      {/* Product Categories - Mobile View */}
      <div className="md:hidden">
        {/* Sarees Section */}
        <section className="p-4 mt-6">
          <h2 className="text-xl font-serif text-[#8a5a44] text-center mb-4">SAREES</h2>
          <ProductCarousel products={sarees} showPrice={true} />
        </section>

        {/* Anarkali Section */}
        <section className="p-4 mt-6">
          <h2 className="text-xl font-serif text-[#8a5a44] text-center mb-4">ANARKALI</h2>
          <ProductCarousel products={anarkalis} showPrice={true} />
        </section>

        {/* Lehenga Section */}
        <section className="p-4 mt-6">
          <h2 className="text-xl font-serif text-[#8a5a44] text-center mb-4">LEHENGA</h2>
          <ProductCarousel products={lehengas} showPrice={true} />
        </section>

        {/* Suits Section */}
        <section className="p-4 mt-6">
          <h2 className="text-xl font-serif text-[#8a5a44] text-center mb-4">SUITS</h2>
          <ProductCarousel products={suits} showPrice={true} />
        </section>
      </div>

      {/* Product Categories - Desktop View */}
      <div className="hidden md:block">
        {/* Sarees Section */}
        <section className="p-8 mt-6">
          <h2 className="text-2xl font-serif text-[#8a5a44] text-center mb-6">SAREES</h2>
          <div className="grid grid-cols-3 lg:grid-cols-4 gap-6">
            {sarees.map((product) => (
              <div key={product.id} className="group">
                <div className="relative h-[350px] w-full overflow-hidden rounded-md">
                  <Image
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <div className="mt-3 text-center">
                  <h3 className="text-lg font-medium text-[#8a5a44]">{product.name}</h3>
                  <p className="text-[#8a5a44] font-medium mt-1">₹ {product.price.toLocaleString()}</p>
                  <Button
                    className="mt-2 w-full bg-[#8a5a44] text-white hover:bg-[#6d4636] rounded-sm py-1"
                    onClick={() => (window.location.href = `/cart?add=${product.id}&type=sarees`)}
                  >
                    Add to cart
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Other categories follow the same pattern */}
        <section className="p-8 mt-6">
          <h2 className="text-2xl font-serif text-[#8a5a44] text-center mb-6">ANARKALI</h2>
          <div className="grid grid-cols-3 lg:grid-cols-4 gap-6">
            {anarkalis.map((product) => (
              <div key={product.id} className="group">
                <div className="relative h-[350px] w-full overflow-hidden rounded-md">
                  <Image
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <div className="mt-3 text-center">
                  <h3 className="text-lg font-medium text-[#8a5a44]">{product.name}</h3>
                  <p className="text-[#8a5a44] font-medium mt-1">₹ {product.price.toLocaleString()}</p>
                  <Button
                    className="mt-2 w-full bg-[#8a5a44] text-white hover:bg-[#6d4636] rounded-sm py-1"
                    onClick={() => (window.location.href = `/cart?add=${product.id}&type=anarkalis`)}
                  >
                    Add to cart
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Newsletter */}
      <NewsletterSignup />

      {/* Footer */}
      <footer className="p-6 bg-[#f8e8d8] text-[#8a5a44] text-center border-t border-[#e0c9b1]">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-xs mb-6">
          <Link href="#" className="hover:underline">
            Shipping Policy
          </Link>
          <Link href="#" className="hover:underline">
            Privacy Policy
          </Link>
          <Link href="#" className="hover:underline">
            Returns & Cancellations
          </Link>
          <Link href="#" className="hover:underline">
            Terms & Conditions
          </Link>
        </div>

        <div className="mb-6">
          <h3 className="text-sm font-semibold mb-2">CONTACT US</h3>
          <p className="text-xs">info@shringaarika.com</p>
          <p className="text-xs">Ph no: 9XXXXXXXXX</p>
        </div>

        <div className="mb-6">
          <h2 className="text-2xl font-serif mb-1">SHRINGAARIKA</h2>
          <h3 className="text-sm font-serif">• SHALINI JHA •</h3>
        </div>

        <div className="flex justify-center gap-4 text-[#8a5a44]">
          <Link href="#" aria-label="Facebook">
            <Facebook size={20} />
          </Link>
          <Link href="#" aria-label="Instagram">
            <Instagram size={20} />
          </Link>
          <Link href="#" aria-label="WhatsApp">
            <WhatsApp size={20} />
          </Link>
          <Link href="#" aria-label="Pinterest">
            <Pinterest size={20} />
          </Link>
        </div>
      </footer>
    </main>
  )
}

