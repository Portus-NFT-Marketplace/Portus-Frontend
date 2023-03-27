import React, { useState, useRef } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./styles/carousel.css";

const images = [
  "http://abclearningcenterfl.com/wp-content/uploads/2015/01/Childrens-Artwork.jpg",
  "https://www.shedloadsoffun.com/uploads/1/2/6/3/126303321/img-5751_orig.jpg",
  "https://geiselmed.dartmouth.edu/news/wp-content/uploads/sites/2/2015/06/painting-by-Abigail-Ham-web.jpg",
  "https://media.istockphoto.com/id/1368887626/photo/childs-drawing-spacecraft-in-space.jpg?b=1&s=170667a&w=0&k=20&c=KJZdm_D4Dangf08uKNDC6BBdpBi6sWuU2nvWmyvJwa0=",
  "https://www.hellowonderful.co/ckfinder/userfiles/images/134_sycheva_planet_5_suns__35846_1405327849_1280_1280.jpg",
  "https://theworldmuse.org/wp-content/uploads/2022/01/rainbow_1500.jpg",
  "https://artplatform.com.au/wp-content/gallery/gallery/cathy-butterfly-280710.jpg",
  "https://images.squarespace-cdn.com/content/v1/51438095e4b0ac55c65e2674/1363582838575-9KGDM510UKQBD9ZLJN6G/DSC04069.JPG?format=1000w",
  "https://images.squarespace-cdn.com/content/v1/51438095e4b0ac55c65e2674/1363582825426-97FIZWGN9NECU13ENJ1A/DSC03151.JPG",
  "https://i0.wp.com/www.teachkidsart.net/wp-content/uploads/2014/03/IMG_3212.jpg",
];

const Carousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const sliderRef = useRef(null);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    autoplay: true,
    autoplaySpeed: 5000,
    beforeChange: (current, next) => setCurrentSlide(next),
  };

  const handlePrevClick = () => {
    if (sliderRef.current) {
      sliderRef.current.slickPrev();
      setCurrentSlide(currentSlide - 4);
    }
  };

  const handleNextClick = () => {
    if (sliderRef.current) {
      sliderRef.current.slickNext();
      setCurrentSlide(currentSlide + 4);
    }
  };

  return (
    <>
      <div className="carousel-container">
        <Slider {...settings} ref={sliderRef}>
          {images.map((image, index) => (
            <div key={index}>
              <img
                src={image}
                alt={`Image ${index}`}
                className="carousel-image"
              />
            </div>
          ))}
        </Slider>
        <div className="carousel-nav">
          <button
            className="carousel-nav-button carousel-prev"
            onClick={handlePrevClick}
            // disabled={currentSlide === 0}
          ></button>
          <button
            className="carousel-nav-button carousel-next"
            onClick={handleNextClick}
            // disabled={currentSlide === images.length - 4}
          ></button>
        </div>
      </div>
    </>
  );
};

export default Carousel;
