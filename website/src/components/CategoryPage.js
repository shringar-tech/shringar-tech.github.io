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
    
    // Map new categories to existing data files for now
    const getDataFile = (cat) => {
      switch(cat) {
        case 'new-arrivals':
          return 'latestcollection.json';
        case 'best-sellers':
          return 'sarees.json'; // Using sarees as best sellers for now
        case 'shop-all':
          return 'sarees.json'; // Using sarees for shop all for now
        default:
          return `${cat}.json`;
      }
    };

    fetch(`/data/${getDataFile(category)}`)
      .then(response => response.json())
      .then(data => {
        setItems(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setLoading(false);
      });
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
          <Link to={`/${category}/${item.id}`} className="category-link" key={item.id}>
            <ProductCard item={item} category={category} />
          </Link>
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