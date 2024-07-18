import React from 'react';
import classes from '../../assets/carousel.module.css'
import {Carousel} from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // Import the carousel styles
import {img} from './images/data'; // Ensure this is the correct path to your image data

const CarouselEffect = () => {
  return (
    <div>
      <Carousel
        autoPlay={true}
        infiniteLoop={true}
        showIndicators={false}
        showThumbs={true}
      >
        {img.map((imageItemLink, index) => (
          <div key={index}>
            <img src={imageItemLink} alt={`Carousel image ${index + 1}`} />
          </div>
        ))}
      </Carousel>
      <div className={classes.hero_img}></div>
    </div>
  );
};

export default CarouselEffect;
