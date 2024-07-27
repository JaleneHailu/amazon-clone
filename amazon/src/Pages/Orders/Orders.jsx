import React, { useContext, useEffect, useState } from 'react'; 
import Layout from '../../Components/LayOut/Layout'; 
import { db } from '../../Utility/firebase'; 
import { DataContext } from '../../Components/DataProvider/DataProvider'; 
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore'; 
import classes from './orders.module.css'; 
import ProductCard from '../../Components/Products/ProductCard'; 
 
const Orders = () => { 
  const [{ user }] = useContext(DataContext); 
  const [orders, setOrders] = useState([]); 
 
  useEffect(() => { 
    if (user) { 
      // Clear orders state when user changes or initially loads 
      setOrders([]); 

      const userOrdersCollection = collection(db, 'users', user.uid, 'orders'); 
      const q = query(userOrdersCollection, orderBy('created', 'desc')); 

      const unsubscribe = onSnapshot(q, (snapshot) => { 
        const ordersList = snapshot.docs.map((doc) => ({ 
          id: doc.id, 
          ...doc.data() 
        }));
        console.log('Fetched Orders:', ordersList); // Debugging line
        setOrders(ordersList); 
      }); 

      // Cleanup subscription on unmount 
      return () => unsubscribe(); 
    } 
  }, [user]); 
 
  return ( 
    <Layout> 
      <section className={classes.container}> 
        <div className={classes.orders_container}> 
          <h2>Your Orders</h2> 
          <div> 
            {orders.length === 0 ? ( 
              <p>You don't have orders yet.</p> 
            ) : ( 
              orders.map((eachOrder) => ( 
                <div key={eachOrder.id}> 
                  <hr /> 
                  <p>Order ID: {eachOrder.id}</p> 
                  {eachOrder.basket?.map((order) => ( 
                    <ProductCard 
                      flex={true} 
                      product={order} 
                      key={order.id} 
                    /> 
                  ))} 
                </div> 
              )) 
            )} 
          </div> 
        </div> 
      </section> 
    </Layout> 
  ); 
}; 
 
export default Orders;