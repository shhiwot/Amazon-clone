import React, { useContext } from 'react'
import Rating from "@mui/material/Rating";
import CurrencyFormat from '../Currenceyformat/Currencyformat';
import classes from "./product.module.css";
import { Link } from 'react-router-dom';
import { DataContext } from '../DataProvider/DataProvider';
import { Type } from '../../Utility/actiontype';
const ProductCard = ({ product, flex, renderDesc,renderadd }) => {
  const { image, title, rating, price, id, description } = product;
  const [state,dispatch]=useContext(DataContext)
  console.log(state);
  const addtocart=()=>{
    dispatch({
      type: Type.ADD_TO_BASKET,
      item: {
        image,
        title,
        rating,
        price,
        id,
        description,
      },
    });
  }
  return (
    <div
      className={`${classes.card_container} ${
        flex ? classes.product_flexed : ""
      }`}
    >
      <Link to={`/products/${id}`}>
        <img src={image} alt="" className={classes.img_container} />
      </Link>
      <div>
        <h3>{title}</h3>
        {renderDesc && <p>{description}</p>}
        <div className={classes.rating}>
          {/* rating */}
          <Rating value={rating?.rate} precision={0.1} />
          {/* count */}
          <small>{rating?.count}</small>
        </div>
        <div>
          {/* price */}
          <CurrencyFormat amount={price} />
        </div>
        {renderadd && (
          <button className={classes.button} onClick={addtocart}>
            add to cart
          </button> 
        )}
      </div>
    </div>
  );
};

export default ProductCard
