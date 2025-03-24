import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './ItemDetailPage.css'; // Import the new CSS file

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
    return <div>Loading...</div>;
  }

  return (
    <div className="item-detail-container">
      <div className="item-image">
        <img src={item.img} alt={item.name} />
      </div>
      <div className="item-details">
        <h1>{item.name}</h1>
        <p><strong>Price:</strong> ${item.price}</p>
        <p><strong>Date of Manufacture:</strong> {item.dateOfManufacture}</p>
        <p><strong>Material:</strong> {item.material}</p>
        <p><strong>Description:</strong> {item.description}</p>
      </div>
    </div>
  );
}

export default ItemDetailPage;