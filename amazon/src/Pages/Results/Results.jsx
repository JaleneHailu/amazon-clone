import React, { useEffect, useState } from 'react';
import classes from './Results.module.css';
import Layout from '../../Components/LayOut/Layout';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { productUrl } from '../../Api/endPoints';
import ProductCard from '../../Components/Products/ProductCard';

const Results = () => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { categoryName } = useParams();

  useEffect(() => {
    setLoading(true);
    setError(null);
    axios.get(`${productUrl}/products/category/${categoryName}`)
      .then((res) => {
        if (Array.isArray(res.data)) {
          setResults(res.data);
        } else {
          setError("Unexpected response format");
        }
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [categoryName]);

  return (
    <Layout>
      <section>
        <h1 style={{ padding: "30px" }}>Results</h1>
        <p style={{ padding: "30px" }}>Category / {categoryName}</p>
        <hr />
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>Error: {error}</p>
        ) : (
          <div className={classes.products_container}>
            {results.map((product) => (
              <ProductCard 
                key={product.id}
                renderAdd={true}
                product={product}
                renderDesc={true}
              />
            ))}
          </div>
        )}
      </section>
    </Layout>
  );
}

export default Results;
