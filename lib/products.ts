// This file simulates a database or API for products
// In a real application, you would replace this with API calls

import { products } from "@/data/products"

export interface Product {
  id: string
  name: string
  price: number
  image: string
  description?: string
  type: string
}

// Get all products of a specific type
export function getProducts(type: string): Product[] {
  return products.filter((product) => product.type === type)
}

// Get a specific product by ID and type
export function getProductById(id: string, type: string): Product | undefined {
  return products.find((product) => product.id === id && product.type === type)
}

// Search products by name or description
export function searchProducts(query: string): Product[] {
  const lowercaseQuery = query.toLowerCase()
  return products.filter(
    (product) =>
      product.name.toLowerCase().includes(lowercaseQuery) ||
      (product.description && product.description.toLowerCase().includes(lowercaseQuery)),
  )
}

// Get featured products (could be based on any criteria)
export function getFeaturedProducts(limit = 4): Product[] {
  // For demo purposes, just return the first few products
  return products.slice(0, limit)
}

