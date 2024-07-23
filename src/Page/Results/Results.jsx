import React from "react";
import { useState, useEffect } from "react";
import Layout from "../../Component/Layout/Layout";
import { useParams } from "react-router-dom";
import Classes from "./Results.module.css";
import { ProductUrl } from "../../Api/endPoints";
import axios from "axios";

import ProductCard from "../../Component/Product/ProductCard";
import Loader from "../../Component/Loader/Loader";
const Results = () => {
  const [results, setResults] = useState([]); // Initialize as undefined
  const [isLoading, setLoading] = useState(false);

  const { categoryName } = useParams();
  console.log(categoryName);
  useEffect(() => {
    setLoading(true);
    axios
      .get(`${ProductUrl}/products/category/${categoryName}`)
      .then((res) => {
        setResults(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setResults([]);
        setLoading(false);
      });
  }, [categoryName]);
  console.log(categoryName);
  return isLoading ? (
    <Loader />
  ) : (
    <Layout>
      <div>
        <h1 style={{ padding: "30px" }}>Results</h1>
        <p style={{ padding: "30px" }}>Catagory: {categoryName}</p>
        <hr />
        <div className={Classes.products_container}>
          {results.map((product) => (
            <ProductCard key={product.id} product={product} 
            renderadd={true}
            />
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Results;
