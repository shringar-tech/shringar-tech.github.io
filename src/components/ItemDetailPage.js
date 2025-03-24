import React from 'react';

const ItemDetailPage = ({ item }) => {
    if (!item) {
        return <div>Item not found</div>;
    }

    return (
        <div className="item-detail">
            <h1>{item.name}</h1>
            <img src={item.image} alt={item.name} />
            <p>{item.description}</p>
            <p>Price: ₹{item.price}</p>
            <button>Add to Cart</button>
        </div>
    );
};

export default ItemDetailPage;