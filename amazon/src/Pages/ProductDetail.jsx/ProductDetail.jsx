import React, { useEffect, useState } from 'react';
import Layout from '../../Components/LayOut/Layout';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { productUrl } from '../../Api/endPoints';
import ProductCard from '../../Components/Products/ProductCard';
import Loader from '../../Components/Loader/Loader'; // Ensure this path is correct

const ProductDetail = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    setError(null);
    axios.get(`${productUrl}/products/${productId}`)
      .then((res) => {
        setProduct(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setIsLoading(false);
      });
  }, [productId]);

  if (isLoading) {
    return (
      <Layout>
        <Loader />
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <p>Error: {error}</p>
      </Layout>
    );
  }

  return (
    <Layout>
      {product ? (
        <ProductCard product={product}
        flex = {true}
        renderDesc={true}
         />
      ) : (
        <p>Product not found</p>
      )}
    </Layout>
  );
};

export default ProductDetail;
