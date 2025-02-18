import React from 'react';
import { Carousel } from 'react-bootstrap';
import slide1 from '../assets/img/h4-slide.png';
import slide2 from '../assets/img/h4-slide2.png';
import slide3 from '../assets/img/h4-slide3.png';

function CustomCarousel() {
  return (
    <Carousel>
      <Carousel.Item>
        <img className="d-block w-100" src={slide1} alt="First slide" />
      </Carousel.Item>
      <Carousel.Item>
        <img className="d-block w-100" src={slide2} alt="Second slide" />
      </Carousel.Item>
      <Carousel.Item>
        <img className="d-block w-100" src={slide3} alt="Third slide" />
      </Carousel.Item>
    </Carousel>
  );
}

export default CustomCarousel;
