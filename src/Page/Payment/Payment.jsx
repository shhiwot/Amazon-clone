import React, { useContext, useState } from "react";
import classes from "./Payment.module.css";
import { DataContext } from "../../Component/DataProvider/DataProvider";
import Layout from "../../Component/Layout/Layout";
import ProductCard from "../../Component/Product/ProductCard";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import CurrencyFormat from "../../Component/Currenceyformat/Currencyformat";
import { axiosInstace } from "../../Api/axios";
import { ClipLoader } from "react-spinners";
import { db } from "../../Utility/fireBase";
import { collection, doc, setDoc } from "firebase/firestore";
import { Navigate } from "react-router-dom";
import { Type } from "../../Utility/actiontype";

const Payment = () => {
  const [{ basket, user }, dispatch] = useContext(DataContext);
  const [processing, setprocessing] = useState(false);
  const totalItemsInBasket = basket.reduce(
    (count, item) => count + item.amount,
    0
  );
  const totalPrice = basket?.reduce((amount, item) => {
    return item.price * item.amount + amount;
  }, 0);
  const [cardError, setCarderror] = useState(null);
   const [success, setSuccess] = useState(false);
  const Stripe = useStripe();
  const elements = useElements();
  const handelChange = (e) => {
    console.log(e);
    e?.error?.message ? setCarderror(e?.error?.message) : setCarderror("");
  };

  const handelpayment = async (e) => {
    e.preventDefault();

    try {
      setprocessing(true);

      // Step 1: Get client secret from backend
      const response = await axiosInstace({
        method: "POST",
        url: `/payment/create?total=${totalPrice * 100}`,
      });

      const clientSecret = response.data.clientSecret;

      // Step 2: Confirm card payment
      const result = await Stripe.confirmCardPayment(clientSecret, {
        payment_method: { card: elements.getElement(CardElement) },
      });

      const { error, paymentIntent } = result; // Destructure the result here

      // Check if there was an error in payment confirmation
      if (error) {
        setCarderror(error.message);
        setprocessing(false);
        return;
      }
//step 3
      // Validate user UID and paymentIntent
      console.log("User UID:", user.uid);
      console.log("Payment Intent:", paymentIntent);

      if (!user.uid || !paymentIntent) {
        console.error("User UID or Payment Intent is invalid");
        setprocessing(false);
        return;
      }
      //step 3
      // If paymentIntent exists, save the order in fairstore database
      await setDoc(
        doc(collection(db, "users"), user.uid, "orders", paymentIntent.id),
        {
          basket: basket,
          amount: paymentIntent.amount,
          created: paymentIntent.created,
        }
      );

      console.log("Order saved successfully");
      setSuccess(true); // Set success to true

      dispatch({
        type:Type.EMPITY_BASKET
      })
    } catch (error) {
      console.error("Payment error:", error);
      setCarderror("An error occurred during payment.");
    
      setprocessing(false);
    } finally {
      setprocessing(false);
    }


  };

if (success) {
  return (
    <Navigate
      to="/order"
      state={{ msg: "You have placed your order successfully" }}
    />
  );
}
  return (
    <Layout>
      {/* header */}
      <div className={classes.Payment__Header}>
        cheackout {`(${totalItemsInBasket})`} items
      </div>
      {/* payment method */}
      <section className={classes.payment}>
        {/* address */}
        <div className={classes.flex}>
          <h3>Delivery Address</h3>
          <div>
            <div>{user?.email}</div>
            <div>1236React Lane</div>
            <div>chicago, IL</div>
          </div>
        </div>
        <hr />
        {/* product */}
        <div className={classes.flex}>
          <h2>Review items and delivery</h2>
          <div className={classes.product_Detail}>
            {basket?.map((item) => {
              return <ProductCard product={item} flex={true} key={item.id} />;
            })}
          </div>
        </div>
        <hr />
        {/* card form */}
        <div className={classes.flex}>
          <h3>Payment Methods</h3>
          <div className={classes.payment__card__contanier}>
            <div className={classes.payment__details}>
              <form onSubmit={handelpayment}>
                {/* error */}
                {cardError && (
                  <small style={{ color: "red" }}>{cardError}</small>
                )}
                {/* Card Element */}
                <CardElement onChange={handelChange} />
                {/* price */}
                <div className={classes.payment__price}>
                  <div>
                    <span style={{ display: "flex", gap: "10px" }}>
                      <p>Total order |</p>
                      <CurrencyFormat amount={totalPrice} />
                    </span>
                  </div>
                  <button type="submit">
                    {processing ? (
                      <div className={classes.loading}>
                        <ClipLoader color="gray" size={12} />
                        <p>Please wait ...</p>
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

export default Payment;
