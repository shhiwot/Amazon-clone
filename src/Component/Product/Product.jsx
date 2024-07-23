import React, { useEffect, useState } from 'react'
import axios from "axios";
import ProductCard from './ProductCard';
import Classes from "./product.module.css";
import Loader from '../Loader/Loader';
import {ProductUrl} from '../../Api/endPoints'
const Product = () => {
  const [products,setproducts]=useState([])
  const [isLoading,setisLoading]=useState(false)
  useEffect(()=>{
    setisLoading(true)
axios.get(`${ProductUrl}/products`).then((res)=>{
  console.log(res);
  setproducts(res.data)
  setisLoading(false);
}).catch((err)=>{
console.log(err); 
});
},[])
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className={Classes.product_container}>
          {products.map((Product) => {
            return <ProductCard product={Product} key={Product.id}
            renderadd={true} />;
          })}
        </div>
      )}
    </>
  );
}

export default Product
