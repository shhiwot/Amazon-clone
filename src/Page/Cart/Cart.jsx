import React, { useContext } from "react";
import Layout from "../../Component/Layout/Layout";
import { DataContext } from "../../Component/DataProvider/DataProvider";
import ProductCard from "../../Component/Product/ProductCard";
import Currencyformatter from"../../Component/Currenceyformat/Currencyformat"
import { Link } from "react-router-dom";
import classes from "./cart.module.css"
import{Type}from '../../Utility/actiontype'
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";
const Cart = () => {
  const [{ basket, user }, dispatch] = useContext(DataContext);

  console.log(user);

  const total = basket?.reduce((amount, item) => {
    console.log(item);
    return item.price * item.amount + amount;
  }, 0);

  const totalItemsInBasket = basket.reduce(
    (count, item) => count + item.amount,
    0
  );
  const increment = (item) => {
    dispatch({
      type: Type.ADD_TO_BASKET,
      item,
    });
  };
  const decrement = (id) => {
    dispatch({
      type: Type.REMOVE_FROM_BASKET,
      id,
    });
  };
  return (
    <Layout>
      <section className={classes.Wrapper}>
        <div className={classes.cart_Wrapper}>
          <h1>Hello</h1>
          <h3>Your shopping basket</h3>
          <hr />
          {basket?.length == 0 ? (
            <p>Opps ! No item in your Cart</p>
          ) : (
            basket?.map((item, i) => {
              return (
                <div className={classes.cart_Item} key={i}>
                  <div className={classes.order_cart}>
                    <ProductCard
                      product={item}
                      renderDesc={true}
                      flex={true}
                      key={i}
                      renderadd={false}
                    />
                  </div>
                  <div className={classes.btn_Wrapper}>
                    <button
                      className={classes.btn}
                      onClick={() => increment(item)}
                    >
                      <IoIosArrowUp size={20} />
                    </button>
                    <span>{item.amount}</span>
                    <button
                      className={classes.btn}
                      onClick={() => decrement(item.id)}
                    >
                      <IoIosArrowDown size={20} />
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>
        <div className={classes.subtotal}>
          <div>
            <p>subtotal({totalItemsInBasket})</p>
            <Currencyformatter amount={total} />
          </div>
          <span>
            <input type="checkbox" />
            <small>This order contains a gift</small>
          </span>
          <Link to="/payments">continue to cheackout</Link>
        </div>
      </section>
    </Layout>
  );
};

export default Cart;
