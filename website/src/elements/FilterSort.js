import React, { useState } from 'react';
import './FilterSort.css';

const FilterSort = ({ 
  filters, 
  activeFilters, 
  onFilterChange, 
  sortBy, 
  onSortChange 
}) => {
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  
  const sortOptions = [
    { value: 'default', label: 'Default' },
    { value: 'price-low', label: 'Price: Low to High' },
    { value: 'price-high', label: 'Price: High to Low' },
    { value: 'name-asc', label: 'Name: A to Z' },
    { value: 'name-desc', label: 'Name: Z to A' }
  ];

  const getActiveFilterCount = () => {
    return Object.values(activeFilters).reduce((count, filterArray) => 
      count + (filterArray?.length || 0), 0
    );
  };

  return (
    <>
      <div className="filter-sort-container">
        <button 
          className="filter-button"
          onClick={() => setIsFilterModalOpen(true)}
        >
          <span>🔍</span>
          Filter
          {getActiveFilterCount() > 0 && (
            <span className="filter-count">{getActiveFilterCount()}</span>
          )}
        </button>
        
        <div className="sort-section">
          <label htmlFor="sort-select">Sort:</label>
          <select 
            id="sort-select"
            value={sortBy} 
            onChange={(e) => onSortChange(e.target.value)}
            className="sort-dropdown"
          >
            {sortOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {isFilterModalOpen && (
        <div className="filter-modal-overlay" onClick={() => setIsFilterModalOpen(false)}>
          <div className="filter-modal" onClick={(e) => e.stopPropagation()}>
            <div className="filter-modal-header">
              <h3>Filter Products</h3>
              <button 
                className="close-button"
                onClick={() => setIsFilterModalOpen(false)}
              >
                ×
              </button>
            </div>
            
            <div className="filter-modal-content">
              {filters.map(filter => (
                <div key={filter.key} className="filter-group">
                  <h4>{filter.label}</h4>
                  {filter.options.map(option => (
                    <label key={option.value} className="filter-option">
                      <input
                        type="checkbox"
                        checked={activeFilters[filter.key]?.includes(option.value) || false}
                        onChange={(e) => onFilterChange(filter.key, option.value, e.target.checked)}
                      />
                      <span>{option.label}</span>
                    </label>
                  ))}
                </div>
              ))}
            </div>
            
            <div className="filter-modal-footer">
              <button 
                className="clear-filters-btn"
                onClick={() => {
                  Object.keys(activeFilters).forEach(key => {
                    activeFilters[key]?.forEach(value => {
                      onFilterChange(key, value, false);
                    });
                  });
                }}
              >
                Clear All
              </button>
              <button 
                className="apply-filters-btn"
                onClick={() => setIsFilterModalOpen(false)}
              >
                Apply Filters
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default FilterSort;