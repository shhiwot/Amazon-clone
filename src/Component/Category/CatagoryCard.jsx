import React from 'react'
import Classes from "./Catagory.module.css"
import { Link } from 'react-router-dom';
//import { ProductUrl } from '../../Api/endPoints';
const CatagoryCard = ({data}) => {
 
  console.log({data});
  return (
    <div className={Classes.Catagory}>
      <Link to={`/category/${data.ProductItem}`}>
        <span>
          <h2>{data.title}</h2>
        </span>
        { <img className={Classes.electroni} src={data.imgLink} alt="" />}
        <p>shop now</p>
      </Link>
    </div>
  );
}

export default CatagoryCard
