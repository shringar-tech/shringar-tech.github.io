const API_BASE = '/data';

export const productService = {
  async getProducts(category) {
    const response = await fetch(`${API_BASE}/${category}.json`);
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