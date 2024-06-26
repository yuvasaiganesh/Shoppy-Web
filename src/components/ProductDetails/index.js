import axios from 'axios';
import { useParams } from 'react-router-dom';
import "./index.css"
import Navbar from '../Navbar';

import React, { useState, useEffect } from 'react';


const ProductDetails = ( props) => {
    const [product, setProduct] = useState(null);
    const { productId } = useParams();
  
    useEffect(() => {
        
      
      console.log(productId)
      
      
      axios.get(`https://fakestoreapi.com/products/${productId}`)
        .then(response => setProduct(response.data))
        .catch(error => console.error('Error fetching product details:', error));
    }, [productId]);
  
    return (
      <div className="productDetailsSection">
        <Navbar/>
        <h1 className="productSectionHead">Your choice</h1>
        {product ? (
          <div className="productdetails">
            <img className="eachImage" src={product.image} alt={product.title} />
            <div className="eachCard">
            <h2>{product.title}</h2>
            <p className="desc">{product.description}</p>
            <p className="price">Price: ${product.price}</p>
            </div>
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    );
  };
  export default ProductDetails