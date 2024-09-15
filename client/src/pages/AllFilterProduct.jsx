import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

const AllFilterProduct = () => {
    const [products, setProducts] = useState([]);
  const [filters, setFilters] = useState({
    color: '',
    priceRange: '',
    brand: ''
  });


  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const category = query.get('category');
 
  useEffect(() => {
    const fetchProducts = async () => {
      const { color, priceRange, brand } = filters;
      const response = await axios.get('/api/v1/product/all-filters', {
        params: {
          category,
          color,
          priceRange,
          brand
        }
      });
      setProducts(response.data);
    };

    fetchProducts();
  }, [category, filters]);

  const handleFilterChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value
    });
  };


  return (
   <>
   <div>
      <h1>Products in {category}</h1>
      
      <div className="filters">
        <select name="color" onChange={handleFilterChange}>
          <option value="">Select Color</option>
          <option value="red">Red</option>
          <option value="blue">Blue</option>
          {/* Add more colors */}
        </select>
        
        <select name="priceRange" onChange={handleFilterChange}>
          <option value="">Select Price Range</option>
          <option value="0-100">0 - 100</option>
          <option value="101-500">101 - 500</option>
          {/* Add more ranges */}
        </select>
        
        <select name="brand" onChange={handleFilterChange}>
          <option value="">Select Brand</option>
          <option value="apple">apple</option>
          <option value="BrandB">Brand B</option>
          {/* Add more brands */}
        </select>
      </div>

      <div className="product-list">
        {products.map((product) => (
          <div key={product._id}>
            <h2>{product.name}</h2>
            <p>{product.price}</p>
            {/* Display other product details */}
          </div>
        ))}
      </div>
    </div>
   </>
  )
}

export default AllFilterProduct