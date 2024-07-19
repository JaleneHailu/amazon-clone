import React from 'react';
import Rating from '@mui/material/Rating';
import CurrencyFormat from '../CurrencyFormat.jsx/CurrencyFormat';
import classes from '../../assets/Product.module.css';
import { Link } from 'react-router-dom';

const ProductCard = ({ product, flex, renderDesc }) => {
  const { image, title, id, rating, price, description  } = product;

  return (
    <div className={`${classes.card_container} ${flex?classes.product_flexed : ''}`}>
      <Link to={`/products/${id}`}>
        <img src={image} alt={title} />
      </Link>
      <div>
        <h3>{title}</h3>
        {renderDesc && <div style={{maxWidth:"700px"}}>{description}</div>}
        <div className={classes.rating}>
          {rating ? (
            <>
              <Rating value={rating.rate} precision={0.1} readOnly />
              <small>{rating.count}</small>
            </>
          ) : (
            <p>No rating available</p>
          )}
        </div>
        <div>
          <CurrencyFormat amount={price} />
        </div>
        <button className={classes.button}>
          Add to cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
