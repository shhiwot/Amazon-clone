import React, { useState } from 'react'
import Layout from '../../Component/Layout/Layout'
import { useParams } from 'react-router-dom'
import { useEffect } from 'react'
import axios from 'axios'
import { ProductUrl } from '../../Api/endPoints'
import ProductCard from '../../Component/Product/ProductCard'
import Loader from '../../Component/Loader/Loader'
import classes from'./Productdetail.module.css'
const ProductDetail = () => {
  const [products, setproducts]=useState({})
  const {productId}=useParams()
  console.log(productId);
  const [isLoading,setisLoading]=useState(false)
  useEffect(()=>{
    setisLoading(true)
axios.get(`${ProductUrl}/products/${productId}`).then((res)=>{
  setproducts(res.data)
  setisLoading(false)
}).catch((err)=>{
  console.log(err);
  setisLoading(false)
});
  },[])
  return (
    <Layout>
      <div className={classes.ProductDetail}>
        {isLoading ? (
          <Loader />
        ) : (
          <ProductCard product={products} key={productId} flex={true} renderDesc=
          {true}
          renderadd={true}/>
        )}
      </div>
    </Layout>
  );
}

export default ProductDetail
