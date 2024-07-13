import React from 'react'
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import { img } from './img/imgData'
import classes from "./carousel.module.css";
const carouseleffect = () => {
  return (
    <a href='/'>
      <Carousel
        autoPlay={true}
        infiniteLoop={true}
        showIndicators={false}
        showThumbs={false}
      >
        {img.map((imageItem, i) => {
          return (
            <div className={classes.img} key={i}>
              <img src={imageItem} />
            </div>
          );
        })}
      </Carousel>
      <div className={classes.hero__img}/>
    </a>
  );
}

export default carouseleffect;
