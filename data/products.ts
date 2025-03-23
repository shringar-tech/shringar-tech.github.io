// Export the products data for use in the application
import productsData from "./products.json"

export const products = productsData.products.map((product) => ({
  ...product,
  type: product.id.split("-")[0] + "s", // Convert 'saree-001' to 'sarees'
}))

