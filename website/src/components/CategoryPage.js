import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './CategoryPage.css'; // Import the new CSS file

function CategoryPage({ category }) {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch(`/data/${category}.json`)
      .then(response => response.json())
      .then(data => setItems(data));
  }, [category]);

  return (
    <div className="category-page">
      <h1>{category.charAt(0).toUpperCase() + category.slice(1)}</h1>
      <div className="category-grid">
        {items.map(item => (
          <Link to={`/${category}/${item.id}`} className="category-item" key={item.id}>
            <img src={item.img} alt={item.name} />
            <h3>{item.name}</h3>
            <p>${item.price}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default CategoryPage;