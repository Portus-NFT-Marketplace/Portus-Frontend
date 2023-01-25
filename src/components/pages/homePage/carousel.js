import React from "react";
import Carousel, { CarouselItem } from "../shared/general/Carousel";

const CarouselAds = (props) => {
  return (
    <div>
      <Carousel>
        <CarouselItem>
          <img
            src="http://abclearningcenterfl.com/wp-content/uploads/2015/01/Childrens-Artwork.jpg"
            width="100%"
            height="100%"
          />
        </CarouselItem>
        <CarouselItem>
          <img
            src="https://www.shedloadsoffun.com/uploads/1/2/6/3/126303321/img-5751_orig.jpg"
            width="100%"
            height="100%"
          />
        </CarouselItem>
        <CarouselItem>
          <img
            src="https://geiselmed.dartmouth.edu/news/wp-content/uploads/sites/2/2015/06/painting-by-Abigail-Ham-web.jpg"
            width="100%"
            height="100%"
          />
        </CarouselItem>
      </Carousel>
    </div>
  );
};

export default CarouselAds;
