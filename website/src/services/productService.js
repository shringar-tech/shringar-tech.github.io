const API_BASE = '/data';
const ALLOWED_CATEGORIES = ['sarees', 'lehengas', 'kurtis', 'latestcollection'];

const validateCategory = (category) => {
  if (!ALLOWED_CATEGORIES.includes(category)) {
    throw new Error('Invalid category');
  }
  return category.replace(/[^a-zA-Z]/g, '');
};

export const productService = {
  async getProducts(category) {
    const validCategory = validateCategory(category);
    const response = await fetch(`${API_BASE}/${validCategory}.json`);
    return response.json();
  },

  async getAllProducts() {
    const categories = ['sarees', 'lehengas', 'kurtis', 'latestcollection'];
    const promises = categories.map(cat => this.getProducts(cat));
    const results = await Promise.all(promises);
    
    return categories.reduce((acc, cat, index) => {
      acc[cat] = results[index];
      return acc;
    }, {});
  },

  async getProductById(category, id) {
    const products = await this.getProducts(category);
    return products.find(item => item.id === parseInt(id));
  }
};