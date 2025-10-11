import React, { useEffect, useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../elements/ProductCard';
import FilterSort from '../elements/FilterSort';
import { filterItems, sortItems, getFilterOptions } from '../utils/helpers';
import './CategoryPage.css';

function CategoryPage({ category }) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeFilters, setActiveFilters] = useState({});
  const [sortBy, setSortBy] = useState('default');

  useEffect(() => {
    setLoading(true);
    
    const fetchCategoryData = async () => {
      try {
        if (['new-arrivals', 'best-sellers', 'shop-all'].includes(category)) {
          // For these categories, fetch and resolve latest collection references
          const [latestRes, sareesRes, lehengasRes, kurtisRes, anarkalisRes, shararasRes] = await Promise.all([
            fetch('/data/latestcollection.json'),
            fetch('/data/sarees.json'),
            fetch('/data/lehengas.json'),
            fetch('/data/kurtis.json'),
            fetch('/data/anarkalis.json'),
            fetch('/data/shararas.json')
          ]);
          
          const [latestRefs, sarees, lehengas, kurtis, anarkalis, shararas] = await Promise.all([
            latestRes.json(),
            sareesRes.json(),
            lehengasRes.json(),
            kurtisRes.json(),
            anarkalisRes.json(),
            shararasRes.json()
          ]);
          
          const allProducts = { sarees, lehengas, kurtis, anarkalis, shararas };
          const resolvedItems = latestRefs.map(ref => {
            const categoryItems = allProducts[ref.category] || [];
            const item = categoryItems.find(item => item.id === ref.id);
            return item ? { ...item, category: ref.category } : null;
          }).filter(Boolean);
          
          setItems(resolvedItems);
        } else {
          // For regular categories, fetch directly
          const response = await fetch(`/data/${category}.json`);
          const data = await response.json();
          setItems(data);
        }
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };
    
    fetchCategoryData();
  }, [category]);

  const filterOptions = useMemo(() => getFilterOptions(items), [items]);
  
  const filteredAndSortedItems = useMemo(() => {
    const filtered = filterItems(items, activeFilters);
    return sortItems(filtered, sortBy);
  }, [items, activeFilters, sortBy]);

  const handleFilterChange = (filterKey, value, checked) => {
    setActiveFilters(prev => {
      const current = prev[filterKey] || [];
      if (checked) {
        return { ...prev, [filterKey]: [...current, value] };
      } else {
        return { ...prev, [filterKey]: current.filter(v => v !== value) };
      }
    });
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <section className="category-section">
      <h2>{category.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}</h2>
      
      {items.length > 0 && (
        <FilterSort
          filters={filterOptions}
          activeFilters={activeFilters}
          onFilterChange={handleFilterChange}
          sortBy={sortBy}
          onSortChange={setSortBy}
        />
      )}
      
      <div className="category-container">
        {filteredAndSortedItems.map(item => (
          <ProductCard item={item} category={item.category || category} key={item.id} />
        ))}
      </div>
      
      {filteredAndSortedItems.length === 0 && items.length > 0 && (
        <div className="no-results">
          <p>No items match your current filters.</p>
        </div>
      )}
    </section>
  );
}

export default CategoryPage;