import React, { useContext } from 'react';
import classes from './cart.module.css';
import Layout from '../../Components/LayOut/Layout';
import { DataContext } from '../../Components/DataProvider/DataProvider';
import ProductCard from '../../Components/Products/ProductCard';
import CurrencyFormat from '../../Components/CurrencyFormat.jsx/CurrencyFormat';
import { Link } from 'react-router-dom';
import { Type } from '../../Utility/action.type';

const Cart = () => {
  const [{ basket, user }, dispatch] = useContext(DataContext);

  // Calculate the total price
  const total = basket.reduce((amount, item) => item.price * item.amount + amount, 0);

  // Function to increment the item amount
  const increment = (item) => {
    dispatch({
      type: Type.ADD_TO_BASKET,
      item: { ...item, amount: item.amount + 1 }
    });
  };

  // Function to decrement the item amount
  const decrement = (id) => {
    dispatch({
      type: Type.REMOVE_FROM_BASKET,
      id
    });
  };

  return (
    <Layout>
      <section className={classes.container}>
        <div className={classes.cart_container}>
          <h2>Hello</h2>
          <h3>Your shopping basket</h3>
          <hr />
          {basket?.length === 0 ? (
            <p>Oops! No items in your cart</p>
          ) : (
            basket.map((item, i) => (
              <section key={i} className={classes.cart_product}>
                <ProductCard 
                  product={item}
                  renderAdd={false}
                  renderDesc={true}
                  flex={true}
                />
                <div className={classes.btn_container}>
                  <button className={classes.btn} onClick={() => increment(item)}>+</button>
                  <span>{item.amount}</span>
                  <button className={classes.btn} onClick={() => decrement(item.id)}>-</button>
                </div>
              </section>
            ))
          )}
        </div>
        {basket?.length !== 0 && (
          <div className={classes.subtotal}>
            <div>
              <p>Subtotal ({basket.length} items)</p>
              <CurrencyFormat amount={total} />
            </div>
            <span>
              <input type="checkbox" />
              <small>This order contains a gift</small>
            </span>
            <Link to="/payment">
              Continue to checkout
            </Link>
          </div>
        )}
      </section>
    </Layout>
  );
};

export default Cart;
