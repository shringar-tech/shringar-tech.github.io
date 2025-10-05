// Shared utility functions

export const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

export const formatPrice = (price) => {
  return `₹${(price || 0).toLocaleString('en-IN')}`;
};

export const handleImageError = (fallbackSrc = '/images/placeholder.png') => (e) => {
  e.target.src = fallbackSrc;
  console.warn('Failed to load image, using fallback');
};

export const filterItems = (items, activeFilters) => {
  return items.filter(item => {
    return Object.entries(activeFilters).every(([filterKey, filterValues]) => {
      if (!filterValues || filterValues.length === 0) return true;
      
      switch (filterKey) {
        case 'priceRange':
          return filterValues.some(range => {
            const [min, max] = range.split('-').map(Number);
            return item.price >= min && (max ? item.price <= max : true);
          });
        case 'color':
          return filterValues.some(color => 
            item.color?.toLowerCase().includes(color.toLowerCase())
          );
        default:
          return true;
      }
    });
  });
};

export const sortItems = (items, sortBy) => {
  const sorted = [...items];
  
  switch (sortBy) {
    case 'price-low':
      return sorted.sort((a, b) => (a.price || 0) - (b.price || 0));
    case 'price-high':
      return sorted.sort((a, b) => (b.price || 0) - (a.price || 0));
    case 'name-asc':
      return sorted.sort((a, b) => (a.name || '').localeCompare(b.name || ''));
    case 'name-desc':
      return sorted.sort((a, b) => (b.name || '').localeCompare(a.name || ''));
    default:
      return sorted;
  }
};

export const getFilterOptions = (items) => {
  const priceRanges = [
    { value: '0-1000', label: 'Under ₹1,000' },
    { value: '1000-2500', label: '₹1,000 - ₹2,500' },
    { value: '2500-5000', label: '₹2,500 - ₹5,000' },
    { value: '5000-', label: 'Above ₹5,000' }
  ];
  
  const colors = [...new Set(items.map(item => item.color).filter(Boolean))]
    .map(color => ({ value: color.toLowerCase(), label: color }));
  
  return [
    {
      key: 'priceRange',
      label: 'Price Range',
      options: priceRanges
    },
    {
      key: 'color',
      label: 'Color',
      options: colors
    }
  ];
};