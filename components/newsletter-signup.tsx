"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function NewsletterSignup() {
  const [email, setEmail] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle newsletter signup logic here
    console.log("Subscribing email:", email)
    setEmail("")
    // You would typically send this to your API
  }

  return (
    <section className="p-6 mt-6 border-t border-[#e0c9b1]">
      <h2 className="text-xl font-serif text-[#8a5a44] text-center mb-4">Join Our List</h2>
      <p className="text-sm text-[#8a5a44] text-center mb-4">
        Signup to be the first to hear about exclusive deals, special offers and upcoming collections.
      </p>

      <form onSubmit={handleSubmit} className="flex flex-col gap-2 max-w-xs mx-auto">
        <Input
          type="email"
          placeholder="Your email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="border-[#8a5a44] focus:ring-[#8a5a44] bg-transparent"
        />
        <Button type="submit" className="bg-[#8a5a44] text-white hover:bg-[#6d4636]">
          Subscribe
        </Button>
      </form>
    </section>
  )
}

