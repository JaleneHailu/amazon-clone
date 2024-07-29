import React, { useContext, useState } from 'react';
import classes from './payment.module.css';
import Layout from '../../Components/LayOut/Layout';
import { DataContext } from '../../Components/DataProvider/DataProvider';
import ProductCard from '../../Components/Products/ProductCard';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import CurrencyFormat from '../../Components/CurrencyFormat.jsx/CurrencyFormat';
import { axiosInstance } from '../../Api/axios';
import { ClipLoader } from 'react-spinners';
import { db } from '../../Utility/firebase';
import { doc, setDoc } from 'firebase/firestore'; // Import Firestore methods
import { useNavigate } from 'react-router-dom';
import { Type } from '../../Utility/action.type';

const Payments = () => {
  const [{ user, basket }, dispatch] = useContext(DataContext);
  const totalItem = basket?.reduce((amount, item) => item.amount + amount, 0);
  const total = basket.reduce((amount, item) => item.price * item.amount + amount, 0);
  const [cardError, setCardError] = useState(null);
  const [processing, setProcessing] = useState(false);
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();

  const handleChange = (e) => {
    if (e.error) {
      setCardError(e.error.message);
    } else {
      setCardError('');
    }
  };

  const handlePayment = async (e) => {
    e.preventDefault();

    if (!user) {
      setCardError("Please sign in to complete the purchase");
      return;
    }

    try {
      setProcessing(true);
      const response = await axiosInstance.post(`/payment/create?total=${total * 100}`);
      // console.log('Payment response:', response.data);
      const clientSecret = response.data.clientSecret;

      const confirmation = await stripe.confirmCardPayment(
        clientSecret,
        {
          payment_method: {
            card: elements.getElement(CardElement),
          },
        }
      );

      if (confirmation.paymentIntent) {
        const paymentIntent = confirmation.paymentIntent;
        const userDocRef = doc(db, 'users', user.uid);
        const orderDocRef = doc(userDocRef, 'orders', paymentIntent.id);

        await setDoc(orderDocRef, {
          basket: basket,
          amount: paymentIntent.amount,
          created: paymentIntent.created,
        });
      }
      dispatch({ type: Type.EMPTY_BASKET });

      setProcessing(false);
      navigate("/orders", { state: { msg: "You have placed a new order" } });
    } catch (error) {
      setProcessing(false);
      console.error('Payment error:', error);
    }
  };

  return (
    <Layout>
      <div className={classes.payment_header}>Checkout ({totalItem}) items</div>

      <section className={classes.payment}>
        <div className={classes.flex}>
          <h3>Delivery Address</h3>
          <div>
            {user ? (
              <>
                <div>{user.email}</div>
                <div>123 React Lane</div>
                <div>Chicago, IL</div>
              </>
            ) : (
              <div>Please sign in to enter your delivery address.</div>
            )}
          </div>
        </div>
        <hr />

        <div className={classes.flex}>
          <h3>Review items and delivery</h3>
          <div>
            {basket?.map((item) => (
              <ProductCard key={item.id} product={item} flex={true} />
            ))}
          </div>
        </div>
        <hr />

        <div className={classes.flex}>
          <h3>Payment Methods</h3>
          <div className={classes.payment_card_container}>
            <div className={classes.payment_details}>
              <form onSubmit={handlePayment} action="">
                {cardError && <small style={{ color: 'red' }}>{cardError}</small>}
                <CardElement onChange={handleChange} />
                <div className={classes.payment_price}>
                  <div>
                    <span style={{ display: 'flex', gap: '10px' }}>
                      <p>Total Order</p>
                      <p>|</p>
                      <CurrencyFormat amount={total} />
                    </span>
                  </div>
                  <button type="submit" disabled={!user || processing}>
                    {processing ? (
                      <div style={{ display: "flex", justifyContent: "center" }}>
                        <ClipLoader color="#000" size={15} />
                        <p>Please Wait</p>
                      </div>
                    ) : (
                      "Pay Now"
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Payments;
