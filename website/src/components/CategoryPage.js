import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../elements/ProductCard';
import './CategoryPage.css';

function CategoryPage({ category }) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch(`/data/${category}.json`)
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

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <section className="category-section">
      <h2>{category.charAt(0).toUpperCase() + category.slice(1)}</h2>
      <div className="category-container">
        {items.map(item => (
          <Link to={`/${category}/${item.id}`} className="category-link" key={item.id}>
            <ProductCard item={item} category={category} />
          </Link>
        ))}
      </div>
    </section>
  );
}

export default CategoryPage;