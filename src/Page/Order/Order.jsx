import React, { useEffect, useState, useContext } from "react";
import Layout from "../../Component/Layout/Layout";
import classes from "./order.module.css";
import { DataContext } from "../../Component/DataProvider/DataProvider";
import { db } from "../../Utility/fireBase"; // Import db from your Firebase setup
import { collection, orderBy, query, onSnapshot } from "firebase/firestore";
import ProductCard from "../../Component/Product/ProductCard";
import Loader from "../../Component/Loader/Loader";
const Order = () => {
   const [{ basket, user }, dispatch] = useContext(DataContext);
  const [orders, setOrders] = useState([]);
const[loading,setloading]=useState(false)
  useEffect(() => {
    setloading(true)
    const fetchOrders = async () => {
      if (user) {
        try {
          const ordersRef = collection(db, "users", user.uid, "orders");
          const q = query(ordersRef, orderBy("created", "desc"));
          const unsubscribe = onSnapshot(q, (snapshot) => {
            console.log(snapshot);
            const fetchedOrders = snapshot.docs.map((doc) => ({
              id: doc.id,
              data: doc.data(),
            }));
            setOrders(fetchedOrders);
      setloading(false)
          });
          return () => unsubscribe(); // Unsubscribe from snapshot listener on cleanup
        } catch (error) {
          console.error("Error fetching orders: ", error);
          setloading(false)
        }
      }
    }; 
    fetchOrders();

    
  }, [user]);

  return (
    <Layout>
     {loading?
        <Loader />:
        (<section className={classes.container}>
          <div className={classes.order__container}>
            <h2>Your Orders</h2>
            {/* Render ordered items */}
            <br/>
            <div>
              {orders.length === 0 ? (
                <p style={{fontSize :'17px'}}>No orders found.</p>
              ) : (
                orders?.map((eachorder, i) => {
                  return (
                    <div className={classes.order_wrapper}>
                      
                      <p>Order Id:{eachorder?.id}</p>

                      {eachorder?.data?.basket.map((order) => (
                        <ProductCard
                          flex={true}
                          product={order}
                          key={order.id}
                        />
                      ))}
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </section>)
      }
    </Layout>
  );
};

export default Order;
