import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ImageGallery from '../elements/ImageGallery';
import './ItemDetailPage.css';

function ItemDetailPage() {
  const { category, id } = useParams();
  const [item, setItem] = useState(null);

  useEffect(() => {
    fetch(`/data/${category}.json`)
      .then(response => response.json())
      .then(data => {
        const selectedItem = data.find(item => item.id === parseInt(id));
        setItem(selectedItem);
      });
  }, [category, id]);

  if (!item) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="item-detail-container">
      <div className="item-card">
        <div className="item-image-container">
          <ImageGallery 
            images={item.images || [item.img]} 
            alt={item.name}
            className="item-gallery"
          />
        </div>
        <div className="item-details">
          <div className="category-badge">{category}</div>
          <h1>{item.name}</h1>
          <div className="price-section">
            <div className="price-tag">${item.price}</div>
          </div>

          <div className="description">
            <h2>Description</h2>
            <p>{item.description}</p>
          </div>
          {item.specifications && (
            <div className="specifications">
              <h2>Product Details</h2>
              <ul>
                {item.specifications.map((spec, index) => (
                  <li key={index}>{spec}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ItemDetailPage;