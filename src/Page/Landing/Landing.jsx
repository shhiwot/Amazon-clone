import React from 'react'
import Carousel from "../../Component/Carousel/carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Catagory from "../../Component/Category/Catagory";
import Product from "../../Component/Product/Product";
import Layout from '../../Component/Layout/Layout';
const Landing = () => {
  return (
    <Layout>
      <Carousel />
      <Catagory />
      <Product />
    </Layout>
  );
}

export default Landing
