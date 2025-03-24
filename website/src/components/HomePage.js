import React from 'react';
import './HomePage.css';

const HomePage = () => {
    const categories = ['Sarees', 'Lehengas', 'Kurtas', 'Ethnic Wear', 'Accessories'];

    return (
        <div className="home-page">
            <h1>Welcome to Our E-commerce Store</h1>
            <h2>Shop by Category</h2>
            <div className="categories">
                {categories.map((category, index) => (
                    <div key={index} className="category">
                        <h3>{category}</h3>
                        <a href={`/category/${category.toLowerCase()}`}>Browse {category}</a>
                    </div>
                ))}
            </div>
            <h2>Featured Items</h2>
            {/* Placeholder for featured items */}
            <div className="featured-items">
                {/* Add featured items here */}
            </div>
        </div>
    );
};

export default HomePage;