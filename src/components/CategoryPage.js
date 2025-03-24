import React from 'react';

const CategoryPage = ({ match }) => {
    const categoryName = match.params.categoryName; // Assuming category name is passed as a URL parameter

    // Sample data for demonstration purposes
    const items = [
        { id: 1, name: 'Saree 1', price: '₹2000', image: '/images/saree1.jpg' },
        { id: 2, name: 'Saree 2', price: '₹2500', image: '/images/saree2.jpg' },
        { id: 3, name: 'Lehenga 1', price: '₹5000', image: '/images/lehenga1.jpg' },
        { id: 4, name: 'Lehenga 2', price: '₹6000', image: '/images/lehenga2.jpg' },
    ].filter(item => item.name.toLowerCase().includes(categoryName.toLowerCase()));

    return (
        <div className="category-page">
            <h1>{categoryName.charAt(0).toUpperCase() + categoryName.slice(1)} Collection</h1>
            <div className="item-list">
                {items.map(item => (
                    <div key={item.id} className="item-card">
                        <img src={item.image} alt={item.name} />
                        <h2>{item.name}</h2>
                        <p>{item.price}</p>
                        <button>Add to Cart</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CategoryPage;