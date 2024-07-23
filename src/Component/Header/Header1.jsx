import React, { useContext } from "react";
import { MdOutlineShoppingCart } from "react-icons/md";
import { SlLocationPin } from "react-icons/sl";
import { FaSearch } from "react-icons/fa";
import classes from "./Header1.module.css";
import LowerHeader from "./LowerHeader";
import { Link } from "react-router-dom";
import { DataContext } from "../DataProvider/DataProvider";
import { auth } from "../../Utility/fireBase";
const Header1 = () => {
  // const [state, dispatch] = useContext(DataContext);
  // console.log(state);
  const [{user, basket }, dispatch] = useContext(DataContext);
  
  const totalItemsInBasket = basket.reduce(
    (count, item) => count + item.amount,
    0
  );
  console.log(user);
  console.log(basket);
  console.log(basket.length);
  return (
    <>
      <section className={classes.fixed}>
        <div className={classes.header__container}>
          {/* {logo} */}
          <div className={classes.logo__container}>
            <Link to="/">
              <img
                src="https://pngimg.com/uploads/amazon/amazon_PNG11.png"
                alt="amazon log"
                srcset=""
              />
            </Link>
            {/* {delivery} */}
            <Link to="" className={classes.delivery}>
              <div>
                <span>
                  <SlLocationPin />
                </span>
              </div>
              <div>
                <p>Deliver to</p>
                <span>USA</span>
              </div>
            </Link>
          </div>
          <div className={classes.search}>
            {/* {search} */}
            <select name="" id="">
              <option value="">All</option>
            </select>
            <input type="text" name="" id="" placeholder="Search product" />
            <FaSearch size={25} />
          </div>
          {/* {right side link} */}
          <div className={classes.order__container}>
            <div href="" className={classes.language}>
              <img
                srcSet="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Flag_of_the_United_States_%28DoS_ECA_Color_Standard%29.svg/1920px-Flag_of_the_United_States_%28DoS_ECA_Color_Standard%29.svg.png"
                alt=""
              />
              <select name="" id="">
                <option value="">EN</option>
              </select>
            </div>
            {/* {three components} */}
            <Link to={ !user&&"/aouth"}>
              <div>
                {user ? (
                  <>
                    <p>Hello {user?.email?.split("@")[0]}</p>
                    <span onClick={()=>auth.signOut()}>Sign out</span>
                  </>
                ) : (
                  <>
                    <p>Hello Sign In</p>
                    <span>Account & Lists</span>
                  </>
                )}
              </div>
            </Link>
            {/* {orders} */}
            <Link to="/order">
              <p>returns</p>
              <span>& orders</span>
            </Link>
            {/* {cart} */}
            <Link to="/Cart" className={classes.cart}>
              <MdOutlineShoppingCart size={35} />
              <span>{totalItemsInBasket}</span>
            </Link>
          </div>
        </div>
      </section>
      <LowerHeader />
    </>
  );
};

export default Header1;
