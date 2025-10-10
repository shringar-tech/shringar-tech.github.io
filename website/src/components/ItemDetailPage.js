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
            <button className="add-to-cart-btn">
              Add to Cart
              <span className="material-icons">shopping_cart</span>
            </button>
          </div>
          <div className="details-grid">
            <div className="detail-item">
              <span className="label">Date of Manufacture</span>
              <span className="value">{item.dateOfManufacture}</span>
            </div>
            <div className="detail-item">
              <span className="label">Material</span>
              <span className="value">{item.material}</span>
            </div>
          </div>
          <div className="description">
            <h2>Description</h2>
            <p>{item.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ItemDetailPage;