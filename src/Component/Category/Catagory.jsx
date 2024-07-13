import React from "react";
import categoryx from "./catagoryFullInfos";
import  CatagoryCard  from "./CatagoryCard";
import Classes from "./Catagory.module.css";
import el_img from "./img/electronics.jpg";
const Catagory = () => {
  
  return (
    <div className={Classes.category_container}>
      {categoryx.map((EachCatagory,i) => {
        console.log(EachCatagory);
        return (
          <>
            {<CatagoryCard data={EachCatagory} key={i} />}
            {/* <CatagoryCard data={EachCatagory} key={i} /> */}
          </>
        );
      })}
    </div>
  );
};

export default Catagory;
