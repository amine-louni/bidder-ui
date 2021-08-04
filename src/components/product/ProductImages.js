import React from 'react';
import { Carousel } from 'react-responsive-carousel';

export default function ProductImages({ images }) {
  return (
    <Carousel autoPlay={false}>
      {images.map(image => (
        <div>
          <img
            alt=""
            src={`${process.env.REACT_APP_API_URL}/img/products/${image}`}
          />
        </div>
      ))}
    </Carousel>
  );
}
