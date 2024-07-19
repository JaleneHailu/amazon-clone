import React, { useState, useEffect } from 'react';
import classes from '../../assets/Product.module.css';
import ProductCard from './ProductCard';
import axios from 'axios';
import Loader from '../Loader/Loader';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Start as true to show loader initially

  useEffect(() => {
    setIsLoading(true); // Set to true before starting the fetch
    axios.get('https://fakestoreapi.com/products')
      .then(res => {
        setProducts(res.data);
        setIsLoading(false); // Set to false after data is fetched
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false); // Set to false if there is an error
      });
  }, []);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <section className={classes.products_container}>
          {products.map((singleProduct) => (
            <ProductCard product={singleProduct} key={singleProduct.id} />
          ))}
        </section>
      )}
    </>
  );
};

export default Products;
