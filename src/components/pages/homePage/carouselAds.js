import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import "./styles/carouselAds.css";

const CarouselAds = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 7000,
  };

  return (
    <div className='carousel-container'>
      <Slider {...settings}>
        <div>
          <img
            className='carousel-image'
            src='https://via.placeholder.com/1200x345?text=Ad+1'
            alt='Ad 1'
          />
        </div>
        <div>
          <img
            className='carousel-image'
            src='https://via.placeholder.com/1200x345?text=Ad+2'
            alt='Ad 2'
          />
        </div>
        <div>
          <img
            className='carousel-image'
            src='https://via.placeholder.com/1200x345?text=Ad+3'
            alt='Ad 3'
          />
        </div>
        <div>
          <img
            className='carousel-image'
            src='https://via.placeholder.com/1200x345?text=Ad+4'
            alt='Ad 4'
          />
        </div>
        <div>
          <img
            className='carousel-image'
            src='https://via.placeholder.com/1200x345?text=Ad+5'
            alt='Ad 5'
          />
        </div>
      </Slider>
    </div>
  );
};

export default CarouselAds;
