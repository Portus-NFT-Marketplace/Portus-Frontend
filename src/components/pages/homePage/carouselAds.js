import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./styles/carouselAds.css";

import Ads1 from "../assets/ads/ads1.jpg";
import Ads2 from "../assets/ads/ads2.jpg";
import Ads3 from "../assets/ads/ads3.jpg";
import Ads4 from "../assets/ads/ads4.jpg";

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
    <div className="carousel-container">
      <Slider {...settings}>
        <div>
          <img
            className="carousel-image-ads"
            src={Ads1}
            alt="Ad 1"
          />
        </div>
        <div>
          <img
            className="carousel-image-ads"
            src={Ads2}
            alt="Ad 2"
          />
        </div>
        <div>
          <img
            className="carousel-image-ads"
            src={Ads3}
            alt="Ad 3"
          />
        </div>
        <div>
          <img
            className="carousel-image-ads"
            src={Ads4}
            alt="Ad 4"
          />
        </div>
      </Slider>
    </div>
  );
};

export default CarouselAds;
