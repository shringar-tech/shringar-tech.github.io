# E-commerce Website for Indian Ethnic Clothes

## Overview
This project is an e-commerce website designed for showcasing and selling Indian ethnic clothes, including categories like sarees and lehengas. The website allows users to browse items, view details, and make purchases.

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
    │   ├── HomePage.js
    │   ├── ItemDetailPage.css
    │   └── ItemDetailPage.js
    ├── image
        └── background
```

## Features
- **Home Page**: Displays product categories in horizontally scrollable carousels with navigation arrows, styled with an ethnic theme.
- **Category Page**: Shows items belonging to a specific category (e.g., sarees, lehengas).
- **Item Detail Page**: Provides detailed information about a selected item, including images, descriptions, and pricing.
- **Interactive UI Elements**: Modern carousel navigation with custom-designed ethnic-themed controls.

## Setup Instructions
1. Clone the repository:
   ```bash
   git clone https://github.com/shringar-tech/shringar-tech.github.io.git
   ```
2. Navigate to the project directory:
   ```bash
   cd shringar-tech.github.io
   ```
3. Install dependencies:
   ```bash
   npm install
   npm install gh-pages --save-dev
   ```
4. Update package.json with:
   ```json
   {
     "homepage": "https://shringar-tech.github.io",
     "scripts": {
       "predeploy": "npm run build",
       "deploy": "gh-pages -d build",
       // ...existing scripts...
     }
   }
   ```
5. Start development server:
   ```bash
   npm start
   ```

## Build and Deploy
1. Build the project:
   ```bash
   npm run build
   ```
2. Deploy to GitHub Pages:
   ```bash
   npm run deploy
   ```
3. Configure GitHub Pages:
   - Go to repository Settings > Pages
   - Select 'gh-pages' branch as source
   - Save the changes

The site will be available at https://shringar-tech.github.io after deployment.

## Usage
- Navigate to the home page to browse categories.
- Click on a category to view items within that category.
- Select an item to view its details and make a purchase.

## License
This project is licensed under the MIT License.