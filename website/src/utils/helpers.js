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