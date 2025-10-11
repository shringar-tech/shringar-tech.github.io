# Amazon Q Developer Instructions for Shringaarika E-commerce Website

## Project Overview
Shringaarika is a modern React-based e-commerce website for Indian ethnic clothes featuring promotional banners, product carousels, and optimized performance with Alice serif typography.

## Architecture & Tech Stack
- **Frontend**: React 18.3.1 with React Router 5.3.4
- **State Management**: Context API with useReducer
- **Styling**: CSS3 with Alice serif font, gold accent colors (#d4af37)
- **Performance**: React.memo, useCallback, debounced events
- **Accessibility**: WCAG 2.1 AA compliant
- **SEO**: Meta tags, structured data, Open Graph

## Key Components

### Navigation Structure
- **Left**: New Arrivals, Best Sellers
- **Center**: Shringaarika logo
- **Right**: Shop All, Contact
- **Behavior**: Overlay on homepage, solid background on other pages

### Core Components
- **PromoBanner**: Auto-rotating promotional messages (4s intervals)
- **ProductCarousel**: Horizontal scrolling with touch/drag support
- **ProductCard**: Hover effects, lazy loading, error handling
- **CategoryPage**: Dynamic data loading with fallback mapping

## Development Guidelines

### Code Standards
- Use Alice serif font for all text elements
- Apply gold (#d4af37) for accent colors and highlights
- Implement React.memo for performance optimization
- Use useCallback and useMemo for expensive operations
- Follow semantic HTML structure for accessibility

### File Organization
```
src/
├── components/     # Page-level components
├── elements/       # Reusable UI components
├── context/        # Global state management
├── utils/          # Shared utilities and constants
└── styles/         # Global styles and fonts
```

### Performance Patterns
- Debounce scroll events (10-100ms delays)
- Lazy load images with `loading="lazy"`
- Code split routes with React.lazy()
- Memoize expensive calculations

### Styling Conventions
- Use Alice font: `font-family: 'Alice', serif`
- Gold accents: `color: #d4af37`
- Gradient backgrounds: `linear-gradient(135deg, #faf7f2 0%, #fff9f0 100%)`
- Responsive breakpoint: `@media (max-width: 768px)`

## Data Management

### Product Categories
- **new-arrivals** → latestcollection.json
- **best-sellers** → sarees.json (temporary)
- **shop-all** → sarees.json (temporary)
- **Legacy**: sarees.json, lehengas.json, kurtis.json

### State Structure
```javascript
{
  sarees: [],
  lehengas: [],
  kurtis: [],
  latestCollection: [],
  loading: true,
  error: null
}
```

## Build & Deployment

### Scripts Available
- `npm start` - Development server
- `npm run build` - Production build
- `npm run build-and-copy` - Build and copy to root (recommended)
- `npm run deploy` - GitHub Pages deployment

### Deployment Process
1. Navigate to `/website` directory
2. Run `npm run build-and-copy`
3. Commit and push changes
4. Site deploys to https://shringar-tech.github.io

## Common Tasks

### Adding New Components
1. Create in appropriate directory (components/ or elements/)
2. Apply Alice font and gold accent colors
3. Implement React.memo for performance
4. Add proper ARIA labels for accessibility
5. Include error handling and loading states

### Updating Navigation
- Modify NavBar.js for link changes
- Update App.js routes accordingly
- Ensure proper active state highlighting

### Performance Optimization
- Use debounced event handlers
- Implement lazy loading for images
- Apply memoization patterns
- Monitor bundle size impact

## Accessibility Requirements
- Use semantic HTML elements
- Include ARIA labels and roles
- Maintain 4.5:1 color contrast ratio
- Support keyboard navigation
- Provide skip navigation links

## SEO Best Practices
- Include descriptive meta tags
- Use structured data (JSON-LD)
- Implement Open Graph tags
- Maintain clean URL structure
- Use proper heading hierarchy

## Troubleshooting

### Common Issues
- **Font loading**: Ensure Alice font is properly imported
- **Color consistency**: Use gold (#d4af37) for all accents
- **Performance**: Check for unnecessary re-renders
- **Accessibility**: Run axe-core audits

### Debug Tools
- React DevTools for component inspection
- Lighthouse for performance auditing
- axe DevTools for accessibility testing
- Browser console for error tracking

## Future Enhancements
- Shopping cart functionality
- User authentication system
- Payment gateway integration
- Advanced search and filtering
- Product reviews system
- Admin panel for content management

## Notes for Amazon Q
- Prioritize performance and accessibility in all suggestions
- Maintain consistent Alice serif typography
- Use gold accent colors for brand consistency
- Follow React best practices with hooks and memoization
- Ensure mobile-responsive design patterns