# E-commerce Website for Indian Ethnic Clothes

## Overview
Shringaarika is a modern React-based e-commerce website for Indian ethnic clothes. Built with performance, accessibility, and SEO optimization in mind, featuring elegant Alice serif typography and a sophisticated user experience.

## Project Structure
```
/GitHub/shringar-tech.github.io
├── .gitignore
├── package.json
├── README.md
├── build
│   ├── asset-manifest.json
│   ├── index.html
│   ├── data
│   │   ├── kurtis.json
│   │   ├── latestcollection.json
│   │   ├── lehengas.json
│   │   └── sarees.json
│   ├── images
│   │   ├── kurti
│   │   ├── lehenga
│   │   └── saree
│   └── static
│       ├── css
│       │   └── main.aedb4c12.chunk.css
│       ├── js
│       └── media
├── public
│   ├── index.html
│   ├── data
│   │   ├── kurtis.json
│   │   ├── lehengas.json
│   │   └── sarees.json
│   ├── images
│   │   ├── kurti
│   │   ├── lehenga
│   │   └── saree
├── src
    ├── App.js
    ├── index.js
    ├── main.css
    ├── components
    │   ├── CategoryPage.css
    │   ├── CategoryPage.js
    │   ├── ContactPage.css
    │   ├── ContactPage.js
    │   ├── HomePage.css
    │   ├── HomePage.js
    │   ├── ItemDetailPage.css
    │   ├── ItemDetailPage.js
    │   ├── SearchModal.css
    │   ├── SearchModal.js
    │   ├── WishlistPage.css
    │   ├── WishlistPage.js
    │   └── layout
    ├── context
    │   ├── ProductContext.js
    │   └── WishlistContext.js
    ├── data
    ├── elements
    │   ├── HeroSection.css
    │   ├── HeroSection.js
    │   ├── NavBar.css
    │   ├── NavBar.js
    │   ├── ProductCard.css
    │   ├── ProductCard.js
    │   ├── ProductCarousel.css
    │   ├── ProductCarousel.js
    │   ├── PromoBanner.css
    │   ├── PromoBanner.js
    │   ├── ScrollToTop.css
    │   └── ScrollToTop.js
    ├── image
    │   └── hero
    ├── styles
    │   ├── mixins.css
    │   └── variables.css
    └── utils
        ├── constants.js
        └── helpers.js
```

## Features
- **Promotional Banner**: Auto-rotating banner with marketing messages
- **Home Page**: Displays product categories in horizontally scrollable carousels with navigation arrows
- **Navigation**: New Arrivals, Best Sellers, Shop All, and Contact sections with search and wishlist icons
- **Category Pages**: Shows items belonging to specific categories
- **Item Detail Page**: Detailed product information with images, descriptions, and pricing
- **Contact Page**: Professional contact information with elegant design
- **Search Functionality**: Real-time product search across all categories with modal interface
- **Wishlist System**: Add/remove items to wishlist with localStorage persistence and dedicated wishlist page
- **State Management**: Context API with useReducer for global product and wishlist state
- **Performance Optimization**: React.memo, lazy loading, debouncing, and memoized calculations
- **Responsive Design**: Mobile-friendly layout with optimized performance and consistent card sizing
- **Accessibility**: WCAG 2.1 AA compliant with screen reader support
- **SEO Optimized**: Meta tags, structured data, and Open Graph integration

## Setup Instructions
1. Clone the repository:
   ```bash
   git clone https://github.com/shringar-tech/shringar-tech.github.io.git
   ```
2. Navigate to the website directory:
   ```bash
   cd shringar-tech.github.io/website
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start development server:
   ```bash
   npm start
   ```

## Build and Deploy

### Option 1: Automated Build and Copy (Recommended)
1. Navigate to website directory:
   ```bash
   cd website
   ```
2. Build and copy to root in one command:
   ```bash
   npm run build-and-copy
   ```
3. Commit and push changes to deploy

### Option 2: Manual Process
1. Navigate to website directory:
   ```bash
   cd website
   ```
2. Build the project:
   ```bash
   npm run build
   ```
3. Manually copy build folder contents to root directory
4. Commit and push changes

### Option 3: GitHub Pages Deploy
1. Navigate to website directory:
   ```bash
   cd website
   ```
2. Deploy using gh-pages:
   ```bash
   npm run deploy
   ```

The site will be available at https://shringar-tech.github.io after deployment.

## Usage
- Navigate to the home page to browse categories.
- Click on a category to view items within that category.
- Select an item to view its details and make a purchase.

## License
This project is licensed under the MIT License.