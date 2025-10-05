import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useProducts } from '../context/ProductContext';
import './SearchModal.css';

const SearchModal = ({ isOpen, onClose }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const { state } = useProducts();
  const { sarees, lehengas, kurtis, latestCollection } = state;

  // Combine all products for search
  const allProducts = useMemo(() => {
    const products = [
      ...sarees.map(item => ({ ...item, category: 'sarees' })),
      ...lehengas.map(item => ({ ...item, category: 'lehengas' })),
      ...kurtis.map(item => ({ ...item, category: 'kurtis' })),
      ...latestCollection.map(item => ({ ...item, category: 'new-arrivals' }))
    ];
    return products;
  }, [sarees, lehengas, kurtis, latestCollection]);

  // Filter products based on search term
  const filteredProducts = useMemo(() => {
    if (!searchTerm.trim()) return [];
    
    return allProducts.filter(product =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.material?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description?.toLowerCase().includes(searchTerm.toLowerCase())
    ).slice(0, 8); // Limit to 8 results
  }, [allProducts, searchTerm]);

  // Close modal on escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') onClose();
    };
    
    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }
    
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="search-modal-overlay" onClick={onClose}>
      <div className="search-modal" onClick={(e) => e.stopPropagation()}>
        <div className="search-header">
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
            autoFocus
          />
          <button className="close-btn" onClick={onClose}>
            <span className="material-icons">close</span>
          </button>
        </div>
        
        <div className="search-results">
          {searchTerm.trim() && filteredProducts.length === 0 && (
            <div className="no-results">No products found</div>
          )}
          
          {filteredProducts.map(product => (
            <Link
              key={`${product.category}-${product.id}`}
              to={`/${product.category}/${product.id}`}
              className="search-result-item"
              onClick={onClose}
            >
              <img src={product.img} alt={product.name} className="result-image" />
              <div className="result-info">
                <h4>{product.name}</h4>
                <p className="result-price">₹{product.price?.toLocaleString('en-IN')}</p>
                <p className="result-category">{product.category.replace('-', ' ')}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchModal;